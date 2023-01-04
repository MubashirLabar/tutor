import { IUser } from 'interfaces';
import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
// import UserService from '../services/user.service';
import { UserModel } from '../models';
// import { use } from 'passport';

export default class TwilioApi {
  protected client;
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.client = require('twilio')(accountSid, authToken);
  }

  public async createConversationUser(user: IUser) {
    try {
      if (!user.twilio_sid) {
        const tUser = await this.client.conversations.users.create({
          identity: `${user._id}`,
          friendlyName: `${user.first_name} ${user.last_name}`,
          role_sid: `${process.env.TWILIO_USER_ROLE_SID}`,
          chat_service_sid: `${process.env.TWILIO_CHAT_SERVICE_SID}`
        });
        return tUser.sid;
      }
      return user.twilio_sid;
    } catch (error) {
      console.log('createConversationUser', error);
      return false;
    }
  }

  protected generateUserToken = async (req: Request, res: Response) => {
    try {
      // const users = await this.getRefferalUsers(req.user['id'] as IUser);
      console.log(req);
      console.log(req.user);
      // const userService = new UserService();
      const user = await UserModel.findOne({ _id: req.user['_id'] });

      if (user && !user.twilio_sid) {
        const twilioSid = await this.createConversationUser(user);
        if (twilioSid) {
          user.twilio_sid = `${twilioSid}`;
          await user.save();
        }
      }

      if (user.twilio_sid) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const AccessToken = require('twilio').jwt.AccessToken;
        const ChatGrant = AccessToken.ChatGrant;

        // Create a "grant" which enables a client to use Chat as a given user,
        // on a given device
        const chatGrant = new ChatGrant({
          serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
        });

        // Create an access token which we will sign and return to the client,
        // containing the grant we just created
        const token = new AccessToken(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_API_KEY,
          process.env.TWILIO_API_SECRET,
          { identity: `${user._id}` }
        );

        token.addGrant(chatGrant);
        successResponse(
          'Fetched twilio auth token successfully.',
          token.toJwt(),
          res
        );
        return;
      }
      failureResponse('Unknown failed', [], res);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to fetch Twilio auth token', error, res);
    }
  };
}
