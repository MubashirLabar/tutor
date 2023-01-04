import { Router } from 'express';
import { AgentController } from '../controllers/agent.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';

export class AgentRoutes extends AgentController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.agentRoutes();
  }

  private agentRoutes() {
    this.router.post(
      '/',
      // passport.authenticate('jwt', { session: false }),
      validate('createAgent'),
      this.createAgentAsync
    );
    this.router.get(
      '/',
      // passport.authenticate('jwt', { session: false }),
      this.getAllAgentsAsync
    );
    this.router.get(
      '/:id',
      // passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getAgentAsync
    );
    this.router.get(
      '/:id/referrals',
      // passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getReferralsAsync
    );
    this.router.patch(
      '/:id',
      // passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateAgent'),
      this.updateAgentAsync
    );
    this.router.delete(
      '/:id',
      // passport.authenticate('jwt', { session: false }),
      this.deleteAgentAsync
    );
    this.router.post(
      '/:id/users',
      passport.authenticate('jwt', { session: false }),
      validate('createCSUser'), // CS - Customer Support
      this.createCSUserAsync
    );
    this.router.get(
      '/:id/users',
      passport.authenticate('jwt', { session: false }),
      this.getCSUsersAsync
    );
    this.router.delete(
      '/:id/users/:userId',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.deleteCSUserAsync
    );
  }
}

export default new AgentRoutes();
