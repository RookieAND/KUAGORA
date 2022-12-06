import { getRepository } from 'typeorm';

import Question from '@/database/entity/question';
import Comment from '@/database/entity/comment';
import User from '@/database/entity/user';
import { BadRequestError } from '@/errors/definedErrors';

/**
 * 질문글의 id를 통해 정보를 로드하는 함수 getQuestionById
 * @param questionId 찾으려는 질문글의 ID
 * @returns ID에 해당되는 질문글 정보
 */
export const getQuestionById = async (questionId: number) => {
  let questionData = undefined;
  questionData = await getRepository(Question)
    .createQueryBuilder('question')
    .where('question.id = :questionId', { questionId })
    .getOne();
  return questionData;
};

/**
 * 특정 유저가 작성한 질문글 목록을 로드하는 함수
 * @param uuid 질문글을 작성한 유저의 uuid
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param option 질문글을 나열시킬 기준 (인기 순, 최신 순)
 */
export const getQuestionListByUser = async (
  uuid: string,
  page: number,
  amount: number,
  option: 'popular' | 'recent',
) => {
  const sortType = {
    recent: 'question.createdAt',
    popular: 'likeCount',
  };

  const questionsByUser = getRepository(Question)
    .createQueryBuilder('question')
    .select([
      'question.id',
      'question.title',
      'question.content',
      'question.state',
      'question.createdAt',
    ])
    .innerJoin(
      (qb) =>
        qb
          .select([
            'subQuestion.id',
            'COUNT(likes.id) AS likeCount',
            'COUNT(comments.id) AS commentCount',
          ])
          .from(Question, 'subQuestion')
          .where('user.uuid = :uuid', { uuid })
          .leftJoin('subQuestion.likes', 'likes')
          .leftJoin('subQuestion.comments', 'comments')
          .leftJoin('subQuestion.user', 'user')
          .groupBy('subQuestion.id')
          .offset((page - 1) * amount)
          .limit(amount)
          .orderBy(sortType[option], 'DESC'),
      'topQuestion',
      'topQuestion.subQuestion_id == question.id',
    )
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .loadRelationCountAndMap('question.commentCount', 'question.comments')
    .orderBy(sortType[option], 'DESC')
    .offset((page - 1) * amount)
    .limit(amount)
    .getMany();

  return questionsByUser;
};

/**
 * 주어진 조건에 맞춰 질문글 목록을 보여주는 함수 getQuestionList
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param option 질문글을 나열시킬 기준 (인기 순, 최신 순)
 */
export const getQuestionList = async (
  page: number,
  amount: number,
  option: 'recent' | 'popular',
) => {
  const sortType = {
    recent: 'question.createdAt',
    popular: 'likeAmount',
  };

  let questionDatas = undefined;
  questionDatas = await getRepository(Question)
    .createQueryBuilder('question')
    .select([
      'question.id',
      'question.title',
      'question.content',
      'question.state',
      'question.createdAt',
    ])
    .innerJoin(
      (qb) =>
        qb
          .select([
            'subQuestion.id',
            'COUNT(likes.id) AS likeCount',
            'COUNT(comments.id) AS CommentCount',
          ])
          .from(Question, 'subQuestion')
          .leftJoin('subQuestion.comments', 'comments')
          .leftJoin('subQuestion.likes', 'likes')
          .groupBy('subQuestion.id')
          .offset((page - 1) * amount)
          .limit(amount),
      'topQuestion',
      // 서브 쿼리 alias 내의 column 사용 시, 언더바로 연결지어야 함.
      'topQuestion.subQuestion_id = question.id',
    )
    .leftJoin('question.user', 'user')
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .loadRelationCountAndMap('question.commentCount', 'question.comments')
    .orderBy(sortType[option], 'DESC')
    .offset((page - 1) * amount)
    .limit(amount)
    .getMany();

  return questionDatas;
};

