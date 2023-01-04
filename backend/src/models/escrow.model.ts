import { IEscrow, EscrowStatus } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  amount: { type: Number },
  paid_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  paid_for: { type: Schema.Types.ObjectId, ref: 'Users' },
  requirements: [{ type: String }],
  status: { type: String, enum: Object.values(EscrowStatus) },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const EscrowModel = model<IEscrow>('Escrows', schema);
