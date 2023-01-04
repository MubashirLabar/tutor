import { IContract, JobStatus } from '../interfaces';
import { JobModel, FileModel, ContractModel, UserModel } from '../models';

export default class ContractService {
  protected createContract(contract: IContract) {
    const newContract = new ContractModel(contract);
    return newContract.save();
  }
  protected markJobHired(_id) {
    return JobModel.findOneAndUpdate(
      { _id, deleted_at: null },
      {
        $set: {
          status: JobStatus.HIRED
        }
      }
    );
  }

  protected filterAttachments = async (ids: string[]) => {
    return FileModel.find({ _id: { $in: ids }, deleted_at: null });
  };
  protected filterJobs = async (_id: string) => {
    return JobModel.findOne({ _id, deleted_at: null });
  };
  protected filterUsers = async (_id: string) => {
    return UserModel.findOne({ _id });
  };
  protected filterMultipleUsers = async (ids?: string[]) => {
    return UserModel.find({ _id: { $in: ids }, deleted_at: null });
  };

  protected getContract = async (_id: string) => {
    return ContractModel.findOne({ _id, deleted_at: null })
      .populate('attachments')
      .populate('agent')
      .populate('student')
      .populate('tutors')
      .populate('job')
      .lean()
      .exec();
  };

  protected getAllContracts = async (filter: object) => {
    return ContractModel.find({ ...filter, deleted_at: null })
      .populate('attachments')
      .populate('agent')
      .populate('student')
      .populate('tutors')
      .populate('job')
      .lean()
      .exec();
  };

  protected updateContract = async (contract: IContract, _id: string) => {
    return ContractModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: contract },
      { new: true }
    );
  };

  protected deleteContract = async (_id: string) => {
    return ContractModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
