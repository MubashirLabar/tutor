import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { ICategory } from '../interfaces';
import CategoryService from '../services/category.service';

export class CategoryController extends CategoryService {
  protected createCategoryAsync = async (req: Request, res: Response) => {
    const category: ICategory = { ...req.body };
    category.image_path = category.title + '_category';
    try {
      const categoryCreated = await this.createCategory(category);
      successResponse('Category added successfully.', categoryCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 11000) {
        return failureResponse('Category already exists.', error, res);
      }
      failureResponse('Failed to add category', error, res);
    }
  };
  protected getAllCategorysAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const category = await this.getAllCategorys(filter as object, 'true');
      if (!category.length) {
        return successResponse('Categories not found.', category, res);
      }
      successResponse('Categories fetched successfully.', category, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch categories', error, res);
    }
  };
  protected getSubjectsByCategoryAsync = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;
    try {
      const subjects = await this.getSubjectsByCategory(
        id as unknown as ICategory
      );
      if (!subjects.length) {
        return successResponse('Subjects not found.', null, res);
      }
      successResponse('Subjects fetched successfully.', subjects, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch subjects', error, res);
    }
  };

  protected getCategoryAsync = async (req: Request, res: Response) => {
    const { params, query } = req;
    try {
      const category = await this.getCategory(
        params.id,
        query.populate as string
      );
      if (!category) {
        return successResponse('Category not found.', category, res);
      }
      successResponse('Category fetched successfully.', category, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch category', error, res);
    }
  };

  protected updateCategoryAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const category: ICategory = await this.getCategory(params.id);
      if (!category) {
        return failureResponse('No category found with provided Id', null, res);
      }
      const updatedCategory = await this.updateCategory(body, params.id);
      successResponse('Category updated successfully.', updatedCategory, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteCategoryAsync = async (req: Request, res: Response) => {
    try {
      const category = await this.getCategory(req.params.id);
      await this.deleteSubjects(category as ICategory);
      const deletedCategory = await this.deleteCategory(req.params.id);
      successResponse(
        'Category & subjects under this category were deleted  successfull',
        deletedCategory,
        res
      );
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new CategoryController();
