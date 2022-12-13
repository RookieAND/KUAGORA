import { useState } from "react";

import * as style from "./SearchOptionSelect.style";
import { SELECT_INFO, SelectType, SelectInfoType } from "@/constants/search";

interface SearchOptionSelectProps {
  selectType: SelectType;
}

const SearchOptionSelect = ({ selectType }: SearchOptionSelectProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(-1);

  const toggleSelectShow = () => {
    setIsShowing(prev => !prev);
  };

  const selectNewOption = (idx: number) => {
    if (selectedOptionIdx !== idx) {
      setSelectedOptionIdx(idx);
    }
  };

  const selectOptionList = SELECT_INFO[selectType];

  return (
    <style.Wrapper onClick={toggleSelectShow} isShowing={isShowing}>
      <style.SelectedLabel>
        {selectedOptionIdx == -1 ? "옵션 미선택" : `${selectOptionList[selectedOptionIdx].display}`}
      </style.SelectedLabel>
      <style.SelectList isShowing={isShowing}>
        {selectOptionList.map(({ option, display }: SelectInfoType, index: number) => {
          return (
            <style.SelectOption key={option} onClick={() => selectNewOption(index)}>
              {display}
            </style.SelectOption>
          );
        })}
      </style.SelectList>
    </style.Wrapper>
  );
};

export default SearchOptionSelect;
