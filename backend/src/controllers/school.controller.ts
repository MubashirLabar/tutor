import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { ISchool } from '../interfaces';
import SchoolService from '../services/school.service';

export class SchoolController extends SchoolService {
  protected createSchoolAsync = async (req: Request, res: Response) => {
    const school: ISchool = { ...req.body };
    try {
      const schoolCreated = await this.createSchool(school);
      successResponse('School added successfully.', schoolCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to add school', error, res);
    }
  };
  protected getAllSchoolsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const school = await this.getAllSchools(filter as object);
      if (!school.length) {
        return successResponse('School not found.', school, res);
      }
      successResponse('School fetched successfully.', school, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch school', error, res);
    }
  };

  protected getSchoolAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const school = await this.getSchool(params.id);
      if (!school) {
        return successResponse('School not found.', school, res);
      }
      successResponse('School fetched successfully.', school, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch school', error, res);
    }
  };

  protected updateSchoolAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const school: ISchool = await this.getSchool(params.id);
      if (!school) {
        return failureResponse('No school found with provided Id', null, res);
      }
      const updatedSchool = await this.updateSchool(body, params.id);
      successResponse('School updated successfully.', updatedSchool, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteSchoolAsync = async (req: Request, res: Response) => {
    try {
      const deletedSchool = await this.deleteSchool(req.params.id);
      successResponse('School  was deleted  successfull', deletedSchool, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new SchoolController();
