import * as style from "./CommentInput.style";
import CommentSvg from "@/assets/icons/Comment.svg";

interface CommentInputProps {
  commentValue: string;
  changeCommentInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addNewComment: () => void;
}

const CommentInput = ({ commentValue, changeCommentInput, addNewComment }: CommentInputProps) => {
  const submitComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
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
