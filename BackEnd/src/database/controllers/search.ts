import { getRepository } from 'typeorm';

import {
  SORT_TYPE,
  ANSWERED_TYPE,
  SortOptionType,
  AnsweredOptionType,
} from '@/constants/question';
import Question from '@/database/entity/question';

/**
 * 특정 검색어와 제목이 매칭하는 질문글 목록을 가져오는 함수
 * @param word 검색을 진행할 문자열
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @returns 검색을 통해 나온 질문글 정보 목록
 */
export const getQuestionByWord = async (
  word: string,
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
          .from(Question, 'subQuestion')
          .where('subQuestion.title like :word', { word: `%${word}%` }) // like 절 사용법은 좌측과 같음.
          .andWhere('subQuestion.state IN(:...answeredStates)', {
            answeredStates: ANSWERED_TYPE[answeredOption],
          })
          .leftJoin('subQuestion.comments', 'comments')
          .leftJoin('subQuestion.likes', 'likes')
          .groupBy('subQuestion.id')
          .orderBy(SORT_TYPE[sortOption].subQuery, 'DESC')
          .offset((page - 1) * amount)
          .limit(amount),
      'topQuestion',
      'topQuestion.subQuestion_id = question.id',
    )
    .leftJoin('question.user', 'user')
    .leftJoin('question.keywords', 'keyword')
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .loadRelationCountAndMap('question.commentCount', 'question.comments')
    .orderBy(SORT_TYPE[sortOption].query, 'DESC')
    .getMany();

  return questionDatas;
};

export const getQuestionByKeyword = async (
  keyword: string,
  page: number,
  amount: number,
  sortOption: SortOptionType,
  answeredOption: AnsweredOptionType,
) => {
  const searchQuestionResult = await getRepository(Question)
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
          .from(Question, 'subQuestion')
          .where('keywords.content = :keyword', { keyword })
          .andWhere('subQuestion.state IN(:...answeredStates)', {
            answeredStates: ANSWERED_TYPE[answeredOption],
          })
          .leftJoin('subQuestion.comments', 'comments')
          .leftJoin('subQuestion.likes', 'likes')
          .leftJoin('subQuestion.keywords', 'keywords')
          .groupBy('subQuestion.id')
          .orderBy(SORT_TYPE[sortOption].subQuery, 'DESC')
          .offset((page - 1) * amount)
          .limit(amount),
      'topQuestion',
      'topQuestion.subQuestion_id = question.id',
    )
    .leftJoin('question.user', 'user')
    .leftJoinAndSelect('question.keywords', 'keyword')
    .loadRelationCountAndMap('question.likeCount', 'question.likes')
    .loadRelationCountAndMap('question.commentCount', 'question.comments')
    .orderBy(SORT_TYPE[sortOption].query, 'DESC')
    .getMany();

  return searchQuestionResult;
};
