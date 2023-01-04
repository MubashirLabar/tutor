import { IService } from '../interfaces';
import { ServiceModel, SubjectModel } from '../models';

export default class ServiceService {
  protected createService(service: IService) {
    const newService = new ServiceModel(service);
    return newService.save();
  }

  protected getService = async (_id: string) => {
    return ServiceModel.findOne({ _id, deleted_at: null }).lean();
  };
  protected getSubjects = async (_id: string) => {
    return SubjectModel.findOne({ _id, deleted_at: null }).lean();
  };
  protected getAllServices = async (filter: object) => {
    return ServiceModel.find({ ...filter, deleted_at: null });
  };

  protected updateService = async (service: IService, _id: string) => {
    return ServiceModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: service },
      { new: true }
    );
  };

  protected deleteService = async (_id: string) => {
    return ServiceModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
