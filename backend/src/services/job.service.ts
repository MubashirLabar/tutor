import { IJob } from '../interfaces';
import {
  AgentModel,
  CategoryModel,
  CouponModel,
  FileModel,
  JobModel,
  ServiceModel,
  SubjectModel,
  UserModel
} from '../models';

export default class JobService {
  protected createJob(job: IJob) {
    const newJob = new JobModel(job);
    return newJob.save();
  }
  protected filterCoupons = async (_id: string) => {
    return CouponModel.findOne({ _id, deleted_at: null }).lean();
  };
  protected filterAttachments = async (ids: string[]) => {
    return FileModel.find({ _id: { $in: ids }, deleted_at: null });
  };
  protected filterAgents = async (ids: string[]) => {
    return AgentModel.find({ _id: { $in: ids }, deleted_at: null });
  };
  protected filterCategories = async (_id: string) => {
    return CategoryModel.findOne({ _id, deleted_at: null });
  };
  protected filterSubjects = async (_id: string) => {
    return SubjectModel.findOne({ _id, deleted_at: null });
  };
  protected filterServices = async (_id: string) => {
    return ServiceModel.findOne({ _id, deleted_at: null });
  };
  protected filterUsers = async (_id: string) => {
    return UserModel.findOne({ _id });
  };
  protected getJob = async (_id: string) => {
    return JobModel.findOne({ _id, deleted_at: null })
      .populate('coupon')
      .populate('grad_level')
      .populate('attachments')
      .populate('invites')
      .populate('category', '_id title image_path')
      .populate('subject', '_id title')
      .populate('service', '_id title')
      .populate('student', '_id email first_name last_name')
      .exec();
  };

  protected getAllJobs = async (filter: object) => {
    return JobModel.find({ ...filter, deleted_at: null })
      .populate('coupon')
      .populate('grad_level')
      .populate('attachments')
      .populate('invites')
      .populate('category', '_id title image_path')
      .populate('subject', '_id title')
      .populate('service', '_id title')
      .populate('student', '_id email first_name last_name')
      .exec();
  };

  protected updateJob = async (job: IJob, _id: string) => {
    return JobModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: job },
      { new: true }
    );
  };

  protected deleteJob = async (_id: string) => {
    return JobModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
