import { ICategory } from '../interfaces';
import { CategoryModel, SubjectModel } from '../models';

export default class CategoryService {
  protected createCategory(category: ICategory) {
    const newCategory = new CategoryModel(category);
    return newCategory.save();
  }

  protected getCategory = async (_id: string, populate?: string) => {
    const filter = { _id, deleted_at: null };
    if (populate) {
      return CategoryModel.findOne(filter)
        .populate('generated_by', 'email _id')
        .exec();
    }
    return CategoryModel.findOne(filter);
  };

  protected getAllCategorys = async (filter: object, populate?: string) => {
    const filters = { ...filter, deleted_at: null };
    if (populate) {
      return CategoryModel.find(filters)
        .populate('generated_by', 'email _id')
        .exec();
    }
    return CategoryModel.find(filters);
  };
  protected getSubjectsByCategory = async (category: ICategory) => {
    return SubjectModel.find({ category, deleted_at: null });
  };

  protected updateCategory = async (category: ICategory, _id: string) => {
    return CategoryModel.findByIdAndUpdate(
      _id,
      { $set: category },
      { new: true }
    );
  };

  protected deleteSubjects = async (category: ICategory) => {
    return SubjectModel.updateMany(
      { category },
      { $set: { deleted_at: Date.now() } }
    );
  };

  protected deleteCategory = async (_id: string) => {
    return CategoryModel.findByIdAndUpdate(
      _id,
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
