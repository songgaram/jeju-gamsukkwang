import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetTourSearch } from "queries/searchQuery";
import NoResultModal from "../modal/noResultModal";
import { LikesIcon, RatingIcon, ReviewIcon } from "assets/svgs";

import {
  ModalBackground,
  ModalBox,
  Img,
  ContentsBox,
  RatingBox,
  ButtonBox,
} from "./resultModal.style";
import http from "libs/apiController";

const ImageSearchResult = ({ resultName }) => {
  const navigate = useNavigate();
  const { data } = useGetTourSearch(resultName);
  const [resultData, setResultData] = useState(undefined);
  const [reviewData, setReviewData] = useState(undefined);
  const [tourId, setTourId] = useState("");
  const [, setIsNoResultModal] = useState(false);

  useEffect(() => {
    const findData = data?.find((e) => e.krTitle === resultName);
    setResultData(findData);

    if (findData === undefined) {
      setResultData(undefined);
      setIsNoResultModal(true);
      return;
    }
  }, [data, resultName]);

  useEffect(() => {
    if (resultData !== undefined) {
      setTourId(resultData.id);
    }
  }, [resultData]);

  useEffect(() => {
    if (tourId !== "") {
      http.get(`/review/${tourId}/info`).then((res) => setReviewData(res.data));
    }
  }, [tourId]);

  const handleClick = () => {
    navigate(`/landmark/detail/${tourId}`);
  };

  //로딩 state를 추가(로딩 모달같은거)

  if (resultData === undefined || reviewData === undefined)
    return <NoResultModal setIsOpenModal={setIsNoResultModal} />;

  return (
    <ModalBackground>
      <ModalBox>
        <Img src={resultData.image} alt="랜드마크 이미지" />
        <ContentsBox>
          <ul>
            <li>{resultData.krTitle}</li>
            <li>{resultData.address}</li>
          </ul>
          <RatingBox>
            <dl>
              <div>
                <RatingIcon width={25} />
                <dt>별점</dt>
                <dd>{reviewData.avgRating}</dd>
              </div>
              <div>
                <ReviewIcon width={25} />
                <dt>댓글</dt>
                <dd>{reviewData.totalReview}개</dd>
              </div>
              <div>
                <LikesIcon width={25} />
                <dt>좋아요</dt>
                <dd>{resultData.likeCount}개</dd>
              </div>
            </dl>
          </RatingBox>
          <ButtonBox>
            <button onClick={handleClick}>자세히 보기</button>
          </ButtonBox>
        </ContentsBox>
      </ModalBox>
    </ModalBackground>
  );
};

export default ImageSearchResult;
