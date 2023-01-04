import { IReferrals, ReferralStatus } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  referred_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  referred_user: { type: Schema.Types.ObjectId, ref: 'Users' },
  referall_link: { type: Schema.Types.ObjectId, ref: 'Users' },
  status: {
    type: String,
    enum: Object.values(ReferralStatus),
    default: ReferralStatus.PENDING
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const ReferralModel = model<IReferrals>('Referrals', schema);
