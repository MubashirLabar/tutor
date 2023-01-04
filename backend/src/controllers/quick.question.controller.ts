import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IQuickQuestion } from '../interfaces';
import QuickQuestionService from '../services/quick.question.service';

export class QuickQuestionController extends QuickQuestionService {
  protected createQuickQuestionAsync = async (req: Request, res: Response) => {
    const qQuestion: IQuickQuestion = { ...req.body };
    try {
      const quickQuestionCreated = await this.createQuickQuestion(qQuestion);
      successResponse(
        'Quick question created successfully.',
        quickQuestionCreated,
        res
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to create quick question', error, res);
    }
  };
  protected getAllQuickQuestionsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const qQuestion = await this.getAllQuickQuestions(
        filter as object,
        'true'
      );
      if (!qQuestion.length) {
        return failureResponse('Quick question not found.', qQuestion, res);
      }
      successResponse('Quick question fetched successfully.', qQuestion, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch quick questions.', error, res);
    }
  };

  protected getQuickQuestionAsync = async (req: Request, res: Response) => {
    const { params, query } = req;
    try {
      const qQuestion = await this.getQuickQuestion(
        params.id,
        query.populate as string
      );
      if (!qQuestion) {
        return successResponse('Quick question not found.', qQuestion, res);
      }
      successResponse('Quick question fetched successfully.', qQuestion, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch quick question', error, res);
    }
  };

  protected answerQuickQuestionAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const qQuestion: IQuickQuestion = await this.getQuickQuestion(params.id);
      if (!qQuestion) {
        return failureResponse(
          'No quick question found with provided Id',
          null,
          res
        );
      }
      const answeredQuickQuestion = await this.answerQuickQuestion(
        body.answer,
        body.answered_by,
        params.id
      );
      successResponse(
        'Quick question answered successfully.',
        answeredQuickQuestion,
        res
      );
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected assignQuickQuestionAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const qQuestion: IQuickQuestion = await this.getQuickQuestion(params.id);
      if (!qQuestion) {
        return failureResponse(
          'No quick question found with provided Id',
          null,
          res
        );
      }
      const assignedQuickQuestion = await this.assignQuickQuestion(
        body.assigned_to,
        params.id
      );
      successResponse(
        'Quick question assigned successfully.',
        assignedQuickQuestion,
        res
      );
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteQuickQuestionAsync = async (req: Request, res: Response) => {
    try {
      const deletedQuickQuestion = await this.deleteQuickQuestion(
        req.params.id
      );
      successResponse(
        'Quick question was deleted  successfull',
        deletedQuickQuestion,
        res
      );
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new QuickQuestionController();
