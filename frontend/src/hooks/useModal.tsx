import { useState } from "react";

export const useModal = (initState?: boolean) => {
  const [isOpen, setOpen] = useState(initState || false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { isOpen, openModal, closeModal };
};
