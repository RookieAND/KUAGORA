import * as style from "./PostContent.style";

interface PostContentProps {
  postContent: string;
  changeContentInput: (k: string) => void;
}

const PostContent = ({ postContent, changeContentInput }: PostContentProps) => {
  const changeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeContentInput(e.target.value);
  };

  return (
    <style.Wrapper>
      <style.Content
        value={postContent}
        onChange={changeInput}
        rows={4}
        cols={50}
        placeholder="여기에 질문 내용을 적어주세요."
      />
    </style.Wrapper>
  );
};

export default PostContent;
