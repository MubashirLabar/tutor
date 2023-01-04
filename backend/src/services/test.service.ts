import { ITest } from '../interfaces';
import { TestModel } from '../models';

export default class TestService {
  protected createTest(test: ITest) {
    const newTest = new TestModel(test);
    return newTest.save();
  }

  protected getTest = async (_id: string) => {
    const filter = { _id, deleted_at: null };
    return TestModel.findOne(filter);
  };

  protected getAllTests = async (filter: object) => {
    const filters = { ...filter, deleted_at: null };
    return TestModel.find(filters);
  };

  protected updateTest = async (test: ITest, _id: string) => {
    return TestModel.findByIdAndUpdate(_id, { $set: test }, { new: true });
  };

  protected deleteTest = async (_id: string) => {
    return TestModel.findByIdAndUpdate(
      _id,
      { $set: { deleted_at: Date.now() } },
      { new: true }
    );
  };
}
