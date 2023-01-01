import { getRepository } from 'typeorm';

import Comment from '@/database/entity/comment';
import Keyword from '@/database/entity/keyword';
import Like from '@/database/entity/like';
import Question from '@/database/entity/question';
import User from '@/database/entity/user';

import {
  SORT_TYPE,
  ANSWERED_TYPE,
  SortOptionType,
  AnsweredOptionType,
} from '@/constants/question';
import { BadRequestError, InternalServerError } from '@/errors/definedErrors';

/**
 * 주어진 조건에 맞춰 질문글 목록을 보여주는 함수 getQuestionList
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param sortOption 질문글을 나열시킬 기준 (인기 순, 최신 순)
 * @param answeredOption 질문글의 채택 여부 (미채택, 채택, 둘 다)
 */
export const getQuestionList = async (
  page: number,
  amount: number,
  sortOption: SortOptionType,
  answeredOption: AnsweredOptionType,
) => {
  let questionDatas = undefined;
  questionDatas = await getRepository(Question)
    .createQueryBuilder('question')
    .select([
      'question.id',
      'question.title',
      'question.content',
      'question.state',
      'question.createdAt',
      'user.uuid',
      'user.nickname',
      'keyword.id',
      'keyword.content',
    ])
    .innerJoin(
      (qb) =>
        qb
          .select([
            'subQuestion.id',
            'COUNT(likes.id) AS likeCount',
            'COUNT(comments.id) AS CommentCount',
          ])
          .where('subQuestion.state IN(:...answeredStates)', {
            answeredStates: ANSWERED_TYPE[answeredOption],
          })
          .from(Question, 'subQuestion')
          .leftJoin('subQuestion.comments', 'comments')
          .leftJoin('subQuestion.likes', 'likes')
          .groupBy('subQuestion.id')
          .offset((page - 1) * amount)
          .limit(amount)
          .orderBy(SORT_TYPE[sortOption].subQuery, 'DESC'),
      'topQuestion',
      // 서브 쿼리 alias 내의 column 사용 시, 언더바로 연결지어야 함.
      'topQuestion.subQuestion_id = question.id',
    )
    .leftJoin('question.user', 'user')
    .leftJoin('question.keywords', 'keyword')
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .loadRelationCountAndMap('question.commentCount', 'question.comments')
    .orderBy(SORT_TYPE[sortOption].query, 'DESC')
    .getMany();

  console.log(questionDatas);
  return questionDatas;
};

/**
 * 질문글의 id를 통해 정보를 로드하는 함수 getQuestionById
 * @param questionId 찾으려는 질문글의 ID
 * @param uuid 유저의 uuid
 * @returns ID에 해당되는 질문글 정보
 */
export const getQuestionById = async (
  questionId: number,
  uuid: string | undefined,
) => {
  let questionData = undefined;
  questionData = await getRepository(Question)
    .createQueryBuilder('question')
    .select([
      'question',
      'user.uuid',
      'user.nickname',
      'keyword.id',
      'keyword.content',
    ])
    .where('question.id = :questionId', { questionId })
    .leftJoin('question.user', 'user')
    .leftJoinAndSelect('question.keywords', 'keyword')
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .getOne();

  // 게시글이 존재하는지를 먼저 확인. 타입 가드도 겸임.
  if (!questionData) {
    throw new BadRequestError('존재하지 않는 질문글입니다.');
  }

  // (!!) 연산자를 통해 true / false 논리 값을 확실히 가져옴.
  const isLike = !!(await getRepository(Like)
    .createQueryBuilder('like')
    .where('like.user_uuid = :uuid', { uuid })
    .where('like.question_id =:questionId', { questionId })
    .getOne());

  return { isLike, ...questionData };
};

/**
 * 특정 유저가 작성한 질문글 목록을 로드하는 함수
 * @param uuid 질문글을 작성한 유저의 uuid
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param sortOption 질문글을 나열시킬 기준 (인기 순, 최신 순)
 */
export const getQuestionListByUser = async (
  uuid: string,
  page: number,
  amount: number,
  sortOption: 'popular' | 'recent',
) => {
  const sortType = {
    recent: {
      subQuery: 'subQuestion.createdAt',
      query: 'question.createdAt',
    },
    popular: {
      subQuery: 'likeCount',
      query: 'question.likeCount',
    },
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
          .orderBy(sortType[sortOption].subQuery, 'DESC'),
      'topQuestion',
      'topQuestion.subQuestion_id == question.id',
    )
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .loadRelationCountAndMap('question.commentCount', 'question.comments')
    .orderBy(sortType[sortOption].query, 'DESC')
    .offset((page - 1) * amount)
    .limit(amount)
    .getMany();

  // 올바르게 게시물 목록을 가져왔는지 체크
  if (!questionsByUser) {
    throw new BadRequestError('유저의 UUID가 유효하지 않습니다.');
  }

  return questionsByUser;
};

