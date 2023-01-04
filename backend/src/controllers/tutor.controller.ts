import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IService, ITutor } from '../interfaces';
import TutorService from '../services/tutor.service';

export class TutorController extends TutorService {
  protected createTutorAsync = async (req: Request, res: Response) => {
    const { user } = req.body;
    const userObj = await this.getUser(user);
    if (!userObj) {
      return failureResponse(`User doesn't exists.`, null, res);
    }
    const tut: ITutor = { ...req.body };
    try {
      const tutorCreated = await this.createTutor(tut);
      userObj.tutorProfile = tutorCreated._id;
      await userObj.save();
      successResponse('Tutor profile created successfully.', tutorCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 11000) {
        return failureResponse('Tutor profile already exists.', error, res);
      }
      failureResponse('Failed to create Tutor Profile', error, res);
    }
  };
  protected getAllTutorsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const tut = await this.getAllTutors(filter as object, 'true');
      if (!tut.length) {
        return successResponse('Tutor profiles not found.', tut, res);
      }
      successResponse('Tutor profiles fetched successfully.', tut, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch tutor profiles', error, res);
    }
  };

  protected getTutorAsync = async (req: Request, res: Response) => {
    const { params, query } = req;
    try {
      const tut = await this.getTutor(params.id, query.populate as string);
      if (!tut) {
        return successResponse('Tutor profile not found.', tut, res);
      }
      successResponse('Tutor fetched successfully.', tut, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch tutor', error, res);
    }
  };

  protected updateTutorAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const tut: ITutor = await this.getTutor(params.id);
      if (!tut) {
        return failureResponse('No tutor found with provided Id', null, res);
      }
      const tutor: ITutor = { ...body, _id: params.id };
      let services: IService[] = tut.services;
      services.push(body.service);
      if (body.services) services = body.services;
      tutor.services = services;
      tutor.amount = tut.total_earned + body.amount || 0;
      tutor.total_earned = tut.total_earned + body.total_earned || 0;
      tutor.total_jobs_completed =
        tut.total_jobs_completed + body.total_jobs_completed || 0;
      tutor.total_jobs_in_progress =
        tut.total_jobs_in_progress + body.total_jobs_in_progress || 0;
      tutor.updated_at = new Date();

      const updatedTutor = await this.updateTutor(tutor, params.id);
      successResponse('Tutor Profile updated successfully.', updatedTutor, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteTutorAsync = async (req: Request, res: Response) => {
    try {
      const tutor = await this.getTutor(req.params.id);
      await this.deleteUser(req.params.id);
      await this.deleteTutor(req.params.id);
      successResponse('Tutor Profile was deleted  successfull', tutor, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new TutorController();
