import { ICoupon } from '../interfaces';
import { CouponModel, UserModel } from '../models';

export default class CouponService {
  protected getUser(userId: string) {
    return UserModel.findById(userId);
  }

  protected createCoupon(coupon: ICoupon) {
    const newCoupon = new CouponModel(coupon);
    return newCoupon.save();
  }

  protected getCoupon = async (_id: string, populate?: string) => {
    const filter = { _id, deleted_at: null };
    if (populate) {
      return CouponModel.findOne(filter)
        .populate('generated_by', 'email _id')
        .exec();
    }
    return CouponModel.findOne(filter);
  };

  protected getAllCoupons = async (filter: object, populate?: string) => {
    const filters = { ...filter, deleted_at: null };
    if (populate) {
      return CouponModel.find(filters)
        .populate('generated_by', 'email _id')
        .exec();
    }
    return CouponModel.find(filters);
  };

  protected updateCoupon = async (coupon: ICoupon, _id: string) => {
    return CouponModel.findByIdAndUpdate(_id, { $set: coupon }, { new: true });
  };

  protected deleteCoupon = async (_id: string) => {
    return CouponModel.findByIdAndUpdate(
      _id,
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
