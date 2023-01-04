import { Router } from 'express';
import { QuickQuestionController } from '../controllers/quick.question.controller';
import { validate } from '../middlewares/validations.middleware';
import * as passport from 'passport';

export class QuickQuestionRoutes extends QuickQuestionController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.quickQuestionRoutes();
  }

  private quickQuestionRoutes() {
    this.router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      validate('createQuickQuestion'),
      this.createQuickQuestionAsync
    );
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.getAllQuickQuestionsAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getQuickQuestionAsync
    );
    this.router.post(
      '/:id/assign',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('assignQuickQuestion'),
      this.assignQuickQuestionAsync
    );
    this.router.post(
      '/:id/answer',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('answerQuickQuestion'),
      this.answerQuickQuestionAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      this.deleteQuickQuestionAsync
    );
  }
}

export default new QuickQuestionRoutes();
