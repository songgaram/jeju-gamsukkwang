import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState } from "states";
import Dropdown from "./dropdown";
import Modal from "components/modal";
import ModalPortal from "components/modal/modalPortal";

import styled from "styled-components";
import PostList from "./postList";

const Community = () => {
  const navigate = useNavigate();
  const [headSelected, setHeadSelected] = useState("");
  const loginUserId = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropDownFunction = (itemValue) => {
    setHeadSelected(itemValue);
  };

  const handleClick = () => {
    if (loginUserId === null) {
      setIsModalOpen(true);
      return;
    } else {
      navigate("/community/post");
    }
  };

  return (
    <>
      <CommunityBox>
        <DropdownBox>
          <h2>π κ²μν</h2>
          <Dropdown dropDownFunction={dropDownFunction} />
        </DropdownBox>
        <PostBox>
          <PostList headSelected={headSelected} />
        </PostBox>
        <ButtonBox>
          <button type="button" onClick={handleClick}>
            κ²μκΈ μμ±
          </button>
        </ButtonBox>
      </CommunityBox>
      {isModalOpen && (
        <ModalPortal>
          <Modal
            setIsOpenModal={setIsModalOpen}
            modalMessage="λ‘κ·ΈμΈ ν μ΄μ© κ°λ₯ν©λλ€."
          />
        </ModalPortal>
      )}
    </>
  );
};

export default Community;

const CommunityBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 50px 0;

  h2 {
    width: 800px;
    margin: 0 auto;
    padding-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 800px;
  margin: 0 auto;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 80%;
    justify-content: space-around;
    align-items: center;
  }
`;

const PostBox = styled.div`
  width: 800px;
  margin: 0 auto;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 800px;
  margin: 0 auto;

  button {
    padding: 10px 20px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;

    button {
      margin-right: 5%;
    }
  }
`;
