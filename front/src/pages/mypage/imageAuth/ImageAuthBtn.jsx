import { ImgInputButton } from "./mypage.style";

const ImageAuthBtn = ({ photoInput, handleUploadImage }) => {
  return (
    <ImgInputButton>
      📷 랜드마크 인증하고 스탬프 찍기!
      <input
        type="file"
        accept="image/*"
        ref={photoInput}
        onChange={handleUploadImage}
      />
    </ImgInputButton>
  );
};

export default ImageAuthBtn;
