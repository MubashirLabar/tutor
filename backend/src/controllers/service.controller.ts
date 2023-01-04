import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../utils/responses';
import { IService } from '../interfaces';
import ServiceService from '../services/service.service';

export class ServiceController extends ServiceService {
  protected createServiceAsync = async (req: Request, res: Response) => {
    const serv: IService = { ...req.body };
    try {
      const subject = await this.getSubjects(serv.subject as unknown as string);
      if (!subject) {
        return successResponse('Subject not found.', serv, res);
      }
      const serviceCreated = await this.createService(serv);
      successResponse('Service created successfully.', serviceCreated, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      failureResponse('Failed to create Service', error, res);
    }
  };
  protected getAllServicesAsync = async (req: Request, res: Response) => {
    const { filter } = req.query;
    try {
      const serv = await this.getAllServices(filter as object);
      if (!serv.length) {
        return successResponse('Service not found.', serv, res);
      }
      successResponse('Service fetched successfully.', serv, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch service', error, res);
    }
  };

  protected getServiceAsync = async (req: Request, res: Response) => {
    const { params } = req;
    try {
      const serv = await this.getService(params.id);
      if (!serv) {
        return successResponse('Service not found.', serv, res);
      }
      successResponse('Service fetched successfully.', serv, res);
    } catch (error: unknown) {
      failureResponse('Failed to fetch service', error, res);
    }
  };

  protected updateServiceAsync = async (req: Request, res: Response) => {
    try {
      const { params, body } = req;
      const serv: IService = await this.getService(params.id);
      if (!serv) {
        return failureResponse('No service found with provided Id', null, res);
      }
      const service: IService = { ...body, _id: params.id };
      service.updated_at = new Date();
      const updatedService = await this.updateService(service, params.id);
      successResponse('Service updated successfully.', updatedService, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };

  protected deleteServiceAsync = async (req: Request, res: Response) => {
    try {
      const deletedService = await this.deleteService(req.params.id);
      successResponse('Service was deleted  successfull', deletedService, res);
    } catch (error: unknown) {
      failureResponse('Error occured', error, res);
    }
  };
}

export default new ServiceController();
