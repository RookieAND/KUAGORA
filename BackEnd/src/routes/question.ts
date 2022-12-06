import express, { Request, Response, NextFunction } from 'express';

import {
  addComment,
  addQuestion,
  getComments,
  getQuestionList,
  removeComment,
  removeQuestion,
  getQuestionById,
  addLike,
  removeLike,
  removeKeyword,
  addKeyword,
  getKeyword,
} from '@/database/controllers/question';
import { BadRequestError, UnauthorizedError } from '@/errors/definedErrors';
import { checkLoggedIn } from '@/routes/jwt';
import { wrapAsync } from '@/utils/wrapAsync';

const questionRouter = express.Router();

questionRouter.get(
  '/',
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
    const { title, content } = req.body;
    const uuid = req.uuid;

    if (!title || !content) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError('요청의 헤더에 엑세스 토큰이 없습니다.');
    }

    const questionId = await addQuestion(title, content, uuid);
    return res.status(200).json(questionId);
  }),
);

questionRouter.delete(
  `/:qid`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const qid = Number(req.params.qid);
    const uuid = req.uuid;

    if (!qid) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    await removeQuestion(qid, uuid);
    return res.end();
  }),
);

questionRouter.get(
  `/:qid`,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = Number(req.params.qid);

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const question = await getQuestionById(questionId);
    return res.status(200).json(question);
  }),
);

// 댓글 추가, 정보 불러오기, 삭제 관련 라우트
questionRouter.get(
  `/:qid/comment`,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page = '1', amount = '12' } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];
    const questionId = Number(req.params.qid);

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const comments = await getComments(pageNum, amountNum, questionId);
    return res.status(200).json(comments);
  }),
);

questionRouter.post(
  `/:qid/comment`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    const questionId = Number(req.params.qid);
    const uuid = req.uuid;

    if (!questionId || !content) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    const newCommentId = await addComment(questionId, uuid, content);
    return res.status(200).json(newCommentId);
  }),
);

questionRouter.delete(
  `/:qid/:commId/comment`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const [questionId, commentId] = [
      Number(req.params.qid),
      Number(req.params.commId),
    ];
    const uuid = req.uuid;

    if (!questionId || !commentId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    await removeComment(questionId, commentId, uuid);
    return res.end();
  }),
);

// 좋아요 추가, 삭제 관련
questionRouter.delete(
  `/:qid/like`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = Number(req.params.qid);
    const uuid = req.uuid;

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    await removeLike(questionId, uuid);
  }),
);

questionRouter.post(
  `/:qid/like`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = Number(req.params.qid);
    const uuid = req.uuid;

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    const newLikeId = await addLike(questionId, uuid);
    return res.status(200).json({ newLikeId });
  }),
);

// 키워드 조회, 추가, 삭제 관련
questionRouter.delete(
  `/:qid/:keyid/keyword`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { qid, keyid } = req.params;
    const [questionId, keywordId] = [Number(qid), Number(keyid)];
    const uuid = req.uuid;

    if (!questionId || !keywordId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    await removeKeyword(questionId, keywordId);
  }),
);

questionRouter.get(
  `/:qid/keyword`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = Number(req.params.qid);
    const uuid = req.uuid;

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    const keywords = await getKeyword(questionId);
    return res.status(200).json({ keywords });
  }),
);

questionRouter.post(
  `/:qid/keyword`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = Number(req.params.qid);
    const uuid = req.uuid;
    const { content } = req.body;

    if (!questionId || !content) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError(
        '요청에 담긴 엑세스 토큰이 없거나 유효하지 않습니다.',
      );
    }

    const newKeywordId = await addKeyword(questionId, content);
    return res.status(200).json({ newKeywordId });
  }),
);

export default questionRouter;
