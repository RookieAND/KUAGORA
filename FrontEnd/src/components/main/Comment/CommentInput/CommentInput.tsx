import { useAtom } from "jotai";
import { useRouter } from "next/router";

import useModal from "@/hooks/useModal";
import { accessTokenAtom } from "@/stores/actions";

import ModalTemplate from "@/components/common/Modal/ModalTemplate";

import * as style from "./CommentInput.style";
import CommentSvg from "@/assets/icons/Comment.svg";

interface CommentInputProps {
  commentValue: string;
  changeCommentInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addNewComment: () => void;
}

const CommentInput = ({ commentValue, changeCommentInput, addNewComment }: CommentInputProps) => {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const { openModal, closeModal } = useModal();

  // 메인 페이지로 이동시키는 함수
  const moveToLoginPage = async () => {
    router.replace("/login");
    closeModal();
  };

  // 로그인 여부에 따라 댓글을 추가할지, 아니면 로그인 페이지로 이동시킬지를 결정하는 함수
  const submitComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (!accessToken) {
        openModal(
          <ModalTemplate
            title={"로그인이 필요한 기능입니다."}
            subtitle={"하단의 버튼을 클릭하여 로그인을 진행하세요."}
            buttonText={"로그인 하기"}
            submitFunc={moveToLoginPage}
          />
        );
        return;
      }
      addNewComment();
    }
  };

  return (
    <style.Wrapper>
      <style.IconWrap onClick={addNewComment}>
        <CommentSvg />
      </style.IconWrap>
      <style.CommentInput
        placeholder="댓글을 입력해주세요. (최대 100자)"
        maxLength={100}
        minLength={1}
        onChange={changeCommentInput}
        onKeyDown={submitComment}
        value={commentValue}
      />
    </style.Wrapper>
  );
};

export default CommentInput;
