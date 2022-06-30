import { TourService } from "../tourService";

const tourId = "81cd8ae4-044e-42bc-ba1f-6108d192edc3"; // 여미지 식물원
const userId = "b4f9ab8c-43fa-4bd9-8f82-27a979f7a3a9"; // mockRacer

let currentLikeCount;

describe("Tour Service Logic", () => {
  // 목록 기능 관련 테스트
  it("전체 랜드마크 목록을 가져옵니다.", async () => {
    const allLandmarks = await TourService.getAllLandmarks({});

    expect(allLandmarks.length).toEqual(3);
  });

  // 조회 기능 관련 테스트
  it("랜드마크 id를 가지고 랜드마크의 상세 정보를 가져옵니다.", async () => {
    const landmark = await TourService.getLandmark({ id: tourId });

    expect(landmark.id).toEqual(tourId);
    expect(landmark.krTitle).toEqual("여미지식물원");
    expect(landmark.address).toEqual("제주특별자치도 서귀포시 중문관광로 93");
    expect(landmark.description).toEqual(
      "마음의 안식을 주는 동양 최대의 온실 식물원",
    );

    currentLikeCount = landmark.likeCount;
  });

  it("존재하지 않는 랜드마크를 조회한다면 에러를 발생해야 합니다.", async () => {
    try {
      await TourService.getLandmark({ id: "notExistingId" });
    } catch (err) {
      expect(err.message).toBe("system.error.noLandmark");
    }
  });

  // 좋아요 추가 기능 관련 테스트
  it("랜드마크에 좋아요를 추가합니다.", async () => {
    const addResult = await TourService.addLike({
      id: tourId,
      currentUserId: userId,
    });

    expect(addResult.likeCount).toEqual(currentLikeCount + 1);
    expect(addResult.likedUsers).toContain(userId);

    currentLikeCount += 1;
  });

  it("랜드마크에 좋아요를 추가하려는 User가 존재하지 않는 유저라면 에러를 발생시켜야 합니다.", async () => {
    try {
      await TourService.addLike({
        id: tourId,
        currentUserId: "notExistingId",
      });
    } catch (err) {
      expect(err.message).toBe("system.error.noUser");
    }
  });

  it("좋아요를 추가하려는 랜드마크가 존재하지 않다면 에러를 발생시켜야 합니다.", async () => {
    try {
      await TourService.addLike({
        id: "notExistingId",
        currentUserId: userId,
      });
    } catch (err) {
      expect(err.message).toBe("system.error.noLandmark");
    }
  });

  it("User가 이미 좋아요를 한 랜드마크라면 다시 좋아요를 추가할 수 없습니다.", async () => {
    try {
      await TourService.addLike({
        id: tourId,
        currentUserId: userId,
      });
    } catch (err) {
      expect(err.message).toBe("system.error.alreadyLiked");
    }
  });

  // 좋아요 삭제 기능 관련 테스트
  it("좋아요를 삭제하려는 User가 존재하지 않는 유저라면 에러를 발생시켜야 합니다.", async () => {
    try {
      await TourService.removeLike({
        id: tourId,
        currentUserId: "notExistingId",
      });
    } catch (err) {
      expect(err.message).toBe("system.error.noUser");
    }
  });

  it("좋아요를 삭제하려는 랜드마크가 존재하지 않다면 에러를 발생시켜야 합니다.", async () => {
    try {
      await TourService.removeLike({
        id: "notExistingId",
        currentUserId: userId,
      });
    } catch (err) {
      expect(err.message).toBe("system.error.noLandmark");
    }
  });

  it("랜드마크에 좋아요를 삭제합니다.", async () => {
    const removeResult = await TourService.removeLike({
      id: tourId,
      currentUserId: userId,
    });

    expect(removeResult.likeCount).toEqual(currentLikeCount - 1);
    expect(removeResult.likedUsers).toEqual(
      expect.not.arrayContaining([userId]),
    );

    currentLikeCount -= 1;
  });

  it("User가 좋아요를 하지 않았거나, 이미 좋아요를 삭제한 랜드마크라면 다시 삭제를 할 수 없습니다.", async () => {
    try {
      await TourService.removeLike({
        id: tourId,
        currentUserId: userId,
      });
    } catch (err) {
      expect(err.message).toBe("system.error.noLiked");
    }
  });

  // 목록 정렬 기능 관련 테스트
  it("좋아요 순으로 랜드마크 목록을 정렬합니다.", async () => {
    const sortByLikeLandmarks = await TourService.sortBy({ criteria: "like" });

    const likeArray = sortByLikeLandmarks.map((ele) => ele.likeCount);
    const sortArray = likeArray.sort((a, b) => b - a);

    expect(sortByLikeLandmarks.length).toEqual(3);
    expect(sortArray).toEqual(likeArray);
  });

  it("리뷰 수 순으로 랜드마크 목록을 정렬합니다.", async () => {
    const sortByReviewLandmarks = await TourService.sortBy({
      criteria: "review",
    });

    const reviewArray = sortByReviewLandmarks.map((ele) => ele.totalReview);
    const sortArray = reviewArray.sort((a, b) => b - a);

    expect(sortByReviewLandmarks.length).toEqual(3);
    expect(sortArray).toEqual(reviewArray);
  });

  it("평점 평균 순으로 랜드마크 목록을 정렬합니다.", async () => {
    const sortByRatingLandmarks = await TourService.sortBy({
      criteria: "rating",
    });

    const ratingArray = sortByRatingLandmarks.map((ele) => ele.avgRating);
    const sortArray = ratingArray.sort((a, b) => b - a);

    expect(sortByRatingLandmarks.length).toEqual(3);
    expect(sortArray).toEqual(ratingArray);
  });

  // 검색 기능 관련 테스트
  it("이름으로 랜드마크를 검색합니다.", async () => {
    const searchLandmark = await TourService.searchLandmark({ name: "제주" });
    const landmarkName = searchLandmark.map((ele) => ele.krTitle);

    expect(landmarkName).toContain("제주돌문화공원");
    expect(landmarkName).toContain("제주유리의성");
  });

  it("검색하고자 한 랜드마크가 존재하지 않다면 에러가 발생합니다.", async () => {
    try {
      await TourService.searchLandmark({ name: "서울" });
    } catch (err) {
      expect(err.message).toBe("system.error.noLandmark");
    }
  });
});
