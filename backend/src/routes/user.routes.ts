import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validations.middleware';
import { upload } from '../middlewares/upload.middleware';
import * as passport from 'passport';

export class UserRoutes extends UserController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post('/', validate('createUser'), this.createUserAsync);
    this.router.post('/login', this.createUserLoginAsync);
    this.router.post('/auth-facebook', this.createUserFacebookLoginAsync);
    this.router.post(
      '/token/verify',
      passport.authenticate('jwt', { session: false }),
      this.userTokenVerifyAsync
    );
    this.router.post(
      '/email/verification-code',
      passport.authenticate('jwt', { session: false }),
      validate('sendVerificationEmail'),
      this.sendVerificationCodeEmailAsync
    );
    this.router.post(
      '/verify-email',
      passport.authenticate('jwt', { session: false }),
      validate('verifyEmail'),
      this.verifyEmailAsync
    );
    this.router.get(
      '/referral',
      passport.authenticate('jwt', { session: false }),
      this.getReferralUsersAsync
    );
    this.router.post(
      '/phone/verify',
      validate('phoneNumber'),
      this.verifyPhoneNumberAsync
    );
    this.router.post(
      '/phone/otp',
      passport.authenticate('jwt', { session: false }),
      validate('OTP'),
      this.sendVerificationCodeAsync
    );
    this.router.get('/verification/:id', this.getUserVerifcationAsync);
    this.router.post('/forgot-password', this.forgotPasswordAsync);
    this.router.post('/reset-password', this.resetPasseordAsync);
    this.router.post(
      '/image',
      passport.authenticate('jwt', { session: false }),
      upload.single('image'),
      this.uploadImageAsync
    );
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: true }),
      this.getAuthUserAsync
    );
    this.router.get(
      '/filter',
      passport.authenticate('jwt', { session: false }),
      validate('FilterUser', 'query'),
      this.filterUserAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.getUserAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateUser'),
      this.updateUserAsync
    );
    this.router.post(
      '/change-password',
      passport.authenticate('jwt', { session: false }),
      validate('changePassword'),
      this.updatePasswordAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteUserAsync
    );
  }
}

export default new UserRoutes();
