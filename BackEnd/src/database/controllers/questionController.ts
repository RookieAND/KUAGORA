import { getRepository } from 'typeorm';
import Question from '@/database/entity/question';
import Comment from '@/database/entity/comment';
import User from '../entity/user';
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
 * 주어진 조건에 맞춰 질문글 목록을 보여주는 함수 getQuestionList
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param option 질문글을 나열시킬 기준 (인기 순, 최신 순)
 * @param state 질문글의 답변 유무에 대한 상태 (미답변 / 답변됨)
 */
export const getQuestionList = async (
  page: number,
  amount: number,
  option: 'recent' | 'popular',
  state: 'progressed' | 'completed',
) => {
  const displayType = {
    recent: 'question.createdAt',
    popular: 'likeAmount',
  };

  let questionDatas = undefined;
  questionDatas = await getRepository(Question)
    .createQueryBuilder('question')
    .select([
      'question.title',
      'question.content',
      'question.state',
      'question.createdAt',
      'user.uuid',
      'user.nickname',
    ])
    .where('question.state = :state', { state })
    .leftJoin('question.user', 'user')
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .orderBy(displayType[option], 'DESC')
    .offset((page - 1) * amount)
    .limit(amount)
    .getMany();

  return questionDatas;
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

  await getRepository(Comment)
    .createQueryBuilder()
    .insert()
    .into('comment')
    .values(comment)
    .updateEntity(false)
    .execute();
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
    .createQueryBuilder()
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