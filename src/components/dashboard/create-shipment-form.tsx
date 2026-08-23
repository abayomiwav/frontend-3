'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiError, createShipment } from '@/lib/api';

const categories = ['GENERAL', 'FOOD', 'FRAGILE', 'ELECTRONICS', 'DOCUMENTS', 'FURNITURE'] as const;
const assets = ['XLM', 'USDC', 'EURC', 'CUSTOM'] as const;

const schema = z.object({
  receiverName: z.string().min(2, "Enter the receiver's name"),
  receiverAddress: z.string().min(4, 'Enter a delivery address'),
  originLabel: z.string().min(2, 'Enter a pickup location'),
  destinationLabel: z.string().min(2, 'Enter a destination'),
  category: z.enum(categories),
  assetCode: z.enum(assets),
  totalAmount: z
    .string()
    .min(1, 'Enter an amount')
    .refine((v) => Number(v) > 0, 'Enter an amount greater than 0'),
  deliveryDeadlineAt: z.string().min(1, 'Pick a delivery deadline'),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  'mt-1.5 w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring';

export function CreateShipmentForm({ onCreated }: { onCreated: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { category: 'GENERAL', assetCode: 'USDC' },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      await createShipment({
        ...values,
        totalAmount: Number(values.totalAmount),
        deliveryDeadlineAt: new Date(values.deliveryDeadlineAt).toISOString(),
      });
      onCreated();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not create this shipment.');
    }
  };

  return (
    <div className="panel-thick p-6">
      <h2 className="font-display text-lg font-bold">New shipment</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This creates a real shipment record tied to your account via the backend API.
      </p>

      {error && (
        <div className="mt-4 flex items-start gap-2 border-2 border-destructive bg-destructive/5 px-4 py-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p className="text-foreground/85">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="receiverName" className="text-sm font-medium">
            Receiver name
          </label>
          <input
            id="receiverName"
            {...register('receiverName')}
            className={fieldClass}
            placeholder="Amaka Chukwu"
          />
          {errors.receiverName && (
            <p className="mt-1.5 text-xs text-destructive">{errors.receiverName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="receiverAddress" className="text-sm font-medium">
            Receiver address
          </label>
          <input
            id="receiverAddress"
            {...register('receiverAddress')}
            className={fieldClass}
            placeholder="14 Adeola Odeku St, Lagos"
          />
          {errors.receiverAddress && (
            <p className="mt-1.5 text-xs text-destructive">{errors.receiverAddress.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="originLabel" className="text-sm font-medium">
            Origin
          </label>
          <input
            id="originLabel"
            {...register('originLabel')}
            className={fieldClass}
            placeholder="Lagos warehouse"
          />
          {errors.originLabel && (
            <p className="mt-1.5 text-xs text-destructive">{errors.originLabel.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="destinationLabel" className="text-sm font-medium">
            Destination
          </label>
          <input
            id="destinationLabel"
            {...register('destinationLabel')}
            className={fieldClass}
            placeholder="Abuja depot"
          />
          {errors.destinationLabel && (
            <p className="mt-1.5 text-xs text-destructive">{errors.destinationLabel.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select id="category" {...register('category')} className={fieldClass}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="assetCode" className="text-sm font-medium">
            Settlement asset
          </label>
          <select id="assetCode" {...register('assetCode')} className={fieldClass}>
            {assets.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="totalAmount" className="text-sm font-medium">
            Amount
          </label>
          <input
            id="totalAmount"
            type="number"
            step="0.01"
            {...register('totalAmount')}
            className={fieldClass}
            placeholder="1200"
          />
          {errors.totalAmount && (
            <p className="mt-1.5 text-xs text-destructive">{errors.totalAmount.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="deliveryDeadlineAt" className="text-sm font-medium">
            Delivery deadline
          </label>
          <input
            id="deliveryDeadlineAt"
            type="date"
            {...register('deliveryDeadlineAt')}
            className={fieldClass}
          />
          {errors.deliveryDeadlineAt && (
            <p className="mt-1.5 text-xs text-destructive">{errors.deliveryDeadlineAt.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Create shipment
          </Button>
        </div>
      </form>
    </div>
  );
}
