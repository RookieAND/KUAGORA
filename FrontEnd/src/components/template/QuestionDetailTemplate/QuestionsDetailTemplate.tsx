import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { QuestionDetail, DetailHeader } from "@/components/main/Question/QuestionDetail";
import type { QuestionDetailType, LikeDataType } from "@/apis/question";
import CommentList from "@/components/main/Comment/CommentList";

interface QuestionDetailTemplateProps {
  detailContent: QuestionDetailType;
  likesData: LikeDataType;
  changeQuestionState: () => void;
  toggleLikeState: () => void;
}

const QuestionDetailTemplate = ({
  detailContent,
  likesData,
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
        isWriter={detailContent.isWriter}
        state={detailContent.state}
      />
      <CommentList
        isPostWriter={detailContent.isWriter}
        postWriter={detailContent.user}
        state={detailContent.state}
        changeQuestionState={changeQuestionState}
      />
      <Footer />
    </>
  );
};

export default QuestionDetailTemplate;
