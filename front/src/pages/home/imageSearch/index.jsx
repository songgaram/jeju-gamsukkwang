import { useCallback } from "react";
import { useRef } from "react";

import http from "libs/apiController";

import { ImageUploadBox, Span } from "./imageSearch.style";

const ImageSearch = () => {
  const photoInput = useRef(null);

  const handleUploadImage = useCallback((e) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append("imgFile", e.target.files[0]);

    try {
      http.post("tour/image", formData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ImageUploadBox>
        📷 이미지로 검색하기
        <input
          type="file"
          accept="image/*"
          ref={photoInput}
          onChange={handleUploadImage}
        />
      </ImageUploadBox>
      <Span>이미지 검색 기능은 jpg 파일만 지원됩니다.</Span>
    </>
  );
};

export default ImageSearch;
