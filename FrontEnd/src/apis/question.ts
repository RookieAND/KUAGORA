import { getAsync, postAsync } from "./API";

export interface QuestionPostType {
  title: string;
  createdAt: string;
  likes: number;
  comments: number;
  questionId: number;
  state: "progressed" | "completed";
}

export interface QuestionDetailType extends QuestionPostType {
  content: string;
  nickname: string;
  isLike: boolean;
}

export interface AddQuestionType {
  title: string;
  content: string;
}

export interface AddQuestionResultType {
  questionId: number;
}

export type QuestionSortType = "recent" | "popular";

export const getQuestionListAsync = async (
  page: number,
  amount: number,
  option: QuestionSortType
) => {
  const response = await getAsync<QuestionPostType[], any>(`/question`, {
    params: { page, amount, option }
  });

  return {
    isSuccess: response.isSuccess,
    result: {
      questions: response.isSuccess ? response.result : [],
      page,
      amount
    }
  };
};

export const getQuestionAsync = async (questionId: number) => {
  const response = await getAsync<QuestionDetailType, unknown>(
    `/question/${questionId}`
  );

  return response;
};

/**
 * 작성된 질문글을 새롭게 추가하는 함수
 * @param title 질문글 제목
 * @param content 질문글 내용
 * @param token 질문글을 작성한 유저의 엑세스 토큰
 * @returns
 */
export const addQuestionAsync = async (
  title: string,
  content: string,
  token: string
) => {
  const response = await postAsync<AddQuestionResultType, AddQuestionType>(
    `question/write`,
    {
      title,
      content
    },
    { headers: { authorization: token } }
  );
  if (response.isSuccess) {
    return response.result.questionId;
  }
  return null;
};
