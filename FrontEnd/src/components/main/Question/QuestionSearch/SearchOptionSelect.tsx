import { useState } from "react";

import * as style from "./SearchOptionSelect.style";
import type { SelectType, SelectInfoType } from "@/constants/search";
import { SELECT_INFO } from "@/constants/search";

interface SearchOptionSelectProps {
  selectType: SelectType;
  changeSearchFilter: (option: SelectType, value: string) => void;
}

const SearchOptionSelect = ({ selectType, changeSearchFilter }: SearchOptionSelectProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);

  const toggleSelectShow = () => {
    setIsShowing(prev => !prev);
  };

  const selectNewOption = (idx: number) => {
    if (selectedOptionIdx !== idx) {
      setSelectedOptionIdx(idx);
      changeSearchFilter(selectType, selectOptionList[idx].option);
    }
  };

  const selectOptionList = SELECT_INFO[selectType];

  return (
    <style.Wrapper onClick={toggleSelectShow} isShowing={isShowing}>
      <style.SelectedLabel>{`${selectOptionList[selectedOptionIdx].display}`}</style.SelectedLabel>
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
