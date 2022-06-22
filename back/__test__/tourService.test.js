import { TourService } from "../src/services/TourService";

const tourId = '6a7fb71c-5dbe-4014-9efe-87dfe314dbe8' //제주돌문화공원
const userId = '0715f1ba-23e9-4421-a434-f9504ab9be75' // racer02
let currentLikeCount

describe('Tour Service Logic', () => {
  it('전체 랜드마크 목록을 가져옵니다.', async () => {
    const allLandmarks = await TourService.getAllLandmarks({})

    expect(allLandmarks.length).toEqual(50)
  })

  it('랜드마크 id를 가지고 랜드마크의 상세 정보를 가져옵니다.', async () => {
    const landmark = await TourService.getLandmark({ id: tourId })

    expect(landmark.id).toEqual(tourId)
    expect(landmark.krTitle).toEqual('제주돌문화공원')
    expect(landmark.address).toEqual('제주특별자치도 제주시 조천읍 남조로 2023')
    expect(landmark.description).toEqual('제주의 바람과 신화를 머금은 아름다운 돌을 감상하다')

    currentLikeCount = landmark.likeCount
  })

  it('랜드마크에 좋아요를 추가합니다.', async () => {
    const addResult = await TourService.addLike({
      id: tourId,
      currentUserId: userId
    })

    expect(addResult.likeCount).toEqual(currentLikeCount + 1)
    expect(addResult.likedUsers).toContain( userId )

    currentLikeCount += 1
  })

  it('랜드마크에 좋아요를 삭제합니다.', async () => {
    const removeResult = await TourService.removeLike({
      id: tourId,
      currentUserId: userId
    })

    expect(removeResult.likeCount).toEqual(currentLikeCount - 1)
    expect(removeResult.likedUsers).toEqual(expect.not.arrayContaining([ userId ]))

    currentLikeCount -= 1
  })

  it('좋아요 순으로 랜드마크 목록을 정렬합니다.', async () => {
    const sortByLikeLandmarks = await TourService.sortByLiked({});
    
    const likeArray = sortByLikeLandmarks.map(ele => ele.likeCount)
    const sortArray = likeArray.sort((a, b) => b - a)

    expect(sortByLikeLandmarks.length).toEqual(50)
    expect(sortArray).toEqual(likeArray)
  })

  it('리뷰 수 순으로 랜드마크 목록을 정렬합니다.', async () => {
    const sortByReviewLandmarks = await TourService.sortByLiked({});
    
    const reviewArray = sortByReviewLandmarks.map(ele => ele.totalReview)
    const sortArray = reviewArray.sort((a, b) => b - a)

    expect(sortByReviewLandmarks.length).toEqual(50)
    expect(sortArray).toEqual(reviewArray)
  })

  it('평점 평균 순으로 랜드마크 목록을 정렬합니다.', async () => {
    const sortByRatingLandmarks = await TourService.sortByLiked({});
    
    const ratingArray = sortByRatingLandmarks.map(ele => ele.avgRating)
    const sortArray = ratingArray.sort((a, b) => b - a)

    expect(sortByRatingLandmarks.length).toEqual(50)
    expect(sortArray).toEqual(ratingArray)
  })
})