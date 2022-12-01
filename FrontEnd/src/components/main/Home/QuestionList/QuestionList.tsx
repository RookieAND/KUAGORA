import * as style from "./QuestionList.style";
import QuestionContext from "@/components/main/Home/QuestionList/QuestionContext";
import { QuestionContextProps } from "./QuestionContext";

const DummyQuestionContents: QuestionContextProps[] = [
  {
    title: "나는 문어 꿈을 꾸는 문어 세상에서 제일가는 문어가 되려면 ",
    like: 2,
    comment: 4
  },
  {
    title: "프론트엔드 개발을 잘하고 싶은데 어떻게 해야 할까요? 진짜 어렵네요",
    like: 5,
    comment: 0
  },
  {
    title: "아 종강 언제 하냐 진짜 집에서 놀고 싶다",
    like: 2,
    comment: 1
  },
  {
    title: "백우진 교수님 기말고사 문제 쉽게 내주시나요? 급해요 아무나 답좀",
    like: 0,
    comment: 1
  }
];

const QuestionList = () => {
  return (
    <style.Wrapper>
      <style.TitleBox>
        <style.Title>Question List</style.Title>
        <style.SubTitle>
          학우 분들이 가장 최근에 질문한 내용입니다.
        </style.SubTitle>
      </style.TitleBox>
      <style.QuestionBox>
        {DummyQuestionContents.map(({ title, like, comment }) => (
          <QuestionContext title={title} like={like} comment={comment} />
        ))}
      </style.QuestionBox>
    </style.Wrapper>
  );
};

export default QuestionList;
