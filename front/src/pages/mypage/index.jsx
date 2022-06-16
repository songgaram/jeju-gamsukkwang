import styled from "styled-components";
import Profile from "./profile";
import Level from "./level";

const MyPage = () => {
  return (
    <InfoContainer>
      <Profile></Profile>
      <Level></Level>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  background-color: #e3f1fb;
  width: 100%;
  border-radius: 0 0 45px 45px;
  position: relative;
  z-index: -1;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  justify-content: center;
  padding: 6rem 15rem;
`;

export default MyPage;
