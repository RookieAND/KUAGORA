import { useAtom } from "jotai";
import { setUserDataAtom } from "@/stores/actions";

import * as style from "./CommentElement.style";

import useModal from "@/hooks/useModal";
import useToolbar from "@/hooks/useToolbar";
import type { UserDataType } from "@/apis/question";
import { formatISODate } from "@/utils/formatISODate";

import ModalTemplate from "@/components/common/Modal/ModalTemplate";
import ToolbarTemplate from "@/components/common/Toolbar/ToolbarTemplate";

interface CommentElementProps {
  id: number;
  createdAt: string;
  content: string;
  commentWriter: UserDataType;
  postWriter: UserDataType;
  isAnswered: boolean;
  removeComment: (id: number) => Promise<void>;
  selectAnswerComment: (id: number, writedId: string) => Promise<boolean>;
}

const CommentElement = ({
  id,
  createdAt,
  content,
  commentWriter,
  postWriter,
  isAnswered,
  removeComment,
  selectAnswerComment
}: CommentElementProps) => {
  const { openModal, closeModal } = useModal();
  const { playToolbar } = useToolbar();
  const [{ uuid: readerId }] = useAtom(setUserDataAtom);

  const confirmDeleteComment = async () => {
    await removeComment(id);
    closeModal();
  };

  const confirmCommentSelect = async () => {
    const isSuccess = await selectAnswerComment(id, commentWriter.uuid);
    if (isSuccess) {
      closeModal();
      playToolbar(
        <ToolbarTemplate
          title={"성공적으로 댓글을 채택했습니다!"}
          subtitle={"답변을 채택하였으므로 다른 댓글을 채택할 수 없습니다."}
          showTime={2}
        />,
        2000
      );
    }
  };

  if (isAnswered) {
    return (
      <style.Wrapper className={"answered"}>
        <style.TopSection>
          <style.InfoText className={"answered"}>{commentWriter.nickname}</style.InfoText>
          <style.TimeText className={"answered"}>{`${formatISODate(createdAt)} | `}</style.TimeText>
          <style.EditText className={"answered"}>채택됨</style.EditText>
        </style.TopSection>
        <style.Content className={"answered"}>{content}</style.Content>
      </style.Wrapper>
    );
  }

  return (
    <style.Wrapper>
      <style.TopSection>
        <style.InfoText>
          {`${commentWriter.nickname} ${postWriter.uuid === commentWriter.uuid ? "(작성자)" : ""}`}
        </style.InfoText>
        <style.TimeText>{formatISODate(createdAt)}</style.TimeText>
        {readerId === commentWriter.uuid ? (
          <style.EditText
            onClick={() =>
              openModal(
                <ModalTemplate
                  title={"정말 댓글을 삭제하시겠습니까?"}
                  subtitle={"한번 삭제된 댓글은 되돌릴 수 없으니 주의해주세요."}
                  buttonText={"댓글 삭제하기"}
                  submitFunc={confirmDeleteComment}
                />
              )
            }
          >
            | 삭제
          </style.EditText>
        ) : (
          readerId === postWriter.uuid && (
            <style.EditText
              onClick={() =>
                openModal(
                  <ModalTemplate
                    title={"정말 댓글을 채택하시겠습니까?"}
                    subtitle={"채택이 완료된 후에는 수정이 불가하니 신중히 결정해주세요."}
                    buttonText={"댓글 채택하기"}
                    submitFunc={confirmCommentSelect}
                  />
                )
              }
            >
              | 채택
            </style.EditText>
          )
        )}
      </style.TopSection>
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default CommentElement;
