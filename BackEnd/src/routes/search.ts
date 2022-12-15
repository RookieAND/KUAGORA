import express, { Request, Response, NextFunction } from 'express';

import {
  getQuestionByWord,
  getQuestionByKeyword,
} from '@/database/controllers/search';
import { BadRequestError } from '@/errors/definedErrors';
import { wrapAsync } from '@/utils/wrapAsync';

const searchRouter = express.Router();

searchRouter.get(
  '/title',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = '1',
      amount = '12',
      query = '',
      sortOption = 'recent',
    } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];

    if (
      pageNum > 0 &&
      amountNum > 0 &&
      (sortOption === 'recent' || sortOption === 'popular')
    ) {
      const questions = await getQuestionByWord(
        query as string,
        pageNum,
        amountNum,
        sortOption,
      );
      return res.status(200).json(questions);
    }

    throw new BadRequestError(
      '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
    );
  }),
);

searchRouter.get(
  '/keyword',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = '1',
      amount = '12',
      query = '',
      sortOption = 'recent',
    } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];
    if (
      pageNum > 0 &&
      amountNum > 0 &&
      (sortOption === 'recent' || sortOption === 'popular')
    ) {
      const questions = await getQuestionByKeyword(
        query as string,
        pageNum,
        amountNum,
        sortOption,
      );
      return res.status(200).json(questions);
    }

    throw new BadRequestError(
      '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
    );
  }),
);

export default searchRouter;
