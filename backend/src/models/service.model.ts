import { IService, ServiceStatus } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String, unique: true },
  description: { type: String },
  status: {
    type: String,
    enum: Object.values(ServiceStatus),
    default: ServiceStatus.ACTIVE
  },
  subject: { type: Schema.Types.ObjectId, ref: 'Subjects' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const ServiceModel = model<IService>('Services', schema);
