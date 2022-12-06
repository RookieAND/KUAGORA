import { useState } from "react";

import * as style from "./PostContent.style";

interface PostContentProps {
  changeContentInput: (k: string) => void;
}

const PostContent = ({ changeContentInput }: PostContentProps) => {
  const [contentValue, setContentValue] = useState("");
  const changeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeContentInput(e.target.value);
    setContentValue(e.target.value);
  };

  return (
    <style.Wrapper>
      <style.Content
        value={contentValue}
        onChange={changeInput}
        rows={4}
        cols={50}
        placeholder="여기에 질문 내용을 적어주세요."
      ></style.Content>
    </style.Wrapper>
  );
};

export default PostContent;
