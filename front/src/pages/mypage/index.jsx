import styled from "styled-components";
import Profile from "./Profile";
import Level from "./Level";
import Navs from "./Navs";
import { Outlet } from "react-router-dom";
import { userState } from "states";
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const curUserState = useRecoilValue(userState);
  const { email, nickname, experience } = curUserState || {};

  return (
    <>
      <InfoContainer>
        <Profile email={email} nickname={nickname} experience={experience} />
        <Level experience={experience} />
      </InfoContainer>
      <Navs />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
};

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  column-gap: 10%;
  justify-content: center;
  padding: 6rem 15rem;
`;

const OutletContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.skyblue};
  width: 100%;
  height: auto;
  border-radius: 45px 45px 0 0;
  padding: 7% 0;
`;

export default MyPage;