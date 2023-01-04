import { ICoupon, DiscountType } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  contract: { type: Schema.Types.ObjectId, ref: 'Contracts' },
  coupon_code: { type: String },
  discount_amount: { type: Number },
  discount_type: { type: String, enum: Object.values(DiscountType) },
  generated_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const CouponModel = model<ICoupon>('Coupons', schema);
