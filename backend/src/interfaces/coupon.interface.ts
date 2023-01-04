import { IAgent } from './';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'
}

export interface ICoupon {
  _id?: string;
  contract: string;
  coupon_code: string;
  discount_amount: number;
  discount_type: DiscountType;
  generated_by: IAgent;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
