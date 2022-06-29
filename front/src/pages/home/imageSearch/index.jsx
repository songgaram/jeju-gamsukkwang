import { useCallback } from "react";
import { useRef } from "react";

import http from "libs/apiController";

import { ImageUploadBox, Span } from "./imageSearch.style";
import { useState } from "react";
import Loading from "../loading";

const ImageSearch = () => {
  const photoInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadImage = useCallback(async (e) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append("imgFile", e.target.files[0]);

    try {
      setIsLoading(true);
      const res = await http.post("tour/image", formData);

      // res.data.data.summary[0] 감귤이가 찾은 랜드마크 이름
      console.log(res.data.data.summary[0].categoryName);
      setIsLoading(false);
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
      {isLoading && <Loading />}
    </>
  );
};

export default ImageSearch;