/**
 * 새로운 질문글을 등록하는 함수
 * @param title 질문글 제목
 * @param uuid 작성자 uuid
 * @param content 질문글 내용
 * @param keywords 키워드 목록
 * @returns
 */
export const postCreateQuestion = async (
  title: string,
  content: string,
  keywords: string[],
  uuid: string,
) => {
  const newUser = new User();
  newUser.uuid = uuid;

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
  const addQuestionId = addQuestionResult.raw.insertId;

  // 키워드가 있다면, 이 또한 DB에 적용해야 함.
  if (keywords.length > 0) {
    keywords.forEach(async (newContent) => {
      const newKeyword = new Keyword();
      newKeyword.content = newContent;
      newKeyword.question = newQuestion;

      const addKeyword = await getRepository(Keyword)
        .createQueryBuilder()
        .insert()
        .into('keyword')
        .values(newKeyword)
        .updateEntity(false)
        .execute();

      let addKeywordId = addKeyword.raw.insertId;
      if (!addQuestionId || !addKeywordId) {
        throw new InternalServerError(
          '정상적으로 데이터가 DB에 추가되지 않았습니다.',
        );
      }
    });
  }

  return addQuestionId;
};

export const removeQuestion = async (questionId: number, uuid: string) => {
  const removeQuestiontResult = await getRepository(Question)
    .createQueryBuilder('question')
    .softDelete()
    .where('question.user_uuid =: uuid', { uuid })
    .andWhere('question.id =: questionId', { questionId })
    .execute();

  if (removeQuestiontResult.affected === -1) {
    throw new BadRequestError(
      '존재하지 않는 질문글을 지우려 했거나, 자신이 지우지 않은 글을 지우려 했습니다.',
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
      'comment.id',
      'comment.content',
      'comment.createdAt',
      'comment.isAnswered',
      'user.uuid',
      'user.nickname',
    ])
    .where('comment.question_id = :questionId', { questionId })
    .leftJoin('comment.user', 'user')
    .orderBy('comment.createdAt')
    .offset((page - 1) * amount)
    .limit(amount)
    .getMany();

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
    .createQueryBuilder()
    .insert()
    .into('comment')
    .values(comment)
    .updateEntity(false)
    .execute();

  const newCommentId = addCommentResult.raw.insertId;
  return newCommentId;
};

/**
 * 특정 질문글에 달린 댓글을 제거하는 함수
 * @param questionId 댓글이 달린 질문글의 ID
 * @param uuid 댓글을 작성한 유저의 uuid
 * @param commentId 삭제하려는 댓글의 ID
 */
export const removeComment = async (
  questionId: number,
  commentId: number,
  uuid: string,
) => {
  const removeCommentResult = await getRepository(Comment)
    .createQueryBuilder()
    .softDelete()
    .where('comment.id = :commentId', { commentId })
    .andWhere('comment.question_id = :questionId', { questionId })
    .andWhere('comment.user_uuid = :uuid', { uuid })
    .execute();

  if (removeCommentResult.affected === -1) {
    throw new BadRequestError(
      '존재하지 않는 댓글을 지우려 하셨거나, 자신이 작성하지 않은 댓글을 지우려 하셨습니다.',
    );
  }
};

/**
 * 질문글의 상태를 완료됨으로 변경하고, 채택된 댓글의 상태도 변경하는 함수
 * @param questionId 해결이 완료된 질문글의 ID
 * @param commentId 질문자에게 채택된 댓글의 ID
 * @param uuid 질문글을 작성한 작성자의 UUID
 */
export const patchQuestionState = async (
  questionId: number,
  commentId: number,
  uuid: string,
) => {
  const editQuestionStateResult = await getRepository(Question)
    .createQueryBuilder('question')
    .update()
    .set({ state: 'completed' })
    .where('question.id = :questionId', { questionId })
    .andWhere('question.user_uuid = :uuid', { uuid })
    .execute();

  if (editQuestionStateResult.affected !== 1) {
    throw new BadRequestError('존재하지 않는 질문글에 대한 요청입니다.');
  }

  const editCommentStateResult = await getRepository(Comment)
    .createQueryBuilder('comment')
    .update()
    .set({ isAnswered: true })
    .where('comment.id = :commentId', { commentId })
    .execute();

  if (editCommentStateResult.affected === 1) {
    throw new BadRequestError('존재하지 않는 댓글에 대한 요청입니다.');
  }
};

