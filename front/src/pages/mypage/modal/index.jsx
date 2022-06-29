import { useRef } from "react";
import { useClickAway } from "react-use";

import { ExclamationIcon } from "assets/svgs";
import { ModalBackground, ModalBox, ModalButton } from "./modal.style";

const Modal = ({ setIsOpenModal, loadingOn }) => {
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
        {loadingOn ? "로딩" : "모달 등장"}
        <ModalButton onClick={handleCloseButtonClick}>확인</ModalButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
