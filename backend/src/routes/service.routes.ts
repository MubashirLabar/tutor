import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { validate } from '../middlewares/validations.middleware';

export class ServiceRoutes extends ServiceController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.serviceRoutes();
  }

  private serviceRoutes() {
    this.router.post('/', validate('createService'), this.createServiceAsync);
    this.router.get('/', this.getAllServicesAsync);
    this.router.get(
      '/:id',
      validate('mongoID', 'params'),
      this.getServiceAsync
    );
    this.router.patch(
      '/:id',
      validate('mongoID', 'params'),
      validate('updateService'),
      this.updateServiceAsync
    );
    this.router.delete('/:id', this.deleteServiceAsync);
  }
}

export default new ServiceRoutes();
