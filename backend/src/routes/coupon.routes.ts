import { Router } from 'express';
import { CouponController } from '../controllers/coupon.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';
export class CouponRoutes extends CouponController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.couponRoutes();
  }

  private couponRoutes() {
    this.router.post('/', validate('createCoupon'), this.createCoupon);
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.getAllCouponsAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getCouponAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateCoupon'),
      this.updateCouponAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteCouponAsync
    );
  }
}

export default new CouponRoutes();
