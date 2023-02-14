import { useAtom } from "jotai";
import type { ReactNode } from "react";

import { handleToolbarAtom } from "@/stores/actions";

const useToolbar = () => {
  const [{ timeOut }, setToolbarState] = useAtom(handleToolbarAtom);

  const playToolbar = (newToolbarContent: ReactNode, showTimeMilli: number = 5000) => {
    const timeout = setTimeout(() => {
      setToolbarState({ isOpen: false, timeOut: null, content: null });
    }, showTimeMilli);
    setToolbarState({ isOpen: true, timeOut: timeout, content: newToolbarContent });
  };

  const cancelToolbar = () => {
    if (timeOut) {
      clearTimeout(timeOut);
      setToolbarState({ isOpen: false, timeOut: null, content: null });
    }
  };

  return { playToolbar, cancelToolbar };
};

export default useToolbar;
