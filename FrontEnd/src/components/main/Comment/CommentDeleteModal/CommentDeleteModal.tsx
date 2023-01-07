import * as style from "./CommentDeleteModal.style";

import useModal from "@/hooks/useModal";

interface CommentDeleteModalProps {
  id: number;
  removeComment: (id: number) => Promise<void>;
}

const CommentDeleteModal = ({ id, removeComment }: CommentDeleteModalProps) => {
  const { closeModal } = useModal();

  const confirmDeleteComment = async () => {
    await removeComment(id);
    closeModal();
  };

  return (
    <style.Wrapper>
      <style.Title>정말 댓글을 삭제하시겠습니까?</style.Title>
      <style.SubmitBtn onClick={confirmDeleteComment}>삭제하기</style.SubmitBtn>
    </style.Wrapper>
  );
};

export default CommentDeleteModal;
