import { useRef } from "react";
import { useClickAway } from "react-use";
import { ModalBackground, ModalBox } from "./modal.style";
import Loading from "./Loading";

const Modal = ({ setIsOpenModal, isLoading }) => {
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
        {isLoading ? <Loading /> : "모달 등장"}
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
