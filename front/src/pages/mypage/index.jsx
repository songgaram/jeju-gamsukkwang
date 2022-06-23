import styled from "styled-components";
import Profile from "./profile";
import Level from "./level";

const MyPage = () => {
  return (
    <InfoContainer>
      <Profile />
      <Level />
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.skyblue};
  width: 100%;
  border-radius: 0 0 45px 45px;
  position: relative;
  z-index: -1;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  column-gap: 10%;
  justify-content: center;
  padding: 6rem 15rem;
`;

export default MyPage;
