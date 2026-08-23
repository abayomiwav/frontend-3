import type {
  BlogPost,
  NavLink,
  NavMenu,
  PartyRoleDefinition,
  RoadmapPhase,
  Testimonial,
} from '@/types';

export const siteConfig = {
  name: 'StellarExpress',
  tagline: 'Ship it. Track it. Trust the escrow, not the courier.',
  description:
    'StellarExpress is a logistics platform built on Stellar. Milestone escrow pays carriers on pickup and delivery, split automatically — no upfront risk, no chasing payment.',
  url: 'https://stellarexpress.org',
  github: 'https://github.com/StellarExpress',
  x: 'https://x.com/stellarexpress',
  discord: 'https://discord.gg/stellarexpress',
};

export const mainNav: (NavMenu | NavLink)[] = [
  {
    label: 'Product',
    items: [
      { label: 'Features', href: '/features', description: 'Escrow, tracking, marketplace, disputes.' },
      { label: 'How it works', href: '/roadmap', description: 'What we’ve shipped and what’s next.' },
      { label: 'Pricing', href: '/pricing', description: 'Plans for shippers, carriers, and fleets.' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: '/docs', description: 'Integrate and self-host StellarExpress.' },
      { label: 'Developers', href: '/developers', description: 'Open-source stack and APIs.' },
      { label: 'Blog', href: '/blog', description: 'Notes on logistics and Stellar.' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How it works', href: '/roadmap' },
    { label: 'Launch App', href: '/app' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Developers', href: '/developers' },
    { label: 'Blog', href: '/blog' },
    { label: 'GitHub', href: 'https://github.com/StellarExpress' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export const partyRoles: PartyRoleDefinition[] = [
  {
    name: 'Sender',
    description: 'Funds the escrow when a shipment is created. Gets a full refund if no carrier accepts before the deadline.',
    permissions: ['create shipment', 'cancel while open', 'confirm delivery', 'raise dispute'],
  },
  {
    name: 'Carrier',
    description: 'Claims an open shipment, transports it, and gets paid in two installments as the contract enforces.',
    permissions: ['accept open shipments', 'confirm pickup', 'raise dispute'],
  },
  {
    name: 'Receiver',
    description: 'Confirms the goods arrived, releasing the remaining escrow balance. Doesn’t need a platform account.',
    permissions: ['confirm delivery'],
  },
  {
    name: 'Arbiter',
    description: 'Configured once per deployment. The only party that can resolve a dispute, splitting what remains in escrow.',
    permissions: ['resolve disputes'],
  },
];

export const permissionMatrix = {
  actions: [
    'Create & fund a shipment',
    'Accept an open shipment',
    'Confirm pickup (releases share)',
    'Confirm delivery (releases rest)',
    'Cancel before accepted',
    'Raise a dispute',
    'Resolve a dispute',
  ],
  roles: ['Sender', 'Carrier', 'Receiver', 'Arbiter'] as const,
  grid: [
    [true, false, false, false],
    [false, true, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [true, false, false, false],
    [true, true, true, false],
    [false, false, false, true],
  ],
};

export const activeShipments = [
  { name: 'Jollof rice batch → Ikeja', category: 'Food', amount: 180, status: 'in_transit' as const, pickupBps: 40 },
  { name: 'MacBook Pro → Yaba', category: 'Electronics', amount: 2400, status: 'accepted' as const, pickupBps: 30 },
  { name: 'Legal contracts → Victoria Island', category: 'Documents', amount: 60, status: 'open' as const, pickupBps: 50 },
  { name: 'Ceramic vase set → Lekki', category: 'Fragile', amount: 340, status: 'in_transit' as const, pickupBps: 40 },
  { name: 'Office chairs → Ajah', category: 'Furniture', amount: 890, status: 'delivered' as const, pickupBps: 50 },
];

export const categoryBreakdown = [
  { name: 'Food', value: 32, color: '#ff6a1a' },
  { name: 'Electronics', value: 22, color: '#345c7c' },
  { name: 'Documents', value: 18, color: '#5b9bd5' },
  { name: 'Fragile', value: 16, color: '#b3792b' },
  { name: 'Furniture', value: 12, color: '#4cd394' },
];

export const escrowVolumeHistory = [
  { month: 'Feb', value: 42000 },
  { month: 'Mar', value: 51500 },
  { month: 'Apr', value: 48200 },
  { month: 'May', value: 63900 },
  { month: 'Jun', value: 71100 },
  { month: 'Jul', value: 84300 },
  { month: 'Aug', value: 96700 },
];

export const trackingTimeline = [
  { status: 'Shipment funded', location: 'Lagos, NG', time: 'Aug 1, 9:02 AM' },
  { status: 'Carrier accepted', location: 'Lagos, NG', time: 'Aug 1, 9:41 AM' },
  { status: 'Pickup confirmed — 40% released', location: 'Lagos Warehouse', time: 'Aug 1, 11:15 AM' },
  { status: 'Out for delivery', location: 'Mile 2 Expressway', time: 'Aug 2, 7:30 AM' },
  { status: 'Delivered — remaining balance released', location: 'Abuja, NG', time: 'Aug 2, 4:52 PM' },
];

export const openMarketplaceJobs = [
  { route: 'Lagos → Abuja', category: 'Food', amount: 180, deadline: '18h left' },
  { route: 'Ibadan → Lagos', category: 'Electronics', amount: 950, deadline: '2 days left' },
  { route: 'Lagos → Port Harcourt', category: 'Documents', amount: 75, deadline: '6h left' },
  { route: 'Abuja → Kano', category: 'Furniture', amount: 1200, deadline: '3 days left' },
];

export const automationWorkflows = [
  {
    title: 'Milestone escrow release',
    description: 'Pays the carrier automatically the moment pickup and delivery are each confirmed on-chain.',
    trigger: 'Event-based',
  },
  {
    title: 'Deadline reclaim',
    description: 'If no carrier accepts a shipment before its deadline, the sender’s funds return automatically.',
    trigger: 'Ledger deadline',
  },
  {
    title: 'Dispute freeze',
    description: 'Raising a dispute immediately halts further releases until the arbiter resolves it.',
    trigger: 'On raise',
  },
  {
    title: 'Rating roll-up',
    description: 'Every delivered shipment’s review updates the carrier’s public average automatically.',
    trigger: 'On delivery',
  },
  {
    title: 'Reminder before deadline',
    description: 'Senders get notified as a shipment’s acceptance deadline approaches, unclaimed.',
    trigger: 'Scheduled',
  },
];

export const escrowRules = [
  'Funds move only when pickup or delivery is confirmed on-chain — never on request',
  'A carrier is paid a share immediately on pickup, before delivery even starts',
  'A sender can cancel for a full refund only before a carrier accepts',
  'Disputes freeze the remaining balance until the arbiter resolves it',
  'The arbiter can only split what’s left — never touch funds already paid out',
  'Every release, dispute, and resolution is timestamped on a public ledger',
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'We run a small food delivery service and used to pay couriers upfront and just hope. Now half pays on pickup, half on delivery — nobody’s trust is being tested anymore.',
    name: 'Amaka Chukwu',
    role: 'Owner, Amaka’s Kitchen Delivery',
  },
  {
    quote:
      'As an independent carrier, the marketplace means I see the payout terms before I accept a job. I know exactly when I get paid and how much, before I load the van.',
    name: 'Deji Adewale',
    role: 'Independent carrier',
  },
  {
    quote:
      'The one dispute we’ve had in six months resolved in under a day. The arbiter could only touch what hadn’t already been paid out — that boundary mattered to both sides.',
    name: 'Ngozi Umeh',
    role: 'Operations lead, Umeh Furniture Movers',
  },
  {
    quote:
      'We evaluated three logistics platforms for our electronics resale business. StellarExpress was the only one where the payment terms were enforced by code, not a policy PDF.',
    name: 'Tunde Bakare',
    role: 'Founder, ReCircuit Electronics',
  },
];

export const faqs = [
  {
    question: 'How does the escrow actually protect me?',
    answer:
      'When a sender creates a shipment, funds move into a Soroban smart contract — not into StellarExpress’s account. The contract only releases money when a carrier confirms pickup (a partial share) or a receiver confirms delivery (the rest). Nobody, including StellarExpress, can move funds outside those rules.',
  },
  {
    question: 'What happens if a carrier never picks up my shipment?',
    answer:
      'Every shipment has a deadline set at creation. If no carrier accepts before it passes, you can reclaim your full escrow with one call — no support ticket required.',
  },
  {
    question: 'How is the pickup/delivery split decided?',
    answer:
      'The sender sets it per shipment, in basis points, when creating the listing — for example 40% on pickup, 60% on delivery. Higher-risk or higher-trust routes can be tuned differently.',
  },
  {
    question: 'What if the goods arrive damaged, or don’t arrive at all?',
    answer:
      'Either the sender or the carrier can raise a dispute, which freezes whatever remains in escrow. A configured arbiter reviews the situation and splits the remaining balance — they can only affect funds not already released.',
  },
  {
    question: 'Can I use StellarExpress for food deliveries specifically?',
    answer:
      'Yes — Food is one of the built-in shipment categories, alongside Fragile, Electronics, Documents, Furniture, and General. Categories don’t change the payment logic, but they help carriers filter jobs they’re equipped for.',
  },
  {
    question: 'Do I need a StellarExpress account to receive a delivery?',
    answer:
      'No. The receiver is identified by a Stellar address at shipment creation and only needs a wallet capable of signing one transaction — confirming delivery — to release the final payment.',
  },
];

export const pricingTiers = [
  { name: 'Starter', price: 'Free', period: '', description: 'For individuals shipping or carrying occasionally.', cta: 'Launch App', href: '/app', highlighted: false },
  { name: 'Pro', price: '$29', period: '/mo', description: 'For small logistics businesses running regular routes.', cta: 'Start Pro trial', href: '/app', highlighted: true },
  { name: 'Fleet', price: 'Custom', period: '', description: 'For logistics operators coordinating many carriers.', cta: 'Talk to us', href: '/contact', highlighted: false },
] as const;

export const pricingFeatures: { label: string; starter: boolean; pro: boolean; fleet: boolean }[] = [
  { label: 'Unlimited shipments as a sender', starter: true, pro: true, fleet: true },
  { label: 'Marketplace access as a carrier', starter: true, pro: true, fleet: true },
  { label: 'Milestone escrow on every shipment', starter: true, pro: true, fleet: true },
  { label: 'Basic tracking updates', starter: true, pro: true, fleet: true },
  { label: 'Priority marketplace placement', starter: false, pro: true, fleet: true },
  { label: 'Carrier rating & review analytics', starter: false, pro: true, fleet: true },
  { label: 'Custom pickup/delivery split defaults', starter: false, pro: true, fleet: true },
  { label: 'Webhook notifications', starter: false, pro: true, fleet: true },
  { label: 'Multiple arbiters by region', starter: false, pro: false, fleet: true },
  { label: 'Bulk shipment creation via API', starter: false, pro: false, fleet: true },
  { label: 'Dedicated onboarding', starter: false, pro: false, fleet: true },
  { label: 'SLA-backed support', starter: false, pro: false, fleet: true },
];

export const comparisonRows = [
  { label: 'Payment protection', traditional: 'None — pay and hope', cod: 'Cash on delivery only', stellarexpress: 'On-chain milestone escrow' },
  { label: 'Carrier payout timing', traditional: 'After full delivery, manually', cod: 'At the door, in cash', stellarexpress: 'Automatic on pickup + delivery' },
  { label: 'Dispute handling', traditional: 'Call support, wait', cod: 'None — cash already exchanged', stellarexpress: 'On-chain arbiter, bounded authority' },
  { label: 'Tracking', traditional: 'Spreadsheet or phone calls', cod: 'None', stellarexpress: 'Structured timeline, every update logged' },
  { label: 'Fees', traditional: 'Platform cut + payment processor', cod: 'None, but no protection either', stellarexpress: 'Stellar network fees (~$0.00001)' },
  { label: 'Settlement speed', traditional: 'Days (bank transfer)', cod: 'Instant, but unprotected', stellarexpress: '3–5 seconds, protected' },
];

export const stats = [
  { label: 'Settlement time', value: '3–5', suffix: 's' },
  { label: 'Typical network fee', value: '0.00001', prefix: '$' },
  { label: 'Shipments escrowed', value: '9,400', suffix: '+' },
  { label: 'Active carriers', value: '620', suffix: '+' },
];

export const roadmap: RoadmapPhase[] = [
  {
    quarter: 'Shipped',
    title: 'Core escrow & marketplace',
    items: ['Milestone escrow contract', 'Open shipment marketplace', 'Tracking updates', 'Basic disputes'],
    status: 'done',
  },
  {
    quarter: 'Now',
    title: 'Trust & ratings',
    items: ['Carrier rating roll-up', 'Review moderation', 'Passkey sign-in'],
    status: 'active',
  },
  {
    quarter: 'Next',
    title: 'Regional arbitration',
    items: ['Multiple arbiters by region', 'Evidence attachments on disputes', 'Automated deadline reminders'],
    status: 'next',
  },
  {
    quarter: 'Later',
    title: 'Fleet tooling',
    items: ['Bulk shipment API', 'Route optimization suggestions', 'Fleet-wide analytics dashboard'],
    status: 'later',
  },
  {
    quarter: 'Exploring',
    title: 'Cross-border freight',
    items: ['Multi-currency escrow (XLM/USDC/EURC)', 'Customs documentation hooks', 'Freight-forwarder partnerships'],
    status: 'later',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'milestone-escrow-for-logistics',
    title: 'Why logistics payments need two milestones, not one',
    excerpt: 'Paying a carrier only on delivery protects the sender and nobody else. Splitting the payment changes the incentives for everyone.',
    date: '2026-06-10',
    readingTime: '6 min read',
    tag: 'Product',
  },
  {
    slug: 'dispute-resolution-with-bounded-authority',
    title: 'An arbiter who can’t touch money that’s already moved',
    excerpt: 'How StellarExpress’s dispute contract limits the arbiter to only what remains in escrow — by design, not by policy.',
    date: '2026-05-18',
    readingTime: '7 min read',
    tag: 'Trust & Safety',
  },
  {
    slug: 'soroban-for-shipment-escrow',
    title: 'Why we built the escrow on Soroban instead of a database',
    excerpt: 'A payment rule enforced by a smart contract is a rule that holds even when the sender and carrier disagree about what should happen next.',
    date: '2026-04-25',
    readingTime: '7 min read',
    tag: 'Engineering',
  },
  {
    slug: 'carrier-marketplace-incentives',
    title: 'What makes an independent carrier accept your job',
    excerpt: 'Notes from carriers using the open marketplace: visible payout terms before acceptance change behavior more than price alone.',
    date: '2026-03-30',
    readingTime: '5 min read',
    tag: 'Carriers',
  },
];

export const docsSections = [
  {
    title: 'Getting started',
    items: [
      { title: 'Create your first shipment', description: 'Fund an escrow and list it for carriers in under five minutes.' },
      { title: 'Connect a wallet', description: 'Freighter, hardware wallets, and passkey signers.' },
      { title: 'Understanding parties', description: 'Sender, Carrier, Receiver, Arbiter.' },
    ],
  },
  {
    title: 'Shipment lifecycle',
    items: [
      { title: 'Open → Accepted → In transit → Delivered', description: 'The four states every shipment moves through.' },
      { title: 'Milestone splits', description: 'Setting pickup_release_bps per shipment.' },
      { title: 'Cancellation & reclaim', description: 'Refund paths before and after a carrier accepts.' },
    ],
  },
  {
    title: 'Disputes',
    items: [
      { title: 'Raising a dispute', description: 'Who can raise one, and when.' },
      { title: 'Arbiter resolution', description: 'Bounded authority — only unreleased funds are ever split.' },
    ],
  },
  {
    title: 'API reference',
    items: [
      { title: 'GraphQL schema', description: 'Queries and mutations for shipments, tracking, disputes, reviews.' },
      { title: 'Stellar integration', description: 'Non-custodial XDR build & submit flow.' },
      { title: 'Webhooks', description: 'Subscribe to shipment and dispute events.' },
    ],
  },
];

export const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TailwindCSS', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Soroban', category: 'Contracts' },
  { name: 'Stellar SDK', category: 'Integration' },
  { name: 'Freighter', category: 'Integration' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'Prisma', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'Docker', category: 'Infra' },
];

export const repos = [
  {
    name: 'frontend',
    description: 'The StellarExpress web app — Next.js, TypeScript, Tailwind.',
    href: 'https://github.com/StellarExpress/frontend',
  },
  {
    name: 'backend',
    description: 'GraphQL API — NestJS, Prisma, Postgres, non-custodial Stellar integration.',
    href: 'https://github.com/StellarExpress/backend',
  },
  {
    name: 'contracts',
    description: 'The `escrow` Soroban contract — shipment lifecycle, milestone release, disputes.',
    href: 'https://github.com/StellarExpress/contracts',
  },
];
