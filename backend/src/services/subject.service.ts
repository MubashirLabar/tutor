import { ISubject } from '../interfaces';
import { SubjectModel, CategoryModel, ServiceModel } from '../models';

export default class SubjectService {
  protected filterCategories(_id: string) {
    return CategoryModel.findOne({ _id, active: true });
  }
  protected createSubject(Subject: ISubject) {
    const newSubject = new SubjectModel(Subject);
    return newSubject.save();
  }

  protected getSubject = async (_id: string) => {
    return SubjectModel.findOne({ _id, deleted_at: null })
      .populate('category')
      .exec();
  };
  protected getServicesBySubject = async (subject: ISubject) => {
    return ServiceModel.find({ subject, deleted_at: null }).lean();
  };

  protected getAllSubjects = async (filter: object) => {
    return SubjectModel.find({ ...filter, deleted_at: null })
      .populate('category')
      .exec();
  };

  protected updateSubject = async (Subject: ISubject, _id: string) => {
    return SubjectModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: Subject },
      { new: true }
    );
  };
  protected deleteSubject = async (_id: string) => {
    return SubjectModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
