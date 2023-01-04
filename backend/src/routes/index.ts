import { Router } from 'express';
import UserRoutes from './user.routes';
import StudentRoutes from './student.routes';
import CommonRoutes from './common.routes';
import TutorRoutes from './tutor.routes';
import AgentRoutes from './agent.routes';
import ServiceRoutes from './service.routes';
import QuickQuestionRoutes from './quick.question.routes';
import JobRoutes from './job.routes';
import ContractRoutes from './contract.routes';
import CouponRoutes from './coupon.routes';
import CategoryRoutes from './category.routes';
import SubjectRoutes from './subject.routes';
import SchoolRoutes from './school.routes';
import TestRoutes from './test.routes';
import TwilioRoutes from './twilio.routes';

class Routes {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.applicationRoutes();
  }
  private applicationRoutes = () => {
    this.router.use('/users', UserRoutes.router);
    this.router.use('/students', StudentRoutes.router);
    this.router.use('/tutors', TutorRoutes.router);
    this.router.use('/agents', AgentRoutes.router);
    this.router.use('/services', ServiceRoutes.router);
    this.router.use('/quick-questions', QuickQuestionRoutes.router);
    this.router.use('/jobs', JobRoutes.router);
    this.router.use('/contracts', ContractRoutes.router);
    this.router.use('/coupons', CouponRoutes.router);
    this.router.use('/categories', CategoryRoutes.router);
    this.router.use('/subjects', SubjectRoutes.router);
    this.router.use('/schools', SchoolRoutes.router);
    this.router.use('/twilio', TwilioRoutes.router);
    this.router.use('/tests', TestRoutes.router);
    this.router.use('/', CommonRoutes.router);
  };
}

export default new Routes();
