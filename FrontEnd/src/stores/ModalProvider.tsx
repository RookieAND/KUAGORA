import type { ReactNode } from "react";
import { createContext } from "react";

import useModal from "@/hooks/useModal";
import ModalPortal from "@/components/common/Modal/ModalPortal";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext({});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const { openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <ModalPortal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
