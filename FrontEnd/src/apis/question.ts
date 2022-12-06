import { deleteAsync, getAsync, patchAsync, postAsync } from "@/apis/API";

export interface QuestionPostType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  state: "progressed" | "completed";
  likeCount: number;
  commentCount: number;
  keywords: KeywordDataType[];
}

export interface QuestionDetailType extends QuestionPostType {
  isLike: boolean;
  user: UserDataType;
  content: string;
  comments: CommentDataType[];
}

export interface LikeDataType {
  isLike: boolean;
  likeCount: number;
}

export interface UserDataType {
  uuid: string;
  nickname: string;
}

export interface KeywordDataType {
  id: number;
  content: string;
}

export interface CommentDataType {
  id: number;
  content: string;
  createdAt: string;
  user: UserDataType;
  isAnswered: boolean;
}

export type QuestionSortType = "recent" | "popular";

export interface AddQuestionType {
  title: string;
  content: string;
}

export interface AddQuestionResultType {
  questionId: number;
}

/**
 * 전체 질문글 중, 정렬 기준을 통해 일부를 목록으로 가져오는 함수
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param option 질문글을 정렬할 기준 (최신 순, 인기 순)
 * @returns 기준에 따라 정렬된 질문글의 일부 정보
 */
export const getQuestionListAsync = async (page: number, amount: number, option: QuestionSortType) => {
  const response = await getAsync<QuestionPostType[], any>(`/question`, {
    params: { page, amount, option }
  });

  return {
    isSuccess: response.isSuccess,
    result: response.isSuccess ? response.result : []
  };
};

/**
 * 특정 ID를 가진 질문글 내역을 가지고 오는 함수
 * @param questionId 정보를 가져올 질문글의 ID
 * @returns 질문글 내에 담긴 정보
 */
export const getQuestionAsync = async (questionId: number) => {
  const response = await getAsync<QuestionDetailType, unknown>(`/question/${questionId}`);
  return response;
};

/**
 * 작성된 질문글을 새롭게 추가하는 함수
 * @param title 질문글 제목
 * @param content 질문글 내용
 * @param token 질문글을 작성한 유저의 엑세스 토큰
 * @returns
 */
export const addQuestionAsync = async (title: string, content: string, token: string) => {
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

/**
 * 질문글의 상태를 해결됨으로 변경하고, 채택된 댓글의 상태도 변경하는 함수.
 * @param title 질문글 제목
 * @param content 질문글 내용
 * @param token 질문글을 작성한 유저의 엑세스 토큰
 * @returns
 */
export const patchQuestionStateAsync = async (questionId: number, commentId: number, token: string) => {
  await patchAsync<null, null>(`question/${questionId}/${commentId}/comment`, null, {
    headers: { authorization: token }
  });
};

/**
 * 질문글에 달린 댓글 목록을 불러오는 함수
 * @param questionId 댓글 목록을 불러올 질문글 ID
 * @param page 댓글 목록을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 댓글의 수량
 * @returns 질문글에 달린 댓글 목록
 */
export const getCommentsAsync = async (questionId: number, page: number, amount: number) => {
  const response = await getAsync<CommentDataType[], null>(`question/${questionId}/comment`, {
    params: { page, amount }
  });
  return response;
};

/**
 * 질문글에 새로운 댓글을 추가하는 함수
 * @param questionId 댓글을 추가할 질문글의 ID
 * @param token 댓글을 작성한 유저의 액세스 토큰
 * @param content 유저가 작성한 댓글 내용
 */
export const addNewCommentAsync = async (questionId: number, token: string, content: string) => {
  await postAsync<null, any>(
    `question/${questionId}/comment`,
    { content },
    {
      headers: { authorization: token }
    }
  );
};

/**
 * 질문글에 달렸던 댓글을 삭제하는 함수
 * @param questionId 댓글을 삭제할 질문글의 ID
 * @param commentId 삭제하려는 댓글의 ID
 * @param token 댓글을 지우려는 유저의 액세스 토큰
 */
export const removeCommentAsync = async (questionId: number, commentId: number, token: string) => {
  await deleteAsync<null, null>(`question/${questionId}/${commentId}/comment`, {
    headers: { authorization: token }
  });
};

/**
 * 질문글에 포함된 키워드 목록을 불러오는 함수
 * @param questionId 키워드 목록을 불러올 질문글 ID
 * @returns 질문글에 포함된 키워드 목록
 */
export const getKeywordsAsync = async (questionId: number) => {
  const response = await getAsync<KeywordDataType[], null>(`question/${questionId}/keyword`);
  return response;
};

/**
 * 질문글에 포함된 좋아요 정보를 불러오는 함수
 * @param questionId 좋아요 정보를 불러올 질문글 ID
 * @returns 질문글에 소속된 좋아요 정보
 */
export const getLikesAsync = async (questionId: number) => {
  const response = await getAsync<LikeDataType[], null>(`question/${questionId}/like`);
  return response;
};
