import { useRef } from "react";
import { useClickAway } from "react-use";

import { ExclamationIcon } from "assets/svgs";
import { ModalBackground, ModalBox, ModalButton } from "./modal.style";

const Modal = ({ setIsOpenModal, modalMessage }) => {
  const outsideRef = useRef(null);

  const handleCloseButtonClick = () => {
    setIsOpenModal(false);
  };

  useClickAway(outsideRef, () => {
    setIsOpenModal(false);
  });

  return (
    <ModalBackground>
      <ModalBox ref={outsideRef}>
        <ExclamationIcon width={80} height={80} />
        <p>{modalMessage}</p>
        <ModalButton onClick={handleCloseButtonClick}>확인</ModalButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
