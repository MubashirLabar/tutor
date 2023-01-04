import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IContract, IUser, JobStatus } from '../interfaces';
import ContractService from '../services/contract.service';

export class ContractController extends ContractService {
  protected createContractAsync = async (req: Request, res: Response) => {
    const contract: IContract = { ...req.body };
    console.log(contract);
    try {
      if (contract.agent) {
        const agent = await this.filterUsers(
          contract.agent as unknown as string
        );
        if (!agent) return failureResponse('agent not found', null, res);
      }
      if (contract.tutors) {
        const tutors = await this.filterMultipleUsers(
          contract.tutors as unknown[] as string[]
        );
        if (!tutors.length) {
          return failureResponse('tutor(s) not found', null, res);
        }
      }
      const job = await this.filterJobs(contract.job as unknown as string);
      if (!job) return failureResponse('job not found', null, res);
      if (job.status === JobStatus.CLOSED) {
        return failureResponse('this job is closed', null, res);
      }
      if (job.status === JobStatus.HIRED) {
        return failureResponse(
          'already been hired someone for the job',
          null,
          res
        );
      }
      contract.student = job.student as IUser;
      const contractCreated = await this.createContract(contract);
      // await this.markJobHired(job._id);
      successResponse('Contract created successfully.', contractCreated, res);
    } catch (error: unknown) {
      failureResponse('Failed to create Contract', error, res);
    }
  };
  protected getAllContractsAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const existingContract = await this.getAllContracts(filter as object);
      if (!existingContract.length) {
        return successResponse('Contract not found.', existingContract, res);
      }
      successResponse('Contract fetched successfully.', existingContract, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch contract', error, res);
    }
  };

  protected getContractAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const existingContract = await this.getContract(params.id);
      if (!existingContract) {
        return successResponse('Contract not found.', existingContract, res);
      }
      successResponse('Contract fetched successfully.', existingContract, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch contract', error, res);
    }
  };

  protected updateContractAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const contract: IContract = { ...body, _id: params.id };
      const existingContract: IContract = await this.getContract(params.id);
      if (!existingContract) {
        return failureResponse('No contract found with provided Id', null, res);
      }
      contract.updated_at = new Date();
      const updatedContract = await this.updateContract(contract, params.id);
      successResponse('Contract updated successfully.', updatedContract, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteContractAsync = async (req: Request, res: Response) => {
    try {
      const deletedContract = await this.deleteContract(req.params.id);
      successResponse(
        'Contract was deleted  successfull',
        deletedContract,
        res
      );
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new ContractController();
