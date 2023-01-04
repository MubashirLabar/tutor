import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';

export class StudentRoutes extends StudentController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.studentRoutes();
  }

  private studentRoutes() {
    this.router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      validate('createStudent'),
      this.createStudentAsync
    );
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.getAllStudentsAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.getStudentAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateStudent'),
      this.updateStudentAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteStudentAsync
    );
  }
}

export default new StudentRoutes();
