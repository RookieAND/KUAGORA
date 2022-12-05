import express, { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@/errors/definedErrors';
import { addQuestion, getQuestionList } from '@/database/controllers/question';
import { wrapAsync } from '@/utils/wrapAsync';
import { getQuestionById } from '../database/controllers/question';
import { checkLoggedIn } from './jwt';

const questionRouter = express.Router();

questionRouter.get(
  '/list',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page = '1', amount = '12', option = 'recent' } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];
    if (
      pageNum * amountNum > 0 &&
      (option == 'recent' || option == 'popular')
    ) {
      const questions = await getQuestionList(pageNum, amountNum, option);
      return res.status(200).json(questions);
    }

    throw new BadRequestError(
      '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
    );
  }),
);

questionRouter.post(
  `/write`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title as string;
    const content = req.body.content as string;
    const uuid = req.uuid!;

    if (!title || !content) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const questionId = await addQuestion(title, content, uuid);
    return res.status(200).json(questionId);
  }),
);

questionRouter.get(
  `/post/:questionId`,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const questionIdNum = Number(questionId);
    const question = await getQuestionById(questionIdNum);
    return res.status(200).json(question);
  }),
);

export default questionRouter;
