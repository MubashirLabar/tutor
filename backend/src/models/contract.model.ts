import { IContract, ContractStatus, PaymentOptions } from '../interfaces';
import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
  image_path: { type: String },
  name: { type: String }
});

const schema = new Schema({
  deadline: { type: Date },
  status: {
    type: String,
    enum: Object.values(ContractStatus),
    default: ContractStatus.IN_PROGRESS
  },
  documents: [documentSchema],
  payment_options: { type: String, enum: Object.values(PaymentOptions) },
  amount: { type: Number, default: 0 },
  hourly_rate: { type: Number, default: 0 },
  agent: { type: Schema.Types.ObjectId, ref: 'Users' },
  student: { type: Schema.Types.ObjectId, ref: 'Users' },
  tutors: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  job: { type: Schema.Types.ObjectId, ref: 'Jobs' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const ContractModel = model<IContract>('Contracts', schema);
