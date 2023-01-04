import { ISchool } from '../interfaces';
import { SchoolModel } from '../models';

export default class SchoolService {
  protected createSchool(school: ISchool) {
    const newSchool = new SchoolModel(school);
    return newSchool.save();
  }

  protected getSchool = async (_id: string) => {
    const filter = { _id, deleted_at: null };
    return SchoolModel.findOne(filter);
  };

  protected getAllSchools = async (filter: object) => {
    const filters = { ...filter, deleted_at: null };
    return SchoolModel.find(filters);
  };

  protected updateSchool = async (school: ISchool, _id: string) => {
    return SchoolModel.findByIdAndUpdate(_id, { $set: school }, { new: true });
  };

  protected deleteSchool = async (_id: string) => {
    return SchoolModel.findByIdAndUpdate(
      _id,
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
