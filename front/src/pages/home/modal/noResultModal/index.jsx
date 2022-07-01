import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useClickAway } from "react-use";

import { NoResultIcon } from "assets/svgs";
import { ModalBackground, ModalBox, Button } from "./noResultModal.styled";

const NoResultModal = ({ setIsOpenModal }) => {
  const navigate = useNavigate();
  const outsideRef = useRef(null);

  const handleCloseButtonClick = () => {
    setIsOpenModal(false);
    navigate("/");
  };

  useClickAway(outsideRef, () => {
    setIsOpenModal(false);
    navigate("/");
  });

  return (
    <ModalBackground>
      <ModalBox ref={outsideRef}>
        <NoResultIcon width={80} />
        <span>감귤이가 장소를 찾지 못했어요 :(</span>
        <Button onClick={handleCloseButtonClick}>확인</Button>
      </ModalBox>
    </ModalBackground>
  );
};

export default NoResultModal;
