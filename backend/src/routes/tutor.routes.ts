import { Router } from 'express';
import { TutorController } from '../controllers/tutor.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';

export class TutorRoutes extends TutorController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.tutorRoutes();
  }

  private tutorRoutes() {
    this.router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      validate('createTutor'),
      this.createTutorAsync
    );
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.getAllTutorsAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getTutorAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateTutor'),
      this.updateTutorAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteTutorAsync
    );
  }
}

export default new TutorRoutes();
