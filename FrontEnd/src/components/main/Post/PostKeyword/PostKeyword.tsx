import { useState } from "react";

import * as style from "./PostKeyword.style";

interface PostKeywordProps {
  postKeywords: string[];
  addNewKeyword: (k: string) => void;
  removeKeyword: (k: string) => void;
}

const PostKeyword = ({ postKeywords, addNewKeyword, removeKeyword }: PostKeywordProps) => {
  const [keywordValue, setKeywordValue] = useState<string>("");
  const currentKeywordAmount = postKeywords.length;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordValue(e.target.value.trim());
  };

  const createKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const eventTarget = e.target as HTMLInputElement;
    if (e.key == "Enter" || e.key == "Spacebar") {
      setKeywordValue("");
      if (keywordValue.length > 1 && !postKeywords.includes(keywordValue)) {
        addNewKeyword(keywordValue);
        return;
      }
      eventTarget.placeholder =
        keywordValue.length < 2 ? "키워드는 2글자 이상 입력해야 합니다." : "중복된 이름의 키워드를 등록할 수 없습니다.";
    } else if (e.key === "Backspace" || e.key === "Delete") {
      eventTarget.placeholder =
        currentKeywordAmount < 3 ? "여기에 키워드를 입력해주세요." : "더이상 키워드를 등록할 수 없습니다.";
    }
  };

  return (
    <style.Wrapper>
      {postKeywords.length > 0 &&
        postKeywords.map((keyword: string) => (
          <style.Keyword onClick={() => removeKeyword(keyword)} key={keyword}>
            {`#${keyword} ✕`}
          </style.Keyword>
        ))}
      <style.KeywordInput
        value={keywordValue}
        onKeyDown={createKeyword}
        onChange={changeInput}
        placeholder={currentKeywordAmount < 3 ? "여기에 키워드를 입력해주세요." : "더이상 키워드를 등록할 수 없습니다."}
        disabled={currentKeywordAmount === 3}
        max={10}
      />
    </style.Wrapper>
  );
};

export default PostKeyword;
