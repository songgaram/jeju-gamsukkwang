/*global kakao*/
import React, { useEffect } from "react";
import "./index.css";
import styled from "styled-components";

const Map = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.27, 126.61),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      "제주특별자치도 서귀포시 효돈순환로 441",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);

          // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var content =
            '<div class="customoverlay">' +
            `  <a href="https://map.kakao.com/link/map/${
              result[0].y + "," + result[0].x
            }" target="_blank">` +
            '    <span class="title">감귤박물관</span>' +
            "  </a>" +
            "</div>";

          // 커스텀 오버레이가 표시될 위치입니다
          var position = coords;

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: position,
            content: content,
            yAnchor: 1,
          });
        }
      },
    );
  }, []);

  return (
    <MapContainer>
      <Span>
        지도로 길찾기
        <p> 클릭하시면 Kakao 지도로 연결됩니다!</p>
      </Span>
      <div
        id="map"
        style={{ width: "80%", maxWidth: "90%", height: "400px" }}
      />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 600;
  text-align: center;
  margin-top: 50px;

  & > p {
    background: linear-gradient(#fff 50%, rgba(255, 136, 29, 60%) 50%);
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 400;
    margin: 15px 0;
  }
`;

export default Map;
