import styled from "styled-components";
import Profile from "./Profile";
import Level from "./Level";
import Navs from "./Navs";
import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetUserState } from "queries/userQuery";

const MyPage = () => {
  const params = useParams();
  const id = params.id;
  const { data } = useGetUserState(id);
  const { email, nickname, experience } = data?.userState || {};
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (experience) {
      setLevel(parseInt(parseInt(experience) / 10));
    }
  }, [experience]);

  useEffect(() => {
    console.log("idex에서 level: ", level);
  });
  return (
    <>
      <InfoContainer>
        <Profile email={email} nickname={nickname} level={level} />
        <Level experience={experience} />
      </InfoContainer>
      <Navs />
      <OutletContainer>{level && <Outlet level={level} />}</OutletContainer>
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
  height: auto;
  border-radius: 45px 45px 0 0;
  padding: 7% 0;
`;

export default MyPage;
