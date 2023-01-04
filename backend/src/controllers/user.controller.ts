import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IUser, IFacebook, IAgent, ITutor, ICSUser } from '../interfaces';
import UserService from '../services/user.service';
import * as passport from 'passport';
import { sendEmail, sendMessage } from '../services/notification.service';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import env from '../config/env.config.manager';
import '../config/passport';
import { generateUID } from '../utils/uuid';
import TwilioApi from '../apis/twilio.api';

export class UserController extends UserService {
  protected createUserAsync = async (req: Request, res: Response) => {
    const verify_code = uuidv4();
    const data: IUser = {
      ...req.body,
      verification_link: verify_code,
      email_verified: false,
      phone_verified: false
    };
    if (data.user_type === 'Student' && data.referral_code) {
      const existingAgent = await this.filterAgent({
        referral_code: data.referral_code
      });
      if (!existingAgent) {
        return failureResponse('Invalid referral_code.', '', res);
      }
    }
    try {
      let query;
      if (req.body.registration_source == 'email') {
        query = { email: req.body.email.toLowerCase() };
      }
      if (req.body.registration_source == 'phone') {
        query = { phone: req.body.phone };
      }
      const user = await this.getAllUsers(query);
      let userCreated;
      let agentCreated;
      // let studentCreated;
      let tutorCreated;
      let csUserCreated;
      if (user.length && req.body.registration_source == 'email') {
        return failureResponse('Sorry! Email Already exists.', '', res);
      }
      if (user.length && req.body.registration_source == 'phone') {
        return failureResponse('Sorry! Phone Already exists.', '', res);
      }
      if (data.referral_code && data.user_type == 'Student') {
        const refferalUser = await this.checkReferralCode({
          referral_code: data.referral_code
        });
        if (!refferalUser)
          return failureResponse('Invalid Refferral code.', '', res);
        userCreated = await this.createUserWithRefferal(data, refferalUser);
      } else {
        userCreated = await this.createUser(data);
      }
      if (userCreated.user_type == 'Agent') {
        const agent: IAgent = {
          ...req.body,
          user: userCreated._id,
          referral_code: await generateUID()
        };
        agentCreated = await this.createAgent(agent);
        userCreated.agentProfile = agentCreated._id;
      }
      if (userCreated.user_type == 'Tutor') {
        const tutor: ITutor = { ...req.body, user: userCreated._id };
        tutorCreated = await this.createTutor(tutor);
        userCreated.tutorProfile = tutorCreated._id;
      }
      // if (userCreated.user_type == 'Student') {
      //   const student: IStudent = { ...req.body, user: userCreated._id };
      //   studentCreated = await this.createStudent(student);
      //   userCreated.studentProfile = studentCreated._id;
      // }
      if (userCreated.user_type == 'Support') {
        const csUser: ICSUser = { ...req.body, user: userCreated._id };
        csUserCreated = await this.createCSUser(csUser);
        userCreated.csUserProfile = csUserCreated._id;
      }
      //create twilio conversation user
      const twilio = new TwilioApi();
      const twilioSid = await twilio.createConversationUser(userCreated);
      if (twilioSid) {
        userCreated.twilio_sid = twilioSid;
      }

      await userCreated.save();
      // console.log(userCreated);
      delete userCreated.password;
      delete userCreated.verification_link;
      if (req.body.registration_source == 'email') {
        sendEmail(userCreated.email, 'Email Verification', 'verify_email', {
          first_name: userCreated.first_name,
          last_name: userCreated.last_name,
          link: `${req.protocol}://${req.hostname}${
            req.hostname === 'localhost' ? ':3000' : ''
          }/v1/api/users/verification/${verify_code}`
        });
      }
      // phone verification
      if (req.body.registration_source == 'phone') {
        const message = `Please verify your phone number by entering following code: ${verify_code}`;
        await sendMessage(userCreated.phone_number, message);
      }

      successResponse('User created successfully.', userCreated, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch user', error, res);
    }
  };

  protected userTokenVerifyAsync = async (req: Request, res: Response) => {
    try {
      const decoded = jwt.verify(
        req.headers['authorization'].replace('Bearer ', ''),
        env.getEnvValue('SECRET')
      );
      if (!decoded) return failureResponse('Invalid token.', decoded, res);
      successResponse('Token verified successfully.', decoded, res);
    } catch (error: unknown) {
      failureResponse('Failed to token verification', error, res);
    }
  };
  protected sendVerificationCodeEmailAsync = async (
    req: Request,
    res: Response
  ) => {
    try {
      const decoded = jwt.verify(
        req.headers['authorization'].replace('Bearer ', ''),
        env.getEnvValue('SECRET')
      );
      const email = req.body.email.toLowerCase();
      let user = await this.filterUser({ email });
      const email_verification_code = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
      if (user) {
        if (user._id !== decoded['_id']) {
          return failureResponse('Email already in use', null, res);
        }
      }
      user = await this.getUser(decoded['_id']);
      if (user.email === email) {
        if (user.email_verified) {
          return failureResponse('Email already verified', null, res);
        }
      }
      user.verification_link = email_verification_code;
      user.temp_mail = email;
      await user.save();
      await sendEmail(email, 'Verify your email', 'verify_email_with_code', {
        first_name: user.first_name,
        last_name: user.last_name,
        email_verification_code
      });
      successResponse('A code has been sent to your email address.', null, res);
    } catch (error: unknown) {
      failureResponse('Failed to send verification code', error, res);
    }
  };

  protected verifyEmailAsync = async (req: Request, res: Response) => {
    try {
      const decoded = jwt.verify(
        req.headers['authorization'].replace('Bearer ', ''),
        env.getEnvValue('SECRET')
      );
      const { verification_code, email } = req.body;
      const filteredUser = await this.filterUser({ email });
      if (filteredUser) {
        if (filteredUser._id !== decoded['_id']) {
          return failureResponse('Email already in use', null, res);
        }
      }
      const user = await this.getUser(decoded['_id'] as IUser);
      if (!user) return failureResponse('No user found.', null, res);
      if (user.email_verified) {
        return failureResponse('Already verified.', null, res);
      }
      if (user.verification_link !== verification_code) {
        return failureResponse('Invalid verification code.', null, res);
      }
      if (user.temp_mail !== email) {
        return failureResponse(
          'Please provide the email address you used to send this verification code.',
          null,
          res
        );
      }
      user.temp_mail = '';
      user.email = email;
      user.email_verified = true;
      user.verification_link = '';
      await user.save();
      successResponse('Email verified successfully.', null, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to verify email.', error, res);
    }
  };
  protected getReferralUsersAsync = async (req: Request, res: Response) => {
    try {
      const users = await this.getRefferalUsers(req.user['id'] as IUser);
      successResponse('Fetched all referral users successfully.', users, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to fetch referral users.', error, res);
    }
  };

  protected createUserLoginAsync = async (req: Request, res: Response) => {
    try {
      passport.authenticate('local', (err: Error, user: IUser) => {
        if (err) {
          return failureResponse('No user found..', err, res);
        }
        if (!user) {
          return failureResponse('Invalid email or password.', null, res);
        }
        // if (!user.email_verified) {
        //   return failureResponse(
        //     'Please verify your email address.',
        //     null,
        //     res
        //   );
        // }

        req.login(user, { session: true }, (error: unknown) => {
          if (error) {
            return failureResponse('Invalid email or password.', error, res);
          }
        });
        return successResponse('User logined successfull', user, res);
      })(req, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch users', error, res);
    }
  };
  protected getUserVerifcationAsync = async (req: Request, res: Response) => {
    const { id: verification_link } = req.params;
    try {
      const user = await this.filterUser({ verification_link });
      if (!user) {
        return failureResponse('Failed to fetch user', null, res);
      }
      user.verification_link = '';
      user.email_verified = true;
      await user.save();
      successResponse('User verified successfully.', null, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch user', error, res);
    }
  };
  protected verifyPhoneNumberAsync = async (req: Request, res: Response) => {
    const { verification_code, phone } = req.body;
    const decoded = jwt.verify(
      req.headers['authorization'].replace('Bearer ', ''),
      env.getEnvValue('SECRET')
    );
    const user = await this.filterUser({ _id: decoded['_id'] });
    if (!user) {
      return failureResponse('User not found.', null, res);
    }
    if (user.phone === phone) {
      if (user.phone_verified) {
        return failureResponse('Already verified.', null, res);
      }
    }
    if (phone !== user.temp_phone) {
      return failureResponse(
        'Please provide the number you have received the code.',
        null,
        res
      );
    }
    if (user.verification_code !== verification_code) {
      return failureResponse('Invalid code.', null, res);
    }
    user.phone = user.temp_phone;
    user.temp_phone = '';
    user.verification_code = '';
    user.phone_verified = true;
    await user.save();
    successResponse('Phone number verified successfully.', null, res);
  };
  protected sendVerificationCodeAsync = async (req: Request, res: Response) => {
    const { phone } = req.body;
    let user = await this.filterUser({ phone });
    if (user) {
      return failureResponse('phone already taken by other user.', null, res);
    }
    const decoded = jwt.verify(
      req.headers['authorization'].replace('Bearer ', ''),
      env.getEnvValue('SECRET')
    );
    user = await this.filterUser({ _id: decoded['_id'] });
    if (user.phone === phone) {
      if (user.phone_verified) {
        return failureResponse('Already verified.', null, res);
      }
    }
    user.temp_phone = phone;
    user.verification_code = Math.floor(1000 + Math.random() * 9000).toString();
    const message = `Please verify your phone number by entering following code: ${user.verification_code}`;
    await sendMessage(phone, message);
    await user.save();
    successResponse('Verification code sent successfully.', null, res);
  };

  protected resetPasseordAsync = async (req: Request, res: Response) => {
    const user = await this.filterUser({
      verification_link: req.body.verification_link
    });
    if (!user) {
      return failureResponse('Failed to fetch user', null, res);
    }
    user.setPassword(req.body.password);
    user.verification_link = '';
    user.save();
    successResponse('User password reset successfully.', null, res);
  };
  protected forgotPasswordAsync = async (req: Request, res: Response) => {
    const verify_code = uuidv4();
    const user = await this.filterUser({ email: req.body.email });
    if (!user) {
      return failureResponse('Invalid email address', null, res);
    }
    user.verification_link = verify_code;
    user.save();
    sendEmail(user.email, 'Reset Password', 'reset_password', {
      link: `${req.protocol}://${req.hostname}${
        req.hostname === 'localhost' ? ':3000' : ''
      }/v1/api/users/verification/${verify_code}`,
      first_name: user.first_name,
      last_name: user.last_name
    });
    successResponse(
      'Please check your email to reset the password.',
      null,
      res
    );
  };

  protected createUserFacebookLoginAsync = async (
    req: Request,
    res: Response
  ) => {
    const verify_code = uuidv4();
    req.body.password = verify_code;
    const userData: IFacebook = {
      ...req.body,
      email_verified: true
    };
    try {
      const user = await this.filterUser({ email: req.body.email });
      if (user && req.body.graphDomain == 'facebook') {
        const facebookUser = await this.checkORCreateFacebookProfile(
          req.body,
          user
        );
        if (!facebookUser) return failureResponse('No user found..', null, res);

        passport.authenticate('local', (err: Error, user: IUser) => {
          if (err) {
            return failureResponse('No user found..', err, res);
          }
          if (!user) {
            return failureResponse('Invalid email or password.', null, res);
          }
          req.login(user, { session: false }, async (error: unknown) => {
            if (error)
              return failureResponse('Invalid email or password.', error, res);
            return successResponse('User logined successfull', user, res);
          });
        })(req, res);
      } else {
        const user = await this.createFacebookUser(userData);
        //create twilio conversation user
        const twilio = new TwilioApi();
        const twilioSid = await twilio.createConversationUser(user);
        if (twilioSid) {
          user.twilio_sid = twilioSid;
        }
        user.save();
        if (!user)
          return failureResponse(
            'Some error occur. Please try again.',
            null,
            res
          );
        passport.authenticate('local', (err: Error, user: IUser) => {
          if (err) {
            return failureResponse('No user found..', err, res);
          }
          if (!user) {
            return failureResponse('Invalid email or password.', null, res);
          }
          req.login(user, { session: false }, async (error: unknown) => {
            if (error)
              return failureResponse('Invalid email or password.', error, res);
            return successResponse('User logined successfull', user, res);
          });
        })(req, res);
      }
    } catch (error: unknown) {
      failureResponse('Failed to fetch user', error, res);
    }
  };

  protected getAuthUserAsync = async (req: Request, res: Response) => {
    try {
      const decoded = jwt.verify(
        req.headers['authorization'].replace('Bearer ', ''),
        env.getEnvValue('SECRET')
      );
      const user = await this.filterUser({ _id: decoded['_id'] });
      if (!user) {
        return failureResponse('Failed to fetch user', null, res);
      }
      const host = `${req.protocol}://${req.get('host')}/static/images/${
        user.image_path
      }`;

      if (user.image_path) {
        user.image_path = host;
      } else {
        user.image_path = '';
      }

      successResponse('Users fetched successfully.', user, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch users', error, res);
    }
  };
  protected filterUserAsync = async (req: Request, res: Response) => {
    const query = req.query.query;
    let search_type = req.query.search_type as string;
    if (search_type === 'id') search_type = '_id';
    const filter = {};
    filter[search_type] = query;
    const user = await this.filterUser(filter);
    if (!user) {
      return failureResponse('Failed to fetch user', null, res);
    }
    successResponse('Users fetched successfully.', user, res);
  };
  protected getAllUserAsync = async (req: Request, res: Response) => {
    const { filters } = req.query;
    try {
      const user = await this.getAllUsers(filters);
      if (!user.length) {
        return failureResponse('Failed to fetch user', null, res);
      }
      successResponse('Users fetched successfully.', user, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch users', error, res);
    }
  };
  protected getUserAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const user = await this.getUser(params.id);
      if (!user) {
        return failureResponse('Failed to fetch user', null, res);
      }
      const host = `${req.protocol}://${req.get('host')}/static/images/${
        user.image_path
      }`;
      if (user.image_path) {
        user.image_path = host;
      } else {
        user.image_path = '';
      }
      successResponse('User fetched successfully.', user, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch user', error, res);
    }
  };

  protected uploadImageAsync = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const user = await this.getUser(req.user['id']);
      if (!user) {
        return failureResponse('No user found with provided Id', null, res);
      }

      const updatedUser = await this.updateUsers(body, req.user['id']);
      const host = `${req.protocol}://${req.get('host')}/static/images/${
        updatedUser.image_path
      }`;
      updatedUser.image_path = host;
      successResponse('User image updated successfully.', updatedUser, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };
  protected updateUserAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const user = await this.getUser(params.id);
      if (!user) {
        return failureResponse('No user found with provided Id', null, res);
      }

      const updatedUser = await this.updateUsers(body, params.id);
      const host = `${req.protocol}://${req.get('host')}/static/images/${
        updatedUser.image_path
      }`;

      if (updatedUser.image_path) {
        updatedUser.image_path = host;
      } else {
        updatedUser.image_path = '';
      }

      successResponse('User updated successfully.', updatedUser, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };
  protected updatePasswordAsync = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const user = await this.getUser(req.user['id']);
      if (!user) {
        return failureResponse('No user found with provided Id', null, res);
      }
      const isPassValid = user.validPassword(body.old_password);
      if (!isPassValid) return failureResponse('Invalid password', null, res);
      user.setPassword(body.new_password);
      await user.save();
      successResponse('Password updated successfully.', {}, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteUserAsync = async (req: Request, res: Response) => {
    try {
      const user = await this.getUser(req.params.id);
      if (!user) {
        return failureResponse('Failed to fetch user', null, res);
      }
      await this.deleteRelatedProfile(user);
      await this.deleteUser(req.params.id);
      successResponse('user was deleted  successfull', user, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new UserController();
