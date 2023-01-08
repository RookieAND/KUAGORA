import { useAtom } from "jotai";
import { setUserDataAtom } from "@/stores/actions";

import * as style from "./CommentElement.style";

import useModal from "@/hooks/useModal";
import type { UserDataType } from "@/apis/question";
import { formatISODate } from "@/utils/formatISODate";

import ModalTemplate from "@/components/common/Modal/ModalTemplate";

interface CommentElementProps {
  id: number;
  createdAt: string;
  content: string;
  user: UserDataType;
  writerUUID: string;
  isAnswered: boolean;
  removeComment: (id: number) => Promise<void>;
  selectAnswerComment: (id: number, writedId: string) => Promise<void>;
}

const CommentElement = ({
  id,
  createdAt,
  content,
  user,
  writerUUID,
  isAnswered,
  removeComment,
  selectAnswerComment
}: CommentElementProps) => {
  const { openModal, closeModal } = useModal();
  const [userData] = useAtom(setUserDataAtom);
  const { uuid } = userData;

  const confirmDeleteComment = async () => {
    await removeComment(id);
    closeModal();
  };

  const confirmCommentSelect = async () => {
    await selectAnswerComment(id, user.uuid);
    closeModal();
  };

  if (isAnswered) {
    return (
      <style.Wrapper className={"answered"}>
        <style.TopSection>
          <style.InfoText className={"answered"}>{user.nickname}</style.InfoText>
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
        <style.InfoText>{writerUUID === user.uuid ? `${user.nickname} (작성자)` : `${user.nickname}`}</style.InfoText>
        <style.TimeText>{formatISODate(createdAt)}</style.TimeText>
        {uuid === user.uuid && (
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
        )}
        {writerUUID === uuid && user.uuid !== uuid && (
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
        )}
      </style.TopSection>
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default CommentElement;
