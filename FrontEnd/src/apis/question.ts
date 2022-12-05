import { getAsync } from "./API";

export interface QuestionPostType {
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  likes: number;
  comments: number;
  state: "progressed" | "answered";
}

interface AddQuestionType {
  title: string;
  content: string;
  uuid: string;
}

export type QuestionSortType = "recent" | "popular";

export const getQuestionsAsync = async (
  page: number,
  amount: number,
  option: QuestionSortType
) => {
  const response = await getAsync<QuestionPostType[], any>(`/question`, {
    params: { page, amount, option }
  });

  if (response.isSuccess) {
    return {
      isSuccess: response.isSuccess,
      result: {
        questions: response.result,
        page,
        amount
      }
    };
  }

  return response;
};
