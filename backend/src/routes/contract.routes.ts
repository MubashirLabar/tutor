import { Router } from 'express';
import { ContractController } from '../controllers/contract.controller';
import { validate } from '../middlewares/validations.middleware';
import { upload } from '../middlewares/upload.middleware';
import * as passport from 'passport';
export class ContractRoutes extends ContractController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.contractRoutes();
  }

  private contractRoutes() {
    this.router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      upload.any('documents'),
      validate('createContract'),
      this.createContractAsync
    );
    this.router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.getAllContractsAsync
    );
    this.router.get(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      this.getContractAsync
    );
    this.router.patch(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('mongoID', 'params'),
      validate('updateContract'),
      this.updateContractAsync
    );
    this.router.delete(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      validate('updateContract'),
      this.deleteContractAsync
    );
  }
}

export default new ContractRoutes();
