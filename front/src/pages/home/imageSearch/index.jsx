import { useCallback, useState, useRef } from "react";

import http from "libs/apiController";
import Loading from "../modal/loading";
import ImageSearchResult from "../imageSearchResult";
import ModalPortal from "components/modal/modalPortal";
import Modal from "components/modal";

import { ImageUploadBox, Span } from "./imageSearch.style";
import NoResultModal from "../modal/noResultModal";

const ImageSearch = () => {
  const photoInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);
  const [isNoResultModal, setIsNoResultModal] = useState(false);
  const [resultName, setResultName] = useState("");

  const handleUploadImage = useCallback(async (e) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append("imgFile", e.target.files[0]);

    try {
      setIsLoading(true);

      const res = await http.post("tour/image", formData);

      setResultName(res.data.data.summary[0].categoryName);

      setIsLoading(false);

      if (parseInt(res.data.data.summary[0].percentage) >= 65) {
        setIsResultModal(true);
      }
      setIsNoResultModal(true);
    } catch (error) {
      setIsLoading(false);
      setIsErrorModal(true);
    }
  }, []);

  return (
    <>
      <ImageUploadBox>
        📷 이미지로 검색하기
        <input
          type="file"
          accept="image/jpg, image/jpeg"
          ref={photoInput}
          onChange={handleUploadImage}
        />
      </ImageUploadBox>
      <Span>이미지 검색 기능은 jpg & jpeg 파일만 지원됩니다.</Span>
      <Span>
        파일명은 한글을 지원하지 않으며, 특수문자의 경우 ~ . - _ 만 가능합니다.
      </Span>
      <Span>
        건물일 경우 전체가 다 보이게, 테마공원의 경우 입구를 찍어주세요
      </Span>
      <ModalPortal>
        {isLoading && <Loading />}
        {isResultModal && <ImageSearchResult resultName={resultName} />}
        {isNoResultModal && !isResultModal && (
          <NoResultModal setIsOpenModal={setIsNoResultModal} />
        )}
        {isErrorModal && (
          <Modal
            setIsOpenModal={setIsErrorModal}
            modalMessage="안내문구를 다시 확인해주세요."
          />
        )}
      </ModalPortal>
    </>
  );
};

export default ImageSearch;
