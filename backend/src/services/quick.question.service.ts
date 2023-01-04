import { IQuickQuestion, QuickQuestionStatus } from '../interfaces';
import { QuickQuestionModel } from '../models';

export default class QuickQuestionService {
  protected createQuickQuestion(quickQuestion: IQuickQuestion) {
    const newQuickQuestion = new QuickQuestionModel(quickQuestion);
    return newQuickQuestion.save();
  }

  protected getQuickQuestion = async (_id: string, populate?: string) => {
    const filter = { _id, deleted_at: null };
    if (populate) {
      return QuickQuestionModel.findOne(filter)
        .populate('posted_by', 'email, _id username is_active user_type')
        .populate('answered_by', 'email, _id username is_active user_type')
        .populate('assigned_to', 'email, _id username is_active user_type')
        .exec();
    }
    return QuickQuestionModel.findOne(filter);
  };

  protected getAllQuickQuestions = async (
    filter: object,
    populate?: string
  ) => {
    const filters = { ...filter, deleted_at: null };
    if (populate) {
      return QuickQuestionModel.find(filters)
        .populate('posted_by', 'email, _id username is_active user_type')
        .populate('answered_by', 'email, _id username is_active user_type')
        .populate('assigned_to', 'email, _id username is_active user_type')
        .exec();
    }
    return QuickQuestionModel.find(filters);
  };

  protected assignQuickQuestion = async (assigned_to: string, _id: string) => {
    return QuickQuestionModel.findByIdAndUpdate(
      _id,
      {
        $set: { assigned_to, status: QuickQuestionStatus.ASSIGNED }
      },
      { new: true }
    );
  };

  protected answerQuickQuestion = async (
    answer: string,
    answered_by: string,
    _id: string
  ) => {
    return QuickQuestionModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          answer,
          answered_by,
          status: QuickQuestionStatus.ANSWERED,
          updated_at: new Date()
        }
      },
      { new: true }
    );
  };

  protected deleteQuickQuestion = async (_id: string) => {
    return QuickQuestionModel.findByIdAndUpdate(
      _id,
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
