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
    const { page = '1', amount = '12', word = '' } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];

    if (!pageNum || !amountNum || !word) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const questions = await getQuestionByWord(
      word as string,
      pageNum,
      amountNum,
    );
    return res.status(200).json(questions);
  }),
);

searchRouter.get(
  '/keyword',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page = '1', amount = '12', keyword = '' } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];

    if (!pageNum || !amountNum || !keyword) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const questions = await getQuestionByKeyword(
      keyword as string,
      pageNum,
      amountNum,
    );
    return res.status(200).json(questions);
  }),
);

export default searchRouter;
