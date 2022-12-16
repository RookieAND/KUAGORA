export const SORT_TYPE = {
  recent: {
    subQuery: 'subQuestion.createdAt',
    query: 'question.createdAt',
  },
  popular: {
    subQuery: 'likeCount',
    query: 'topQuestion.likeCount',
  },
} as const;

export const ANSWERED_TYPE = {
  progressed: ['progressed'],
  completed: ['completed'],
  both: ['progressed', 'completed'],
} as const;

export type SortOptionType = keyof typeof SORT_TYPE;
export type AnsweredOptionType = keyof typeof ANSWERED_TYPE;