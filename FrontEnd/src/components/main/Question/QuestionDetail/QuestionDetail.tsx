import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";

import type { KeywordDataType } from "@/apis/question";
import { deleteQuestionAsync } from "@/apis/question";
import { accessTokenAtom } from "@/stores/actions";
import useModal from "@/hooks/useModal";

import * as style from "./QuestionDetail.style";
import ModalTemplate from "@/components/common/Modal/ModalTemplate";

interface QuestionDetailProps {
  content: string;
  keywords: KeywordDataType[];
  isWriter: boolean;
  state: "progressed" | "completed";
}

const QuestionDetail = ({ content, keywords, isWriter, state }: QuestionDetailProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [accessToken] = useAtom(accessTokenAtom);
  const { openModal, closeModal } = useModal();

  const questionId = Number(router.query.qid);

  const deleteQuestion = async () => {
    const response = await deleteQuestionAsync(questionId, accessToken || "");
    // 글을 성공적으로 삭제했다면, 기존에 캐싱된 질문글 데이터를 말소시킴
    // 현재 질문글 목록 컴포넌트가 unmount 상태이기에 refetchInactive 옵션을 켜줌.
    if (response.isSuccess) {
      await queryClient.invalidateQueries({ queryKey: ["question"], refetchType: "active" });
      closeModal();
      router.replace("/questions");
    }
  };

  const editQuestion = async () => {
    router.push(`/edit/${questionId}`);
  };

  return (
    <style.Wrapper>
      <style.KeywordBox>
        {keywords &&
          keywords.length > 0 &&
          keywords.map((keyword: KeywordDataType) => (
            <style.Keyword state={state} key={keyword.id}>{`#${keyword.content}`}</style.Keyword>
          ))}
      </style.KeywordBox>
      {isWriter && state === "progressed" && (
        <style.ModifyBox>
          <style.ModifyText onClick={editQuestion}>{`수정`}</style.ModifyText>
          <style.ModifyText
            onClick={() =>
              openModal(
                <ModalTemplate
                  title={"정말 질문글을 삭제하시겠습니까?"}
                  subtitle={"한번 삭제된 질문글은 복구할 수 없으니 신중히 결정하세요."}
                  buttonText={"질문글 삭제하기"}
                  submitFunc={deleteQuestion}
                />
              )
            }
          >{`삭제`}</style.ModifyText>
        </style.ModifyBox>
      )}
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default QuestionDetail;
