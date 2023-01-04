import { IAgent } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', unique: true },
  services: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
  total_earned: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  total_jobs_completed: { type: Number, default: 0 },
  total_jobs_in_progress: { type: Number, default: 0 },
  company_name: { type: String },
  company_description: { type: String },
  company_logo: { type: String },
  referral_code: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const AgentModel = model<IAgent>('Agents', schema);
