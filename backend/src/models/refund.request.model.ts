import { IRefundRequest } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  amount: { type: Number },
  initiated_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  refund_from: { type: Schema.Types.ObjectId, ref: 'Users' },
  created_at: { type: Date, defasult: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const RefundRequestModel = model<IRefundRequest>(
  'RefundRequests',
  schema
);
