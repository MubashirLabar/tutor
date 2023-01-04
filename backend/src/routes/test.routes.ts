import { Router } from 'express';
import { TestController } from '../controllers/test.controller';
import { validate } from '../middlewares/validations.middleware';

export class TestRoutes extends TestController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.testRoutes();
  }

  private testRoutes() {
    this.router.post('/', validate('createTest'), this.createTestAsync);
    this.router.get('/', this.getAllTestsAsync);
    this.router.get('/:id', this.getTestAsync);
    this.router.patch(
      '/:id',
      validate('mongoID', 'params'),
      validate('updateTest'),
      this.updateTestAsync
    );
    this.router.delete('/:id', this.deleteTestAsync);
  }
}

export default new TestRoutes();
