import { Router } from 'express';
import { SchoolController } from '../controllers/school.controller';
import { validate } from '../middlewares/validations.middleware';

export class SchoolRoutes extends SchoolController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.schoolRoutes();
  }

  private schoolRoutes() {
    this.router.post('/', validate('createSchool'), this.createSchoolAsync);
    this.router.get('/', this.getAllSchoolsAsync);
    this.router.get('/:id', this.getSchoolAsync);
    this.router.patch(
      '/:id',
      validate('mongoID', 'params'),
      validate('updateSchool'),
      this.updateSchoolAsync
    );
    this.router.delete('/:id', this.deleteSchoolAsync);
  }
}

export default new SchoolRoutes();
