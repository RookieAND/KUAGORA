import { createPortal } from "react-dom";

import { useAtom } from "jotai";
import { toolbarStateAtom } from "@/stores/atoms";

import * as style from "./ToolbarPortal.style";

const ToolbarPortal = () => {
  // toolbar의 Open 상태와 Content의 정보를 담은 atom 호출
  const [{ isOpen, content }] = useAtom(toolbarStateAtom);

  if (isOpen) {
    // 만약 mount 되기 전이라면, window 객체의 정보가 없으므로 false를 return 하게 됨.
    // toolbar id를 가진 div는 _document.tsx에 정의되었으므로 타입 단언을 통해 무조건 Element를 return.
    const toolbarRoot = typeof window !== undefined ? document.getElementById("toolbar") : null;

    // mount가 완료되었고, 툴바의 상태 또한 열렸으며 보여줄 컨텐츠가 있다면 Portal 생성
    return toolbarRoot && content ? createPortal(<style.Wrapper>{content}</style.Wrapper>, toolbarRoot) : null;
  }
  return null;
};

export default ToolbarPortal;
