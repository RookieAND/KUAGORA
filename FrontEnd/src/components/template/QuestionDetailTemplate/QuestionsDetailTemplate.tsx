import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { QuestionDetail, DetailHeader } from "@/components/main/Question/QuestionDetail";
import type { QuestionDetailType, LikeDataType } from "@/apis/question";
import CommentList from "@/components/main/Comment/CommentList";

interface QuestionDetailTemplateProps {
  detailContent: QuestionDetailType;
  likesData: LikeDataType;
  isWriter: boolean;
  changeQuestionState: () => void;
  toggleLikeState: () => void;
}

const QuestionDetailTemplate = ({
  detailContent,
  likesData,
  isWriter,
  changeQuestionState,
  toggleLikeState
}: QuestionDetailTemplateProps) => {
  return (
    <>
      <Navbar />
      <DetailHeader
        title={detailContent.title}
        state={detailContent.state}
        nickname={detailContent.user.nickname}
        createdAt={detailContent.createdAt}
        likesData={likesData}
        toggleLikeState={toggleLikeState}
      />
      <QuestionDetail
        content={detailContent.content}
        keywords={detailContent.keywords}
        isWriter={isWriter}
        state={detailContent.state}
      />
      <CommentList
        isWriter={isWriter}
        writerUUID={detailContent.user.uuid}
        state={detailContent.state}
        changeQuestionState={changeQuestionState}
      />
      <Footer />
    </>
  );
};

export default QuestionDetailTemplate;