/**
 * 특정 질문글에 소속된 키워드 목록을 불러오는 함수
 * @param questionId 키워드 목록을 가져올 질문글의 Id
 * @returns
 */
export const getKeyword = async (questionId: number) => {
  let keywordDatas = undefined;
  keywordDatas = await getRepository(Keyword)
    .createQueryBuilder('keyword')
    .select(['keyword.id', 'keyword.content', 'keyword.createdAt'])
    .where('keyword.question_id = :questionId', { questionId })
    .orderBy('keyword.createdAt', 'DESC')
    .getMany();

  return keywordDatas;
};

/**
 * 특정 질문글에 키워드를 추가해주는 함수.
 * @param questionId 키워드를 추가하려는 질문글의 id
 * @param content 새롭게 추가하려는 키워드의 내용
 * @returns 새롭게 추가된 키워드의 id
 */
export const addKeyword = async (questionId: number, content: string) => {
  const question = new Question();
  question.id = questionId;

  const newKeyword = new Keyword();
  newKeyword.content = content;
  newKeyword.question = question;

  const addKeywordResult = await getRepository(Keyword)
    .createQueryBuilder()
    .insert()
    .into('keyword')
    .values(newKeyword)
    .updateEntity(false)
    .execute();

  if (addKeywordResult.raw.affected === -1) {
    throw new BadRequestError(
      '존재하지 않는 게시글에 키워드를 추가하려 하였습니다.',
    );
  }

  const newKeywordId = addKeywordResult.raw.insertId;
  return newKeywordId;
};

/**
 * 특정 질문글에 달린 키워드를 삭제하는 함수.
 * @param questionId 댓글이 달린 질문글의 ID
 * @param keywordId 삭제하려는 키워드의 ID
 * @param uuid 질문글을 작성한 유저의 uuid
 */
export const removeKeyword = async (questionId: number, keywordId: number) => {
  const removeKeywordResult = await getRepository(Keyword)
    .createQueryBuilder('keyword')
    .softDelete()
    .andWhere('keyword.question_id = :questionId', { questionId })
    .andWhere('keyword.id = :keywordId', { keywordId })
    .execute();

  if (removeKeywordResult.affected === -1) {
    throw new BadRequestError(
      '존재하지 않는 게시글의 키워드를 삭제하려 했습니다.',
    );
  }
};

/**
 * 특정 질문글에 좋아요를 추가해주는 함수.
 * @param questionId 좋아요를 추가하려는 질문글의 id
 * @param uuid 좋아요를 추가하려는 유저의 uuid
 * @returns 새롭게 추가된 좋아요의 id
 */
export const addLike = async (questionId: number, uuid: string) => {
  const user = new User();
  user.uuid = uuid;

  const question = new Question();
  question.id = questionId;

  const newLike = new Like();
  newLike.user = user;
  newLike.question = question;

  const addLikeResult = await getRepository(Like)
    .createQueryBuilder()
    .insert()
    .into('like')
    .values(newLike)
    .updateEntity(false)
    .execute();

  if (addLikeResult.raw.affected === -1) {
    throw new BadRequestError(
      '존재하지 않는 게시글에 좋아요를 추가하려 하였습니다.',
    );
  }

  const newLikeId = addLikeResult.raw.insertId;
  return newLikeId;
};

/**
 * 특정 질문글에 달린 좋아요를 취소하는 함수
 * @param questionId 댓글이 달린 질문글의 ID
 * @param uuid 댓글을 작성한 유저의 uuid
 */
export const removeLike = async (questionId: number, uuid: string) => {
  const removeLikeResult = await getRepository(Like)
    .createQueryBuilder('like')
    .delete()
    .where('like.question_id = :questionId', { questionId })
    .andWhere('like.user_uuid = :uuid', { uuid })
    .execute();

  if (removeLikeResult.affected === -1) {
    throw new BadRequestError(
      '존재하지 않는 게시글의 좋아요를 수정하려 했거나, UUID가 유효하지 않습니다.',
    );
  }
};
