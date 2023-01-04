import { Response } from 'express';
import { ResponseCodes } from '../interfaces';

export function GenerateResponse(
  message: string,
  data: unknown,
  res: Response
) {
  res.status(ResponseCodes.success).json({
    status: 'SUCCESS',
    message: message,
    data
  });
}

export function successResponse(message: string, data: unknown, res: Response) {
  res
    .status(ResponseCodes.success)
    .json({
      status: 'SUCCESS',
      message: message,
      data
    })
    .end();
}

export function failureResponse(
  message: string,
  error: unknown,
  res: Response
) {
  console.log(error);
  res.status(ResponseCodes.success).json({
    status: 'FAILURE',
    message: message,
    error
  });
}

export function insufficientParameters(res: Response) {
  res.status(ResponseCodes.badRequest).json({
    status: 'FAILURE',
    message: 'Insufficient parameters',
    data: {}
  });
}

export function mongoError(err: unknown, res: Response) {
  res.status(ResponseCodes.internalServerError).json({
    status: 'FAILURE',
    message: 'MongoDB error',
    data: err
  });
}
