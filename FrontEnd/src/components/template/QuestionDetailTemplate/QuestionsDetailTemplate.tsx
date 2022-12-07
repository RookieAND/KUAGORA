import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { QuestionDetail, DetailHeader } from "@/components/main/Question/QuestionDetail";
import { CommentDataType, QuestionDetailType, LikeDataType } from "@/apis/question";
import CommentList from "@/components/main/Comment/CommentList";

interface QuestionDetailTemplateProps {
  detailContent: QuestionDetailType;
  changeQuestionState: () => void;
  likes: LikeDataType;
  isWriter: boolean;
}

const QuestionDetailTemplate = ({
  detailContent,
  likes,
  isWriter,
  changeQuestionState
}: QuestionDetailTemplateProps) => {
  return (
    <>
      <Navbar />
      <DetailHeader
        title={detailContent.title}
        state={detailContent.state}
        nickname={detailContent.user.nickname}
        createdAt={detailContent.createdAt}
      />
      <QuestionDetail content={detailContent.content} keywords={detailContent.keywords} likes={likes} />
      <CommentList isWriter={isWriter} state={detailContent.state} changeQuestionState={changeQuestionState} />
      <Footer />
    </>
  );
};

export default QuestionDetailTemplate;
