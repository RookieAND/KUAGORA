import { useAtom } from "jotai";
import { setUserDataAtom } from "@/stores/actions";

import * as style from "./CommentElement.style";

import { UserDataType } from "@/apis/question";
import { formatISODate } from "@/utils/formatISODate";

interface CommentElementProps {
  id: number;
  createdAt: string;
  content: string;
  user: UserDataType;
  isAnswered: boolean;
  removeComment: (id: number) => Promise<void>;
  selectAnswerComment: (id: number, writedId: string) => Promise<void>;
}

const CommentElement = ({
  id,
  createdAt,
  content,
  user,
  isAnswered,
  removeComment,
  selectAnswerComment
}: CommentElementProps) => {
  const [userData] = useAtom(setUserDataAtom);
  const { uuid } = userData;

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
    <style.Wrapper onClick={() => selectAnswerComment(id, user.uuid)}>
      <style.TopSection>
        <style.InfoText>{user.nickname}</style.InfoText>
        <style.TimeText>{formatISODate(createdAt)}</style.TimeText>
        {uuid === user.uuid ? (
          <style.EditText onClick={() => removeComment(id)}>| 삭제</style.EditText>
        ) : (
          <style.EditText>| 신고</style.EditText>
        )}
      </style.TopSection>
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default CommentElement;
