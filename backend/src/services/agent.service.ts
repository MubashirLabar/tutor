import { FilterQuery } from 'mongoose';
import { IAgent, ICSUser, IUser, UserType } from '../interfaces';
import { AgentModel, UserModel, CSUserModel, ReferralModel } from '../models';

export default class AgentService {
  protected getUser(_id: string) {
    return UserModel.findOne({ _id, user_type: UserType.agent });
  }
  protected createAgent(agent: IAgent) {
    const newAgent = new AgentModel(agent);
    return newAgent.save();
  }

  protected getUserAgent = async (query: unknown) => {
    return AgentModel.findOne(query)
      .populate(
        'user',
        'first_name last_name email user_type description location languages email_verified'
      )
      .populate('services')
      .exec();
  };

  protected getAgent = async (_id: string) => {
    const filter = { _id, deleted_at: null };
    return AgentModel.findOne(filter)
      .populate(
        'user',
        'first_name last_name email user_type description location languages email_verified image_path'
      )
      .populate('services')
      .lean()
      .exec();
  };
  protected getReferrals = async (referred_by: IUser) => {
    return ReferralModel.find({ referred_by, deleted_at: null })
      .populate('referred_user', '_id email phone first_name last_name')
      .lean()
      .exec();
  };

  protected getAllAgents = async (filter) => {
    const filters = {
      ...filter,
      deleted_at: null
    };
    if (Object.prototype.hasOwnProperty.call(filters, 'email')) {
      const user = await UserModel.findOne({ email: filters['email'] });
      delete filters['email'];
      filters['user'] = user;
    }
    if (Object.prototype.hasOwnProperty.call(filters, 'search')) {
      filters['$text'] = {
        $search: filters['search']
      };
      delete filters['search'];
    }
    return AgentModel.find(filters)
      .populate(
        'user',
        'first_name last_name email user_type description location languages email_verified image_path'
      )
      .lean()
      .exec();
  };

  protected updateAgent = async (agent: IAgent, _id: string) => {
    return AgentModel.findByIdAndUpdate(_id, { $set: agent }, { new: true });
  };
  protected deleteAgent = async (_id: string) => {
    return AgentModel.findByIdAndDelete(_id);
  };
  protected deleteUser = async (_id: string) => {
    return UserModel.findByIdAndDelete(_id);
  };
  protected createUser = async (data: IUser) => {
    const user = new UserModel(data);
    user.setPassword(user.password);
    return user.save();
  };
  protected createCSUser(user: ICSUser) {
    const newUser = new CSUserModel(user);
    return newUser.save();
  }
  protected getCSUsers(created_by_agent: IUser) {
    const filter: FilterQuery<ICSUser> = {
      created_by_agent
    };
    return CSUserModel.find(filter).populate('user').exec();
  }
  protected getACSUser(_id: string) {
    return CSUserModel.findById(_id).populate('user').exec();
  }

  protected deleteCSUser = async (_id: string) => {
    return CSUserModel.findByIdAndDelete(_id);
  };
}
