import { Router } from 'express';
import TwilioApi from '../apis/twilio.api';
import * as passport from 'passport';

export class TwilioRoutes extends TwilioApi {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.twilioRoutes();
  }
  private twilioRoutes() {
    this.router.get(
      '/auth',
      passport.authenticate('jwt', { session: false }),
      this.generateUserToken
    );
  }
}
export default new TwilioRoutes();
