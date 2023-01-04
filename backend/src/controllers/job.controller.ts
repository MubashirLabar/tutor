import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IJob, IUser } from '../interfaces';
import JobService from '../services/job.service';

export class JobController extends JobService {
  protected createJobAsync = async (req: Request, res: Response) => {
    const job: IJob = { ...req.body };
    try {
      if (job.coupon) {
        const coupon = await this.filterCoupons(
          job.coupon as unknown as string
        );
        if (!coupon) return failureResponse('coupon not found', null, res);
      }
      if (job.attachments) {
        const attachment = await this.filterAttachments(
          job.attachments as unknown[] as string[]
        );
        if (!attachment.length) {
          return failureResponse('Attachments not uploaded.', null, res);
        }
      }
      if (job.invites) {
        const invites = await this.filterAgents(
          job.invites as unknown[] as string[]
        );
        if (!invites.length) {
          return failureResponse('agent(s) not found', null, res);
        }
      }
      if (job.category) {
        const category = await this.filterCategories(
          job.category as unknown as string
        );
        if (!category) return failureResponse('category not found', null, res);
      }
      if (job.subject) {
        const subject = await this.filterSubjects(
          job.subject as unknown as string
        );
        if (!subject) return failureResponse('subject not found', null, res);
      }
      if (job.service) {
        const service = await this.filterServices(
          job.service as unknown as string
        );
        if (!service) return failureResponse('service not found', null, res);
      }
      if (job.student) {
        const student = await this.filterUsers(
          job.student as unknown as string
        );
        if (!student) return failureResponse('student not found', null, res);
      }
      const jobCreated = await this.createJob(job);
      successResponse('Job created successfully.', jobCreated, res);
    } catch (error: unknown) {
      failureResponse('Failed to create Job', error, res);
    }
  };
  protected getAllJobsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const existingJob = await this.getAllJobs(filter as object);
      if (!existingJob.length) {
        return successResponse('Job not found.', existingJob, res);
      }
      successResponse('Job fetched successfully.', existingJob, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch job', error, res);
    }
  };

  protected getJobAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const existingJob = await this.getJob(params.id);
      if (!existingJob) {
        return successResponse('Job not found.', existingJob, res);
      }
      successResponse('Job fetched successfully.', existingJob, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch job', error, res);
    }
  };

  protected updateJobAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const job: IJob = { ...body, _id: params.id };
      const existingJob: IJob = await this.getJob(params.id);
      if (!existingJob) {
        return failureResponse('No job found with provided Id', null, res);
      }
      if (job.coupon) {
        const coupon = await this.filterCoupons(
          job.coupon as unknown as string
        );
        if (!coupon) return failureResponse('coupon not found', null, res);
      }
      if (job.attachments) {
        const attachment = await this.filterAttachments(
          job.attachments as unknown[] as string[]
        );
        if (!attachment.length) {
          return failureResponse('Attachments not uploaded.', null, res);
        }
      }
      if (job.invites) {
        const invites = await this.filterAgents(
          job.invites as unknown[] as string[]
        );
        if (!invites.length) {
          return failureResponse('agent(s) not found', null, res);
        }
      }
      if (job.category) {
        const category = await this.filterCategories(
          job.category as unknown as string
        );
        if (!category) return failureResponse('category not found', null, res);
      }
      if (job.subject) {
        const subject = await this.filterSubjects(
          job.subject as unknown as string
        );
        if (!subject) return failureResponse('subject not found', null, res);
      }
      if (job.service) {
        const service = await this.filterServices(
          job.service as unknown as string
        );
        if (!service) return failureResponse('service not found', null, res);
      }
      let languages = [];
      job.updated_at = new Date();
      if (body.language) {
        languages = existingJob.languages;
        languages.push(body.language);
        job.languages = languages;
      }
      const updatedJob = await this.updateJob(job, params.id);
      successResponse('Job updated successfully.', updatedJob, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };

  protected inviteAgentsJobAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const job: IJob = await this.getJob(params.id);
      if (!job) {
        return failureResponse('No job found with provided Id', null, res);
      }
      if (job.status) {
        return failureResponse('This job closed.', null, res);
      }
      const invites: IUser[] = job.invites || [];
      if (body.invited_agents) {
        body.invited_agents.forEach((agent: IUser) => {
          invites.push(agent);
        });
      }
      if (body.invited_agent) invites.push(body.invited_agent);
      const agents = await this.filterAgents(invites as unknown[] as string[]);
      if (!agents.length) {
        return failureResponse('agent(s) not found', null, res);
      }
      job.invites = invites;
      job.updated_at = new Date();
      const updatedJob = await this.updateJob(job, params.id);
      successResponse('Agent(s) invited successfully.', updatedJob, res);
    } catch (error: unknown) {
      console.log(error);
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteJobAsync = async (req: Request, res: Response) => {
    try {
      const deletedJob = await this.deleteJob(req.params.id);
      successResponse('Job was deleted  successfull', deletedJob, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new JobController();
