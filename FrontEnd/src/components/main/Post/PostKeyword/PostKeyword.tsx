import { useState } from "react";

import * as style from "./PostKeyword.style";

interface PostKeywordProps {
  postKeywords: string[];
  addNewKeyword: (k: string) => void;
  removeKeyword: (k: string) => void;
}

const PostKeyword = ({ postKeywords, addNewKeyword, removeKeyword }: PostKeywordProps) => {
  const [keywordValue, setKeywordValue] = useState("");

  const currentKeywordAmount = postKeywords.length;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordValue(e.target.value.trim());
  };

  const createKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" || e.key == "Spacebar") {
      if (keywordValue.length > 0) {
        addNewKeyword(keywordValue);
        setKeywordValue("");
      }
    }
  };

  return (
    <style.Wrapper>
      {postKeywords &&
        postKeywords.length > 0 &&
        postKeywords.map((keyword: string) => (
          <style.Keyword onClick={() => removeKeyword(keyword)} key={keyword}>
            {`#${keyword} `}
            {" ✕"}
          </style.Keyword>
        ))}
      <style.KeywordInput
        value={keywordValue}
        onKeyDown={createKeyword}
        onChange={changeInput}
        placeholder={currentKeywordAmount < 3 ? "여기에 키워드를 입력해주세요." : "더이상 키워드를 등록할 수 없습니다."}
        disabled={currentKeywordAmount === 3}
        max={15}
      />
    </style.Wrapper>
  );
};

export default PostKeyword;
