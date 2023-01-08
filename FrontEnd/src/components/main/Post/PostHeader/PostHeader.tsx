import * as style from "./PostHeader.style";

interface PostHeaderProps {
  postTitle: string;
  changeTitleInput: (k: string) => void;
  submitPost: () => any;
}

const PostHeader = ({ postTitle, changeTitleInput, submitPost }: PostHeaderProps) => {
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTitleInput(e.target.value);
  };

  return (
    <style.Wrapper>
      <style.TitleBox>
        <style.QuestionMark>Q.</style.QuestionMark>
        <style.TitleInput
          min={1}
          max={30}
          placeholder="여기에 제목을 입력해주세요."
          onChange={changeInput}
          value={postTitle}
        />
      </style.TitleBox>
      <style.SubmitBox>
        <style.SubmitBtn onClick={submitPost}>질문글 등록</style.SubmitBtn>
      </style.SubmitBox>
    </style.Wrapper>
  );
};

export default PostHeader;
