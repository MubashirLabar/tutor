import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { ITest } from '../interfaces';
import TestService from '../services/test.service';

export class TestController extends TestService {
  protected createTestAsync = async (req: Request, res: Response) => {
    const test: ITest = { ...req.body };
    try {
      const testCreated = await this.createTest(test);
      successResponse('Test added successfully.', testCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to add test', error, res);
    }
  };
  protected getAllTestsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const test = await this.getAllTests(filter as object);
      if (!test.length) {
        return successResponse('Test not found.', test, res);
      }
      successResponse('Test fetched successfully.', test, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch test', error, res);
    }
  };

  protected getTestAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const test = await this.getTest(params.id);
      if (!test) {
        return successResponse('Test not found.', test, res);
      }
      successResponse('Test fetched successfully.', test, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch test', error, res);
    }
  };

  protected updateTestAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const test: ITest = await this.getTest(params.id);
      if (!test) {
        return failureResponse('No test found with provided Id', null, res);
      }
      const updatedTest = await this.updateTest(body, params.id);
      successResponse('Test updated successfully.', updatedTest, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteTestAsync = async (req: Request, res: Response) => {
    try {
      const deletedTest = await this.deleteTest(req.params.id);
      successResponse('Test was deleted  successfull', deletedTest, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new TestController();
