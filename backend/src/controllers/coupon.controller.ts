import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { ICoupon } from '../interfaces';
import CouponService from '../services/coupon.service';

export class CouponController extends CouponService {
  protected createCouponAsync = async (req: Request, res: Response) => {
    const { user } = req.body;
    const userObj = await this.getUser(user);
    if (!userObj) {
      return failureResponse(`User doesn't exists.`, null, res);
    }
    const coupon: ICoupon = { ...req.body };
    try {
      const couponCreated = await this.createCoupon(coupon);
      successResponse('Coupon added successfully.', couponCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to add coupon', error, res);
    }
  };
  protected getAllCouponsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const coupon = await this.getAllCoupons(filter as object, 'true');
      if (!coupon.length) {
        return successResponse('Coupon not found.', coupon, res);
      }
      successResponse('Coupon fetched successfully.', coupon, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch coupon', error, res);
    }
  };

  protected getCouponAsync = async (req: Request, res: Response) => {
    const { params, query } = req;
    try {
      const coupon = await this.getCoupon(params.id, query.populate as string);
      if (!coupon) {
        return successResponse('Coupon not found.', coupon, res);
      }
      successResponse('Coupon fetched successfully.', coupon, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch coupon', error, res);
    }
  };

  protected updateCouponAsync = async (req: Request, res: Response) => {
    try {
      const { params } = req;
      const coupon: ICoupon = await this.getCoupon(params.id);
      if (!coupon) {
        return failureResponse('No coupon found with provided Id', null, res);
      }
      const updatedCoupon = await this.updateCoupon(coupon, params.id);
      successResponse('Coupon updated successfully.', updatedCoupon, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteCouponAsync = async (req: Request, res: Response) => {
    try {
      const deletedCoupon = await this.deleteCoupon(req.params.id);
      successResponse('Coupon  was deleted  successfull', deletedCoupon, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new CouponController();
