import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";

import { accessTokenAtom, setUserDataAtom } from "@/stores/actions";
import { addNewCommentAsync, getCommentsAsync, patchQuestionStateAsync, removeCommentAsync } from "@/apis/question";
import type { UserDataType } from "@/apis/question";
import type { CommentDataType } from "@/apis/question";

import * as style from "./CommentList.style";
import CommentInput from "@/components/main/Comment/CommentInput";
import CommentElement from "@/components/main/Comment/CommentElement";

interface CommentListProps {
  isPostWriter: boolean;
  postWriter: UserDataType;
  state: "progressed" | "completed";
  changeQuestionState: () => void;
}

const CommentList = ({ isPostWriter, postWriter, state, changeQuestionState }: CommentListProps) => {
  const router = useRouter();
  const questionId = Number(router.query.qid);

  const { data, refetch } = useQuery(["comments", questionId], () => getCommentsAsync(questionId, 1, 12), {
    staleTime: 30000
  });
  const [commentValue, setCommentValue] = useState("");
  const [accessToken] = useAtom(accessTokenAtom);
  const [userData] = useAtom(setUserDataAtom);

  // 새로운 댓글을 추가하는 함수
  const addNewComment = async () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    if (commentValue.length > 0) {
      const response = await addNewCommentAsync(questionId, accessToken, commentValue);
      if (response.isSuccess) {
        setCommentValue("");
        await refetch();
      }
      return response.isSuccess;
    }
  };

  // 기존의 댓글을 제거하는 함수
  const removeComment = async (commentId: number) => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    await removeCommentAsync(questionId, commentId, accessToken);
    await refetch();
  };

  // Input 내의 value 를 state에 업데이트 하는 함수
  const changeCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  // 작성된 댓글을 답변으로 채택하는 함수
  const selectAnswerComment = async (commentId: number, commentWriterId: string) => {
    if (!accessToken) {
      router.push("/login");
      return false;
    }

    // 글이 미해결 상태이며, 질문글 작성자가 타인의 댓글을 채택했는지 확인
    if (state === "progressed" && isPostWriter && commentWriterId !== userData.uuid) {
      const response = await patchQuestionStateAsync(questionId, commentId, accessToken);
      if (response.isSuccess) {
        await refetch();
        changeQuestionState();
        return true;
      }
    }
    return false;
  };

  const comments = data?.isSuccess ? data.result : [];

  return (
    <style.Wrapper>
      <style.TitleBox>
        <style.AnswerMark>A. </style.AnswerMark>
        <style.Title>댓글 목록 </style.Title>
        <style.Desc>작성자께서 도움이 된 댓글을 선택하면, 해당 댓글이 답변으로 채택됩니다.</style.Desc>
        <style.Desc>단, 한번 채택된 답변은 추후 수정이 불가하니 신중히 결정해주세요.</style.Desc>
      </style.TitleBox>
      <CommentInput commentValue={commentValue} changeCommentInput={changeCommentInput} addNewComment={addNewComment} />
      <style.CommentInfoBox>
        {comments &&
          comments.length > 0 &&
          comments.map((comment: CommentDataType) => (
            <CommentElement
              key={comment.id}
              id={comment.id}
              createdAt={comment.createdAt}
              content={comment.content}
              commentWriter={comment.user}
              isAnswered={comment.isAnswered}
              postWriter={postWriter}
              removeComment={removeComment}
              selectAnswerComment={selectAnswerComment}
            />
          ))}
      </style.CommentInfoBox>
    </style.Wrapper>
  );
};

export default CommentList;
