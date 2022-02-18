import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/custom-error';

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
      let additionalInfo = (err as Error).message ?? '';
    customError = new CustomError(
      'Internal server error',
      500,
      additionalInfo
    );
  }

  res.status((customError as CustomError).status).send(customError);
};

export default handleError;