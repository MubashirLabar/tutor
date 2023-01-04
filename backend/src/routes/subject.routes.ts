import { Router } from 'express';
import { SubjectController } from '../controllers/subject.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';

export class SubjectRoutes extends SubjectController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.subjectRoutes();
  }

  private subjectRoutes() {
    this.router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      validate('createSubject'),
      this.createSubjectAsync
    );
    this.router.get('/', this.getAllSubjectsAsync);
    this.router.get(
      '/:id',
      validate('mongoID', 'params'),
      this.getSubjectAsync
    );
    this.router.get(
      '/:id/services',
      validate('mongoID', 'params'),
      this.getServicesBySubjectAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateSubject'),
      this.updateSubjectAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteSubjectAsync
    );
  }
}

export default new SubjectRoutes();
