import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validate } from '../middlewares/validations.middleware';
export class CategoryRoutes extends CategoryController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.categoryRoutes();
  }

  private categoryRoutes() {
    this.router.post('/', validate('createCategory'), this.createCategoryAsync);
    this.router.get('/', this.getAllCategorysAsync);
    this.router.get(
      '/:id',
      validate('mongoID', 'params'),
      this.getCategoryAsync
    );
    this.router.get(
      '/:id/subjects',
      validate('mongoID', 'params'),
      this.getSubjectsByCategoryAsync
    );
    this.router.patch(
      '/:id',
      validate('updateCategory'),
      validate('mongoID', 'params'),
      this.updateCategoryAsync
    );
    this.router.delete('/:id', this.deleteCategoryAsync);
  }
}

export default new CategoryRoutes();
