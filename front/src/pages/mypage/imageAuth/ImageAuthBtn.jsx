import { ImgInputButton, Span } from "./imageAuth.style";

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
        ✓ 이미지 검색 기능은 jpg 파일만 지원됩니다.
        <br />✓ 건물 랜드마크일 경우에는 입구를 찍어주세요.
      </Span>
    </>
  );
};

export default ImageAuthBtn;
