import { useRef } from "react";
import { useClickAway } from "react-use";
import { ModalBackground, ModalBox } from "./modal.style";
import Loading from "./Loading";
import ImageAuth from "./ImageAuth";

const Modal = ({ setIsOpenModal, isLoading, data }) => {
  const outsideRef = useRef(null);

  useClickAway(outsideRef, () => {
    setIsOpenModal(false);
  });

  return (
    <ModalBackground>
      <ModalBox ref={outsideRef}>
        {isLoading ? <Loading /> : <ImageAuth data={data} />}
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
