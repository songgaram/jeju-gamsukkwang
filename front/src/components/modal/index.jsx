import { useRef } from "react";
import { useClickAway } from "react-use";

import { ExclamationIcon } from "assets/svgs";
import { ModalBackground, ModalBox } from "./modal.style";
import ModalButton from "components/button/ModalButton";

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
        <ModalButton onClick={handleCloseButtonClick} color="gray04">
          확인
        </ModalButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
