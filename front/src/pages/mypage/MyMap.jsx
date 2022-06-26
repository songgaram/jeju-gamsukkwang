import MapImg from "assets/images/MapImg.png";
import styled from "styled-components";

const MyMap = () => {
  return (
    <MapContainer>
      <MapBackground src={MapImg} />
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
