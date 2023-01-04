import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IStudent } from '../interfaces';
import StudentService from '../services/student.service';

export class StudentController extends StudentService {
  protected createStudentAsync = async (req: Request, res: Response) => {
    const { user } = req.body;
    const userObj = await this.getUser(user);
    if (!userObj) {
      return failureResponse(`User doesn't exists.`, null, res);
    }
    const stud: IStudent = { ...req.body };
    try {
      const studentCreated = await this.createStudent(stud);
      userObj.studentProfile = studentCreated._id;
      await userObj.save();
      successResponse(
        'Student profile created successfully.',
        studentCreated,
        res
      );
    } catch (error: unknown) {
      failureResponse('Failed to create Student Profile', error, res);
    }
  };
  protected getAllStudentsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const stud = await this.getAllStudents(filter);
      successResponse('Student profiles fetched successfully.', stud, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch stud profiles', error, res);
    }
  };

  protected getStudentAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const stud = await this.getStudent(params.id);
      successResponse('Student fetched successfully.', stud, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch stud', error, res);
    }
  };

  protected updateStudentAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const stud = await this.getStudent(params.id);
      if (!stud) {
        return failureResponse('No student found with provided Id.', null, res);
      }
      const student: IStudent = { ...body, _id: params.id };
      student.amount = stud.amount + student.amount || 0;
      student.total_spent = stud.total_spent + student.total_spent || 0;
      student.total_hires = stud.total_hires + student.total_hires || 0;
      student.total_jobs_posted =
        stud.total_jobs_posted + student.total_jobs_posted || 0;
      student.updated_at = new Date();

      const updatedStudent = await this.updateStudent(student, params.id);
      successResponse(
        'Student Profile updated successfully.',
        updatedStudent,
        res
      );
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteStudentAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student = await this.getStudent(id);
      await this.deleteUser(student.user as unknown as string);
      await this.deleteStudent(id);
      successResponse('Student Profile was deleted  successfull', student, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new StudentController();