/**
 * 새로운 질문글을 등록하는 함수
 * @param title 질문글 제목
 * @param uuid 작성자 uuid
 * @param content 질문글 내용
 * @returns
 */
export const addQuestion = async (
  title: string,
  content: string,
  uuid: string,
) => {
  const newUser = new User();
  newUser.uuid = uuid;

  console.log(newUser);

  const newQuestion = new Question();
  newQuestion.title = title;
  newQuestion.content = content;
  newQuestion.user = newUser;

  const addQuestionResult = await getRepository(Question)
    .createQueryBuilder()
    .insert()
    .into('question')
    .values(newQuestion)
    .updateEntity(false)
    .execute();

  // InsertResult.raw 를 통해 SQL Query 결과를 가져올 수 있음.
  const newQuestionId = addQuestionResult.raw.insertId;
  return newQuestionId;
};

export const removeQuestion = async (questionId: number) => {
  const removeQuestiontResult = await getRepository(Question)
    .createQueryBuilder('question')
    .softDelete()
    .andWhere('question.id =: questionId', { questionId })
    .execute();

  if (removeQuestiontResult.raw.affected == -1) {
    throw new BadRequestError(
      '존재하지 않는 댓글을 지우려 하셨거나, 자신이 작성하지 않은 댓글을 지우려 하셨습니다.',
    );
  }
};

/**
 * 특정 질문글에 달린 댓글 목록을 불러오는 함수
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param questionId 댓글을 찾을 질문글의 Id
 */
export const getComments = async (
  page: number,
  amount: number,
  questionId: number,
) => {
  let commentDatas = undefined;
  commentDatas = await getRepository(Comment)
    .createQueryBuilder('comment')
    .select([
      'comment.content',
      'comment.user',
      'comment.question',
      'comment.createdAt',
      'question.id',
    ])
    .where('question.id = :questionId', { questionId })
    .leftJoin('comment.question', 'question')
    .orderBy('comment.createdAt', 'DESC')
    .offset((page - 1) * amount)
    .limit(amount)
    .getMany();

  if (!commentDatas) {
    throw new BadRequestError(
      '존재하지 않는 글에 댓글을 작성하려 했거나, 작성자의 정보가 유효하지 않습니다.',
    );
  }

  return commentDatas;
};

/**
 *
 * @param questionId 댓글을 추가하려는 질문글의 ID
 * @param uuid 댓글을 추가하려는 유저의 UUID
 * @param content 추가하려는 댓글의 내용
 */
export const addComment = async (
  questionId: number,
  uuid: string,
  content: string,
) => {
  const user = new User();
  user.uuid = uuid;

  const question = new Question();
  question.id = questionId;

  const comment = new Comment();
  comment.content = content;
  comment.user = user;
  comment.question = question;

  const addCommentResult = await getRepository(Comment)
    .createQueryBuilder('comment')
    .insert()
    .into('comment')
    .values(comment)
    .updateEntity(false)
    .execute();

  if (addCommentResult.raw.affected == -1) {
    throw new BadRequestError(
      '존재하지 않는 게시글에 댓글을 추가하려 하였습니다.',
    );
  }
};

/**
 * 특정 질문글에 달린 댓글을 제거하는 함수
 * @param questionId 댓글이 달린 질문글의 ID
 * @param uuid 댓글을 작성한 유저의 uuid
 * @param commentId 삭제하려는 댓글의 ID
 */
export const removeComment = async (
  questionId: number,
  uuid: string,
  commentId: number,
) => {
  const removeCommentResult = await getRepository(Comment)
    .createQueryBuilder('comment')
    .softDelete()
    .where('comment.id =: commentId', { commentId })
    .andWhere('comment.question_id =: questionId', { questionId })
    .andWhere('comment.user_uuid =: uuid', { uuid })
    .execute();

  if (removeCommentResult.affected != -1) {
    throw new BadRequestError(
      '존재하지 않는 댓글을 지우려 하셨거나, 자신이 작성하지 않은 댓글을 지우려 하셨습니다.',
    );
  }
};
