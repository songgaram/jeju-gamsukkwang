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

const MyMap = () => {
  return (
    <MapContainer>
      <MapBackground src={MapImg} />
      <StampImgLv1 src={StampLv1} />
      <StampImgLv2 src={StampLv2} />
      <StampImgLv3 src={StampLv3} />
      <StampImgLv4 src={StampLv4} />
      <StampImgLv5 src={StampLv5} />
      <StampImgLv6 src={StampLv6} />
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
