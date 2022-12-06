import { QuestionDetailType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import { QuestionDetail, DetailHeader } from "@/components/main/Question/QuestionDetail";

interface QuestionDetailTemplateProps {
  detailContent: QuestionDetailType;
}

const QuestionDetailTemplate = ({ detailContent }: QuestionDetailTemplateProps) => {
  console.log(detailContent);
  return (
    <>
      <Navbar />
      <DetailHeader
        title={detailContent?.title}
        state={detailContent?.state}
        nickname={detailContent?.nickname}
        createdAt={detailContent?.createdAt}
      />
      <QuestionDetail content={detailContent?.content} keywords={detailContent?.keywords} />
    </>
  );
};

export default QuestionDetailTemplate;
