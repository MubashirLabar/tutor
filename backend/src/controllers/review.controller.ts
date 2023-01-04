import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IReview } from '../interfaces';
import ReviewService from '../services/review.service';

export class ReviewController extends ReviewService {
  protected createReviewAsync = async (req: Request, res: Response) => {
    const { user } = req.body;
    const userObj = await this.getUser(user);
    if (!userObj) {
      return failureResponse(`User doesn't exists.`, null, res);
    }
    const review: IReview = { ...req.body };
    try {
      const reviewCreated = await this.createReview(review);
      successResponse('Review added successfully.', reviewCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to add review', error, res);
    }
  };
  protected getAllReviewsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const review = await this.getAllReviews(filter as object, 'true');
      if (!review.length) {
        return successResponse('Review not found.', review, res);
      }
      successResponse('Review fetched successfully.', review, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch review', error, res);
    }
  };

  protected getReviewAsync = async (req: Request, res: Response) => {
    const { params, query } = req;
    try {
      const review = await this.getReview(params.id, query.populate as string);
      if (!review) {
        return successResponse('Review not found.', review, res);
      }
      successResponse('Review fetched successfully.', review, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch review', error, res);
    }
  };

  protected updateReviewAsync = async (req: Request, res: Response) => {
    try {
      const { params } = req;
      const review: IReview = await this.getReview(params.id);
      if (!review) {
        return failureResponse('No review found with provided Id', null, res);
      }
      const updatedReview = await this.updateReview(review, params.id);
      successResponse('Review updated successfully.', updatedReview, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteReviewAsync = async (req: Request, res: Response) => {
    try {
      const deletedReview = await this.deleteReview(req.params.id);
      successResponse('Review  was deleted  successfull', deletedReview, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new ReviewController();
