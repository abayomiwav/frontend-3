// GraphQL client for the StellarExpress backend
// (https://github.com/StellarExpress/backend). Points at
// NEXT_PUBLIC_API_URL, defaulting to a local dev backend — set that env
// var to a deployed backend's /graphql endpoint to actually connect.
import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/graphql';

export class ApiError extends Error {}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new ApiError(
      `Could not reach the StellarExpress API at ${API_URL}. Is the backend running?`,
    );
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new ApiError(json.errors[0]?.message ?? 'Something went wrong');
  }
  return json.data as T;
}

export interface SignUpInput {
  email: string;
  password: string;
  displayName: string;
  isCarrier: boolean;
}

export interface SignInInput {
  email: string;
  password: string;
}

export async function signUp(input: SignUpInput): Promise<string> {
  const data = await gql<{ signUp: { accessToken: string } }>(
    `mutation SignUp($input: SignUpInput!) {
      signUp(input: $input) { accessToken }
    }`,
    { input },
  );
  return data.signUp.accessToken;
}

export async function signIn(input: SignInInput): Promise<string> {
  const data = await gql<{ signIn: { accessToken: string } }>(
    `mutation SignIn($input: SignInInput!) {
      signIn(input: $input) { accessToken }
    }`,
    { input },
  );
  return data.signIn.accessToken;
}

export interface CurrentUser {
  id: string;
  email: string;
  displayName: string;
  isCarrier: boolean;
  stellarPublicKey: string | null;
  createdAt: string;
}

export async function getMe(): Promise<CurrentUser> {
  const data = await gql<{ me: CurrentUser }>(
    `query Me {
      me { id email displayName isCarrier stellarPublicKey createdAt }
    }`,
  );
  return data.me;
}

export type ShipmentCategory =
  | 'GENERAL'
  | 'FOOD'
  | 'FRAGILE'
  | 'ELECTRONICS'
  | 'DOCUMENTS'
  | 'FURNITURE';

export type AssetCode = 'XLM' | 'USDC' | 'EURC' | 'CUSTOM';

export type ShipmentStatus =
  | 'OPEN'
  | 'ACCEPTED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'DISPUTED'
  | 'RESOLVED';

export interface Shipment {
  id: string;
  senderId: string;
  carrierId: string | null;
  receiverName: string;
  receiverAddress: string;
  originLabel: string;
  destinationLabel: string;
  category: ShipmentCategory;
  assetCode: AssetCode;
  totalAmount: number;
  releasedAmount: number;
  pickupReleaseBps: number;
  status: ShipmentStatus;
  deliveryDeadlineAt: string;
  createdAt: string;
}

const SHIPMENT_FIELDS = `
  id senderId carrierId receiverName receiverAddress originLabel destinationLabel
  category assetCode totalAmount releasedAmount pickupReleaseBps status
  deliveryDeadlineAt createdAt
`;

export async function getMyShipmentsAsSender(): Promise<Shipment[]> {
  const data = await gql<{ myShipmentsAsSender: Shipment[] }>(
    `query MyShipmentsAsSender { myShipmentsAsSender { ${SHIPMENT_FIELDS} } }`,
  );
  return data.myShipmentsAsSender;
}

export async function getMyShipmentsAsCarrier(): Promise<Shipment[]> {
  const data = await gql<{ myShipmentsAsCarrier: Shipment[] }>(
    `query MyShipmentsAsCarrier { myShipmentsAsCarrier { ${SHIPMENT_FIELDS} } }`,
  );
  return data.myShipmentsAsCarrier;
}

export async function getOpenShipments(): Promise<Shipment[]> {
  const data = await gql<{ openShipments: Shipment[] }>(
    `query OpenShipments { openShipments { ${SHIPMENT_FIELDS} } }`,
  );
  return data.openShipments;
}

export interface CreateShipmentInput {
  receiverName: string;
  receiverAddress: string;
  originLabel: string;
  destinationLabel: string;
  category: ShipmentCategory;
  assetCode: AssetCode;
  totalAmount: number;
  deliveryDeadlineAt: string;
}

export async function createShipment(input: CreateShipmentInput): Promise<Shipment> {
  const data = await gql<{ createShipment: Shipment }>(
    `mutation CreateShipment($input: CreateShipmentInput!) {
      createShipment(input: $input) { ${SHIPMENT_FIELDS} }
    }`,
    { input },
  );
  return data.createShipment;
}

export async function acceptShipment(shipmentId: string): Promise<Shipment> {
  const data = await gql<{ acceptShipment: Shipment }>(
    `mutation AcceptShipment($shipmentId: String!) {
      acceptShipment(shipmentId: $shipmentId) { ${SHIPMENT_FIELDS} }
    }`,
    { shipmentId },
  );
  return data.acceptShipment;
}

export async function getShipment(id: string): Promise<Shipment> {
  const data = await gql<{ shipment: Shipment }>(
    `query Shipment($id: String!) { shipment(id: $id) { ${SHIPMENT_FIELDS} } }`,
    { id },
  );
  return data.shipment;
}

export async function confirmPickup(shipmentId: string): Promise<Shipment> {
  const data = await gql<{ confirmPickup: Shipment }>(
    `mutation ConfirmPickup($shipmentId: String!) {
      confirmPickup(shipmentId: $shipmentId) { ${SHIPMENT_FIELDS} }
    }`,
    { shipmentId },
  );
  return data.confirmPickup;
}

export async function confirmDelivery(shipmentId: string): Promise<Shipment> {
  const data = await gql<{ confirmDelivery: Shipment }>(
    `mutation ConfirmDelivery($shipmentId: String!) {
      confirmDelivery(shipmentId: $shipmentId) { ${SHIPMENT_FIELDS} }
    }`,
    { shipmentId },
  );
  return data.confirmDelivery;
}

export async function cancelShipment(shipmentId: string): Promise<Shipment> {
  const data = await gql<{ cancelShipment: Shipment }>(
    `mutation CancelShipment($shipmentId: String!) {
      cancelShipment(shipmentId: $shipmentId) { ${SHIPMENT_FIELDS} }
    }`,
    { shipmentId },
  );
  return data.cancelShipment;
}

export interface TrackingUpdate {
  id: string;
  shipmentId: string;
  createdByUserId: string | null;
  status: string;
  location: string | null;
  note: string | null;
  createdAt: string;
}

export async function getTrackingUpdates(shipmentId: string): Promise<TrackingUpdate[]> {
  const data = await gql<{ trackingUpdates: TrackingUpdate[] }>(
    `query TrackingUpdates($shipmentId: String!) {
      trackingUpdates(shipmentId: $shipmentId) {
        id shipmentId createdByUserId status location note createdAt
      }
    }`,
    { shipmentId },
  );
  return data.trackingUpdates;
}

export interface AddTrackingUpdateInput {
  shipmentId: string;
  status: string;
  location?: string;
  note?: string;
}

export async function addTrackingUpdate(input: AddTrackingUpdateInput): Promise<TrackingUpdate> {
  const data = await gql<{ addTrackingUpdate: TrackingUpdate }>(
    `mutation AddTrackingUpdate($input: AddTrackingUpdateInput!) {
      addTrackingUpdate(input: $input) {
        id shipmentId createdByUserId status location note createdAt
      }
    }`,
    { input },
  );
  return data.addTrackingUpdate;
}
