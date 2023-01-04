import { ITutor, UserType } from '../interfaces';
import { TutorModel, UserModel } from '../models';

export default class TutorService {
  protected getUser(_id: string) {
    return UserModel.findOne({ _id, user_type: UserType.tutor });
  }

  protected createTutor(tutor: ITutor) {
    const newTutor = new TutorModel(tutor);
    return newTutor.save();
  }

  protected getTutor = async (_id: string, populate?: string) => {
    if (populate) {
      return TutorModel.findById(_id)
        .populate('user')
        .populate('services')
        .exec();
    }
    return TutorModel.findById(_id);
  };

  protected getAllTutors = async (filter: object, populate?: string) => {
    const filters = { ...filter, deleted_at: null };
    if (populate) {
      return TutorModel.find(filters)
        .populate('user')
        .populate('services')
        .exec();
    }
    return TutorModel.find(filters);
  };

  protected updateTutor = async (tutor: ITutor, _id: string) => {
    return TutorModel.findByIdAndUpdate(_id, { $set: tutor }, { new: true });
  };

  protected deleteUser = async (_id: string) => {
    return UserModel.deleteOne({ _id });
  };

  protected deleteTutor = async (_id: string) => {
    return TutorModel.deleteOne({ _id });
  };
}
