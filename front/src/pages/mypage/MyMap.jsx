import MapImg from "assets/images/MapImg.png";
import styled from "styled-components";

const MyMap = () => {
  return <MapBackground />;
};

const MapBackground = styled.div`
  background-image: url(${MapImg});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;
export default MyMap;
