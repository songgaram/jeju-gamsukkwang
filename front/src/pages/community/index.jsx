import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dropdown from "./dropdown";

import styled from "styled-components";
import PostList from "./postList";

const Community = () => {
  const navigate = useNavigate();
  const [isSelected, setInSelected] = useState("");

  const dropDownFunction = (itemValue) => {
    setInSelected(itemValue);
  };

  return (
    <CommunityBox>
      <DropdownBox>
        <h2>📌 게시판</h2>
        <Dropdown dropDownFunction={dropDownFunction} />
      </DropdownBox>
      <PostBox>
        <PostList isSelected={isSelected} />
      </PostBox>
      <BottonBox>
        <button type="button" onClick={() => navigate("/community/post")}>
          게시글 작성
        </button>
      </BottonBox>
    </CommunityBox>
  );
};

export default Community;

const CommunityBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const PostBox = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const BottonBox = styled.div`
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
    margin-top: 30px;
  }
`;
