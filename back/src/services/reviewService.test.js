import { ReviewService } from "./reviewService";
import "dotenv/config";
import { MongoClient } from "mongodb";

const DB_URL = process.env.MONGODB_URL;

const mockUserId = "f26ea3b5-8e4e-4c0e-930f-882507f48538";
const mockTourId = "46748ca6-4a6d-4ed7-bef7-4f40452f6fa0";
const getMock = {
  tourId: mockTourId,
  page: 1,
  limit: 10,
};
let mockReviewId = "";

describe("Review MVP Test : 정상 작동 시", () => {
  let connection;
  let db;
  let initialReviews;
  let initialReviewInfo;

  beforeAll(async () => {
    connection = await MongoClient.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("jest");
    initialReviews = await ReviewService.getReviews({ getReviews: getMock });
    initialReviewInfo = await ReviewService.getReviewInfo({
      tourId: mockTourId,
    });
  });

  afterAll(async () => {
    await connection.close();
    if (db.close) {
      await db.close();
    }
  });

  it("/GET : 특정 랜드마크의 전체 리뷰 획득", async () => {
    const getReviews = await ReviewService.getReviews({ getReviews: getMock });

    expect(getReviews.total).toEqual(initialReviews.total);
    expect(getReviews.totalPage).toEqual(initialReviews.totalPage);
    expect(getReviews.reviews).toEqual(initialReviews.reviews);
  });

  it("/GET : 특정 랜드마크의 리뷰 요약 정보 획득", async () => {
    const getReviewInfo = await ReviewService.getReviewInfo({
      tourId: mockTourId,
    });

    expect(getReviewInfo.totalReview).toEqual(initialReviewInfo.totalReview);
    expect(getReviewInfo.avgRating).toEqual(initialReviewInfo.avgRating);
    expect(getReviewInfo.starRating).toEqual(initialReviewInfo.starRating);
  });

  it("/POST: 특정 랜드마크에 리뷰 작성", async () => {
    const addMock = {
      loginUserId: mockUserId,
      tourId: mockTourId,
      content: "isTesting",
      rating: 5,
    };
    const addReview = await ReviewService.addReview(addMock);
    const getReviews = await ReviewService.getReviews({ getReviews: getMock });
    mockReviewId = addReview.id;

    expect(getReviews.total).toEqual(initialReviews.total + 1);
    expect(addReview.content).toEqual("isTesting");
    expect(addReview.rating).toEqual(5);
  });

  it("/PUT : 특정 리뷰 수정", async () => {
    const putMock = {
      loginUserId: mockUserId,
      reviewId: mockReviewId,
      toUpdate: {
        content: "isEditing",
        rating: 4,
      },
    };
    const setReview = await ReviewService.setReview(putMock);

    expect(setReview.content).toEqual("isEditing");
    expect(setReview.rating).toEqual(4);
  });

  it("/DELETE : 특정 리뷰 삭제", async () => {
    await ReviewService.deleteReview({
      loginUserId: mockUserId,
      reviewId: mockReviewId,
    });
    const getReviews = await ReviewService.getReviews({ getReviews: getMock });

    expect(getReviews.total).toEqual(initialReviews.total);
  });
});
