import styled from "styled-components";
import Profile from "./profile";
import Level from "./level";
import Navs from "./Navs";

const MyPage = () => {
  return (
    <>
      <InfoContainer>
        <Profile />
        <Level />
      </InfoContainer>
      <Navs />
      <OutletContainer />
    </>
  );
};

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: -1;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  column-gap: 10%;
  justify-content: center;
  padding: 6rem 15rem;
`;

const OutletContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.skyblue};
  width: 100%;
  border-radius: 45px 45px 0 0;
  height: 300px;
`;

export default MyPage;
