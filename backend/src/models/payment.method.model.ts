import { IPaymentMethods } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: { type: String },
  credentials: { type: String },
  type: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const PaymentMethodModel = model<IPaymentMethods>(
  'PaymentMethods',
  schema
);
