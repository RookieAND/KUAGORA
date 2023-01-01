import express, { Request, Response, NextFunction } from 'express';
import {
  getQuestionList,
  getQuestionById,
  removeQuestion,
  addComment,
  getComments,
  removeComment,
  addLike,
  removeLike,
  addKeyword,
  getKeyword,
  removeKeyword,
  patchQuestionState,
  postCreateQuestion,
} from '@/database/controllers/question';
import { BadRequestError, UnauthorizedError } from '@/errors/definedErrors';
import { checkLoggedIn } from '@/routes/jwt';
import { wrapAsync } from '@/utils/wrapAsync';

const questionRouter = express.Router();

questionRouter.get(
  '/',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = '1',
      amount = '12',
      sortOption = 'recent',
      answeredOption = 'both',
    } = req.query;
    const [pageNum, amountNum] = [Number(page), Number(amount)];
    if (
      pageNum * amountNum > 0 &&
      (sortOption == 'recent' || sortOption == 'popular') &&
      (answeredOption == 'progressed' ||
        answeredOption == 'completed' ||
        answeredOption == 'both')
    ) {
      const questions = await getQuestionList(
        pageNum,
        amountNum,
        sortOption,
        answeredOption,
      );
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
    const { title, content, keywords } = req.body;
    const uuid = req.uuid;

    if (!title || !content || !keywords) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    if (!uuid) {
      throw new UnauthorizedError('요청의 헤더에 엑세스 토큰이 없습니다.');
    }

    const questionId = await postCreateQuestion(title, content, keywords, uuid);
    return res.status(200).json({ questionId });
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
    const uuid = req.uuid;

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
      );
    }

    const question = await getQuestionById(questionId, uuid);
    return res.status(200).json(question);
  }),
);

// 댓글 추가, 열람, 삭제, 채택 관련 라우트
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

questionRouter.patch(
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

    await patchQuestionState(questionId, commentId, uuid);
    res.end();
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
    res.end();
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
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = Number(req.params.qid);

    if (!questionId) {
      throw new BadRequestError(
        '잘못된 쿼리 요청입니다. 양식에 맞춰 재전송 해주세요.',
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
