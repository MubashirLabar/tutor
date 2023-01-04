import { FilterQuery } from 'mongoose';
import {
  IUser,
  IAgent,
  IFacebook,
  ITutor,
  IStudent,
  ICSUser
} from '../interfaces';
import {
  UserModel,
  AgentModel,
  StudentModel,
  ReferralModel,
  FacebookModel,
  CSUserModel,
  TutorModel
} from '../models';
import { generateUID } from '../utils/uuid';

export default class UserService {
  protected createUser = async (data: IUser) => {
    const user = new UserModel(data);
    user.setPassword(data.password);
    return user.save();
  };
  protected createAgent = async (agent: IAgent) => {
    const agentObject = new AgentModel(agent);
    return agentObject.save();
  };
  protected createStudent = async (data: IStudent) => {
    const student = new StudentModel(data);
    return student.save();
  };
  protected createTutor = async (data: ITutor) => {
    const tutor = new TutorModel(data);
    return tutor.save();
  };
  protected createCSUser = async (data: ICSUser) => {
    const csUser = new CSUserModel(data);
    return csUser.save();
  };
  protected createFacebookUser = async (data: IFacebook) => {
    const name = data.name.split(' ');
    data['first_name'] = name[0];
    data['last_name'] = name[1];
    data['verification_link'] = data['graphDomain'];
    const user = new UserModel(data);
    const uid = await generateUID();
    user.setPassword(uid);
    await user.save();
    data['image'] = data['picture'];
    data['facebook_id'] = data['id'];
    data['access_token'] = data['accessToken'];
    const facebook_user = new FacebookModel(data);
    facebook_user.user = user;
    await facebook_user.save();
    if (user.user_type == 'Agent') {
      const agent = new AgentModel();
      agent.user = user;
      agent.referral_code = await generateUID();
      const agentCreated = await agent.save();
      user.agentProfile = agentCreated._id;
    }
    if (user.user_type == 'Tutor') {
      const tutor = new TutorModel();
      tutor.user = user;
      const tutorCreated = await tutor.save();
      user.tutorProfile = tutorCreated._id;
    }
    if (user.user_type == 'Student') {
      const student = new StudentModel();
      student.user = user;
      const studentCreated = await student.save();
      user.studentProfile = studentCreated._id;
    }
    if (user.user_type == 'Support') {
      const csUser = new CSUserModel();
      csUser.user = user;
      const csUserCreated = await csUser.save();
      user.csProfile = csUserCreated._id;
    }

    await user.save();
    return user;
  };

  protected checkORCreateFacebookProfile = async (
    data: IFacebook,
    user: IUser
  ) => {
    const filter: FilterQuery<IFacebook> = {
      deleted_at: null,
      facebook_id: data['id']
    };
    let facebook_user = await FacebookModel.findOne(filter);
    if (!facebook_user) {
      data['image'] = data['picture'];
      data['facebook_id'] = data['id'];
      data['access_token'] = data['accessToken'];
      facebook_user = new FacebookModel(data);
      facebook_user.user = user;
      await facebook_user.save();
    }
    return facebook_user;
  };

  protected getRefferalUsers(referred_by: IUser) {
    const filter: FilterQuery<IUser> = {
      deleted_at: null,
      referred_by
    };
    return ReferralModel.find(filter)
      .populate(
        'referred_user',
        'email _id first_name last_name is_active user_type '
      )
      .select(['-referred_by', '-referall_link', '-status', '-_id'])
      .exec();
  }

  protected createUserWithRefferal = async (
    data: IUser,
    referral_user: IAgent
  ) => {
    const user = new UserModel(data);
    user.setPassword(data.password);
    await user.save();
    if (user.user_type == 'Student') {
      const student = new StudentModel(data);
      student.user = user;
      await student.save();
      const referral_data = {
        referred_by: referral_user.user,
        referred_user: user,
        referall_link: data.referral_code || '',
        status: 'ACCEPTED'
      };
      const referral = new ReferralModel(referral_data);
      await referral.save();
    }
    return user;
  };

  protected checkReferralCode = async (query: unknown) => {
    return AgentModel.findOne(query);
  };

  protected filterAgent = async (filter: unknown) => {
    return AgentModel.findOne(filter);
  };
  protected filterUser = async (filter: unknown) => {
    return UserModel.findOne(filter)
      .populate('agentProfile', '-_id')
      .populate('csProfile', '-_id')
      .populate('tutorProfile', '-_id')
      .populate('studentProfile', '-_id')
      .exec();
  };

  protected getUser = async (_id: unknown) => {
    return UserModel.findById(_id)
      .populate('agentProfile', '-_id')
      .populate('csProfile', '-_id')
      .populate('tutorProfile', '-_id')
      .populate('studentProfile', '-_id')
      .exec();
  };

  protected updateUsers = async (user: IUser, _id: string) => {
    return UserModel.findByIdAndUpdate(_id, { $set: user }, { new: true })
      .populate('agentProfile', '-_id')
      .populate('csProfile', '-_id')
      .populate('tutorProfile', '-_id')
      .populate('studentProfile', '-_id')
      .exec();
  };

  protected getAllUsers = async (filters: unknown) => {
    return UserModel.find(filters)
      .populate('agentProfile')
      .populate('csProfile')
      .populate('tutorProfile')
      .populate('studentProfile')
      .exec();
  };
  protected deleteRelatedProfile = async (user: IUser) => {
    let model = null;
    let _id = null;
    if (user.agentProfile) {
      model = AgentModel;
      _id = user.agentProfile;
    }
    if (user.studentProfile) {
      model = StudentModel;
      _id = user.studentProfile;
    }
    if (user.tutorProfile) {
      model = TutorModel;
      _id = user.tutorProfile;
    }
    if (user.csProfile) {
      model = CSUserModel;
      _id = user.csProfile;
    }
    if (!model) return;
    return model.findByIdAndDelete(_id);
  };
  protected deleteUser = async (_id: string) => {
    return UserModel.findByIdAndDelete(_id);
  };
}
