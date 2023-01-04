import { Router } from 'express';
import { JobController } from '../controllers/job.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';

export class JobRoutes extends JobController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.jobRoutes();
  }

  private jobRoutes() {
    this.router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      validate('createJob'),
      this.createJobAsync
    );
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.getAllJobsAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getJobAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateJob'),
      this.updateJobAsync
    );
    this.router.patch(
      '/:id/invite',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('inviteAgentsJob'),
      this.inviteAgentsJobAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteJobAsync
    );
  }
}

export default new JobRoutes();
