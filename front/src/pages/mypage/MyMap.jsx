import MapImg from "assets/images/MapImg.png";
import styled from "styled-components";
import StampLv1 from "assets/images/StampLv1.png";
import StampLv2 from "assets/images/StampLv2.png";
import StampLv3 from "assets/images/StampLv3.png";
import StampLv4 from "assets/images/StampLv4.png";
import StampLv5 from "assets/images/StampLv5.png";
import StampLv6 from "assets/images/StampLv6.png";
import {
  StampImgLv1,
  StampImgLv2,
  StampImgLv3,
  StampImgLv4,
  StampImgLv5,
  StampImgLv6,
} from "./mypage.style";
import { userState } from "states";
import { useRecoilValue } from "recoil";

const MyMap = () => {
  const curUserState = useRecoilValue(userState);
  const { experience } = curUserState || {};
  const level = parseInt(parseInt(experience) / 10);

  return (
    <MapContainer>
      <MapBackground src={MapImg} />
      <StampImgLv1 level={level} src={StampLv1} />
      <StampImgLv2 level={level} src={StampLv2} />
      <StampImgLv3 level={level} src={StampLv3} />
      <StampImgLv4 level={level} src={StampLv4} />
      <StampImgLv5 level={level} src={StampLv5} />
      <StampImgLv6 level={level} src={StampLv6} />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MapBackground = styled.img`
  width: 70%;
  height: auto;
  position: relative;
`;

export default MyMap;
