import { deleteAsync, getAsync, patchAsync, postAsync } from "@/apis/API";
import type { APIResult } from "@/apis/API";

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

export interface InfQueryType<T> {
  content: T[];
  isLast: boolean;
  nextPage: number;
}

export interface QuestionDetailType extends QuestionPostType {
  isLike: boolean;
  isWriter: boolean;
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
export type QuestionSearchType = "title" | "keyword";
export type QuestionAnsweredType = "progressed" | "completed" | "both";

export interface AddQuestionType {
  title: string;
  content: string;
  keywords: string[];
}

export interface AddQuestionResultType {
  questionId: number;
}

export interface AddLikesResultType {
  likesId: number;
}

/**
 * 전체 질문글 중, 특정 검색의 결과를 옵션에 맞게 정렬하여 목록으로 가져오는 함수
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param query 질문글 검색 쿼리
 * @param sortOption 질문글을 정렬할 기준 (최신 순, 인기 순)
 * @param searchOption 질문글 검색 옵션 (제목 별, 키워드 별)
 * @param answeredOption 질문글 채택에 따른 정렬 기준
 */
export const getQuestionsByQueryAsync = async (
  page: number,
  amount: number,
  query: string,
  sortOption: QuestionSortType,
  searchOption: QuestionSearchType,
  answeredOption: QuestionAnsweredType
): APIResult<InfQueryType<QuestionPostType>> => {
  const response = await getAsync<QuestionPostType[], any>(`/search/${searchOption}`, {
    params: { page, amount, query, sortOption, answeredOption }
  });

  if (response.isSuccess) {
    return {
      isSuccess: response.isSuccess,
      result: {
        content: response.result,
        isLast: response.result.length < amount,
        nextPage: page + 1
      }
    };
  }

  return response;
};

/**
 * 전체 질문글 중, 정렬 기준을 통해 일부를 목록으로 가져오는 함수
 * @param page 질문글을 보여줄 페이지
 * @param amount 하나의 페이지에 보여줄 질문글의 수량
 * @param sortOption 질문글을 정렬할 기준 (최신 순, 인기 순)
 * @param answeredOption 질문글 채택에 따른 정렬 기준
 * @returns 기준에 따라 정렬된 질문글의 일부 정보
 */
export const getQuestionsAsync = async (
  page: number,
  amount: number,
  sortOption: QuestionSortType,
  answeredOption: QuestionAnsweredType
): APIResult<InfQueryType<QuestionPostType>> => {
  const response = await getAsync<QuestionPostType[], unknown>(`/question`, {
    params: { page, amount, sortOption, answeredOption }
  });

  if (response.isSuccess) {
    return {
      isSuccess: response.isSuccess,
      result: {
        content: response.result,
        isLast: response.result.length < amount,
        nextPage: page + 1
      }
    };
  }

  return response;
};

/**
 * 특정 ID를 가진 질문글 내역을 가지고 오는 함수
 * @param questionId 정보를 가져올 질문글의 ID
 * @returns 질문글 내에 담긴 정보
 */
export const getQuestionAsync = async (questionId: number, token: string) => {
  const response = await getAsync<QuestionDetailType, any>(`/question/${questionId}`, {
    headers: { authorization: token }
  });
  return response;
};

/**
 * 작성된 질문글을 새롭게 추가하는 함수
 * @param title 질문글 제목
 * @param content 질문글 내용
 * @param token 질문글을 작성한 유저의 엑세스 토큰
 * @returns
 */
export const addQuestionAsync = async (title: string, content: string, keywords: string[], token: string) => {
  const response = await postAsync<AddQuestionResultType, AddQuestionType>(
    `question/write`,
    {
      title,
      content,
      keywords
    },
    { headers: { authorization: token } }
  );
  return response;
};

/**
 * 자신이 작성한 질문글을 삭제하는 함수
 * @param questionId 삭제하려는 질문글의 id
 * @param token 작성자의 엑세스 토큰
 * @returns 삭제 성공 / 실패 여부
 */
export const deleteQuestionAsync = async (questionId: number, token: string) => {
  const response = await deleteAsync<null, unknown>(`/question/${questionId}`, { headers: { authorization: token } });
  return response;
};

/**
 * 자신이 작성한 작성글을 수정하는 함수
 * @param questionId 수정하려는 질문글의 id
 * @param title 수정된 질문글의 title
 * @param content 수정된 질문글의 content
 * @param addKeywords 새로이 추가된 keyword 목록
 * @param delKeywords 삭제된 질문글의 keyword 목록
 * @param token 작성자의 액세스 토큰
 * @returns 수정 관련 성공 / 실패 여부
 */
export const patchQuestionAsync = async (
  questionId: number,
  token: string,
  title: string,
  content: string,
  addKeywords: string[],
  delKeywords: string[]
) => {
  const response = await patchAsync<null, any>(
    `/question/${questionId}`,
    {
      title,
      content,
      addKeywords,
      delKeywords
    },
    { headers: { authorization: token } }
  );
  return response;
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

/**
 * 질문글에 새로운 좋아요 정보를 추가하는 함수
 * @param questionId 좋아요 정보를 추가할 질문글 ID
 * @param token 좋아요 정보를 추가한 유저의 token
 * @returns 새롭게 추가된 좋아요 정보의 ID
 */
export const addLikesAsync = async (questionId: number, token: string) => {
  const response = await postAsync<AddLikesResultType, null>(`question/${questionId}/like`, null, {
    headers: { authorization: token }
  });
  return response;
};

/**
 * 유저가 이전에 달았던 질문글의 좋아요 정보를 삭제하는 함수
 * @param questionId 좋아요 정보를 삭제할 질문글 ID
 * @param token 좋아요 정보를 삭제한 유저의 token
 * @returns 좋아요 정보 삭제 여부 (isSuccess)
 */
export const deleteLikesAsync = async (questionId: number, token: string) => {
  const response = await deleteAsync<null, null>(`question/${questionId}/like`, {
    headers: { authorization: token }
  });
  return response;
};
