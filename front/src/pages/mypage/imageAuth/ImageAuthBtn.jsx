import { ImgInputButton, Span } from "./imageAuth.style";
import styled from "styled-components";

const ImageAuthBtn = ({ photoInput, handleUploadImage }) => {
  return (
    <>
      <ImgInputButton>
        📷 랜드마크 인증하고 스탬프 찍기!
        <input
          type="file"
          accept="image/*"
          ref={photoInput}
          onChange={handleUploadImage}
        />
      </ImgInputButton>
      <Span>
        ✓ 이미지 검색 기능은 <Emphasized>jpg 파일</Emphasized>만 지원됩니다.
        <br />✓ 파일명 <Emphasized>한글</Emphasized>은 지원하지 않으며,
        특수문자의 경우 <Emphasized>~ . - _</Emphasized> 만 가능합니다.
        <br />✓ 건물일 경우 전체가 다 보이게, 테마공원의 경우 입구를 찍어주세요!
      </Span>
    </>
  );
};

const Emphasized = styled.span`
  font-weight: 700;
`;

export default ImageAuthBtn;
