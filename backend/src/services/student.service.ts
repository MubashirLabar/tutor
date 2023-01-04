import { IStudent, UserType } from '../interfaces';
import { StudentModel, UserModel } from '../models';

export default class StudentService {
  protected getUser(_id: string) {
    return UserModel.findOne({ _id, user_type: UserType.student });
  }
  protected createStudent(student: IStudent) {
    const newStudent = new StudentModel(student);
    return newStudent.save();
  }

  protected getStudent = async (_id: string) => {
    return StudentModel.findOne({ _id }).populate('user');
  };

  protected getAllStudents = async (filter: unknown) => {
    return StudentModel.find(filter).populate('user');
  };

  protected updateStudent = async (student: IStudent, _id: string) => {
    return StudentModel.findByIdAndUpdate(
      _id,
      { $set: student },
      { new: true }
    );
  };

  protected deleteUser = async (_id: string) => {
    return UserModel.deleteOne({ _id });
  };

  protected deleteStudent = async (_id: string) => {
    return StudentModel.deleteOne({ _id });
  };
}
