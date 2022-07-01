import { useRef } from "react";
import { useClickAway } from "react-use";
import { ModalBackground, ModalBox } from "./imageAuth.style";
import Loading from "./Loading";
import ImageAuthResult from "./ImageAuthResult";

const Modal = ({ setIsOpenModal, isLoading, data }) => {
  const outsideRef = useRef(null);

  useClickAway(outsideRef, () => {
    setIsOpenModal(false);
  });

  return (
    <ModalBackground>
      <ModalBox ref={outsideRef}>
        {isLoading ? (
          <Loading />
        ) : (
          <ImageAuthResult data={data} setIsOpenModal={setIsOpenModal} />
        )}
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
