import * as style from "./QuestionDeleteModal.style";

import useModal from "@/hooks/useModal";

interface QuestionDeleteModalProps {
  deleteQuestion: () => Promise<void>;
}

const QuestionDeleteModal = ({ deleteQuestion }: QuestionDeleteModalProps) => {
  const { closeModal } = useModal();

  const confirmDeleteQuestion = async () => {
    await deleteQuestion();
    closeModal();
  };

  return (
    <style.Wrapper>
      <style.Title>정말 질문글을 삭제하시겠습니까?</style.Title>
      <style.SubmitBtn onClick={confirmDeleteQuestion}>삭제하기</style.SubmitBtn>
    </style.Wrapper>
  );
};

export default QuestionDeleteModal;
