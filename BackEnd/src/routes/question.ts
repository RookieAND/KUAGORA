import express, { Request, Response, NextFunction } from 'express';

import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '@/errors/definedErrors';
import { wrapAsync } from '@/utils/wrapAsync';

const questionRouter = express.Router();

questionRouter.get(
  '/',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {}),
);

export default questionRouter;
