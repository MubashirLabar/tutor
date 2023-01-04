import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { ISubject } from '../interfaces';
import SubjectService from '../services/subject.service';

export class SubjectController extends SubjectService {
  protected createSubjectAsync = async (req: Request, res: Response) => {
    const sub: ISubject = { ...req.body };
    try {
      const category = await this.filterCategories(
        sub.category as unknown as string
      );
      if (!category) {
        return failureResponse(
          'Category doesnot exists or is not active.',
          null,
          res
        );
      }

      const SubjectCreated = await this.createSubject(sub);
      successResponse('Subject created successfully.', SubjectCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 11000) {
        return failureResponse('Subject already exists.', error, res);
      }
      failureResponse('Failed to create Subject', error, res);
    }
  };
  protected getAllSubjectsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const sub = await this.getAllSubjects(filter as object);
      if (!sub.length) {
        return successResponse('Subject not found.', sub, res);
      }
      successResponse('Subject fetched successfully.', sub, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch Subject', error, res);
    }
  };

  protected getSubjectAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const sub = await this.getSubject(params.id);
      if (!sub) {
        return successResponse('Subject not found.', sub, res);
      }
      successResponse('Subject fetched successfully.', sub, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch Subject', error, res);
    }
  };
  protected getServicesBySubjectAsync = async (req: Request, res: Response) => {
    try {
      const services = await this.getServicesBySubject(
        req.params.id as unknown as ISubject
      );
      if (!services.length) {
        return successResponse('Services not found.', services, res);
      }
      successResponse('Services fetched successfully.', services, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch Services', error, res);
    }
  };

  protected updateSubjectAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const category = await this.filterCategories(
        body.category as unknown as string
      );
      if (!category) {
        return failureResponse(
          'Category doesnot exists or is not active.',
          null,
          res
        );
      }
      const sub: ISubject = await this.getSubject(params.id);
      if (!sub) {
        return failureResponse('No subject found with provided Id', null, res);
      }
      const Subject: ISubject = { ...body, _id: params.id };
      Subject.updated_at = new Date();
      const updatedSubject = await this.updateSubject(Subject, params.id);
      successResponse('Subject updated successfully.', updatedSubject, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteSubjectAsync = async (req: Request, res: Response) => {
    try {
      const deletedSubject = await this.deleteSubject(req.params.id);
      successResponse('Subject was deleted  successfull', deletedSubject, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new SubjectController();
