import { getRepository } from 'typeorm';
import Question from '@/database/entity/question';

export const searchQuestionByTitle = async (
  title: string,
  page: number,
  amount: number,
  option: 'recent' | 'popular',
) => {
  const sortType = {
    recent: 'question.createdAt',
    popular: 'likeAmount',
  };

  const questionsByTitle = await getRepository(Question)
    .createQueryBuilder('question')
    .select([
      'question.id',
      'question.title',
      'question.content',
      'question.state',
      'question.createdAt',
      'question.updatedAt',
    ])
    .innerJoin(
      (qb) =>
        qb
          .select(['subquestion.id', 'COUNT(likes.id) AS likeCount'])
          .from(Question, 'subquestion')
          .where('subquestion.title like :title', { title: `%${title}` })
          .leftJoin('subquestion.likes', 'likes')
          .groupBy('subquestion.id')
          .offset((page - 1) * amount)
          .limit(amount)
          .orderBy(sortType[option], 'DESC'),
      'topQuestion',
      'topQuestion.id == question.id',
    )
    .leftJoinAndSelect('question.user', 'user')
    .leftJoinAndSelect('question.category', 'category')
    .loadRelationCountAndMap('question.likes', 'likeCount')
    .getMany();

  return questionsByTitle;
};
