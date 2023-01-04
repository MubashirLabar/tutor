import { IReview } from '../interfaces';
import { ReviewModel, UserModel } from '../models';

export default class ReviewService {
  protected getUser(userId: string) {
    return UserModel.findById(userId);
  }

  protected createReview(review: IReview) {
    const newReview = new ReviewModel(review);
    return newReview.save();
  }

  protected getReview = async (_id: string, populate?: string) => {
    const filter = { _id, deleted_at: null };
    if (populate) {
      return ReviewModel.findOne(filter)
        .populate('user', 'email', '_id')
        .exec();
    }
    return ReviewModel.findOne(filter);
  };

  protected getAllReviews = async (filter: object, populate?: string) => {
    const filters = { ...filter, deleted_at: null };
    if (populate) {
      return ReviewModel.find(filters).populate('user', 'email', '_id').exec();
    }
    return ReviewModel.find(filters);
  };

  protected updateReview = async (review: IReview, _id: string) => {
    return ReviewModel.findByIdAndUpdate(_id, { $set: review }, { new: true });
  };

  protected deleteReview = async (_id: string) => {
    return ReviewModel.findByIdAndUpdate(
      _id,
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
