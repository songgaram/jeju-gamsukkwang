import { CommunityService } from "./communityService";
import "dotenv/config";
import { MongoClient } from "mongodb";

const DB_URL = process.env.MONGODB_URL;
const mockUserId = "f26ea3b5-8e4e-4c0e-930f-882507f48538";

const getMock1 = {
  page: 1,
  limit: 10,
  head: "",
};

const getMock2 = {
  page: 1,
  limit: 10,
  head: "free",
};

const getMock3 = {
  page: 1,
  limit: 10,
  head: "info",
};

const getMock4 = {
  page: 1,
  limit: 10,
  head: "question",
};

let mockArticleId = "";

describe("Community MVP Test : 정상 작동 시", () => {
  let connection;
  let db;
  let initialArticles;
  let initialFrees;
  let initialInfos;
  let initialQuestions;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    initialArticles = await CommunityService.getArticles({
      getArticles: getMock1,
    });
    initialFrees = await CommunityService.getArticles({
      getArticles: getMock2,
    });
    initialInfos = await CommunityService.getArticles({
      getArticles: getMock3,
    });
    initialQuestions = await CommunityService.getArticles({
      getArticles: getMock4,
    });
  });

  afterAll(async () => {
    await connection.close();
    if (db.close) {
      await db.close();
    }
  });

  it("/GET : 전체 게시글 목록 획득", async () => {
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock1,
    });

    expect(getArticles.total).toEqual(initialArticles.total);
    expect(getArticles.totalPage).toEqual(initialArticles.totalPage);
    expect(getArticles.articles).toEqual(initialArticles.articles);
  });

  it("/GET : 말머리가 free인 게시글 목록 획득", async () => {
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock2,
    });

    expect(getArticles.total).toEqual(initialFrees.total);
    expect(getArticles.totalPage).toEqual(initialFrees.totalPage);
    expect(getArticles.articles).toEqual(initialFrees.articles);
  });

  it("/GET : 말머리가 info인 게시글 목록 획득", async () => {
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock3,
    });

    expect(getArticles.total).toEqual(initialInfos.total);
    expect(getArticles.totalPage).toEqual(initialInfos.totalPage);
    expect(getArticles.articles).toEqual(initialInfos.articles);
  });

  it("/GET : 말머리가 question인 게시글 목록 획득", async () => {
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock4,
    });

    expect(getArticles.total).toEqual(initialQuestions.total);
    expect(getArticles.totalPage).toEqual(initialQuestions.totalPage);
    expect(getArticles.articles).toEqual(initialQuestions.articles);
  });

  it("/POST : 게시글을 작성", async () => {
    const postMock = {
      loginUserId: mockUserId,
      title: "isTesting",
      content: "isTesting",
      head: "free",
    };
    const newArticle = await CommunityService.addArticle(postMock);
    mockArticleId = newArticle.id;
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock1,
    });

    expect(newArticle.title).toEqual("isTesting");
    expect(newArticle.content).toEqual("isTesting");
    expect(newArticle.head).toEqual("free");
    expect(getArticles.total).toEqual(initialArticles.total + 1);
  });

  it("/GET : 막 작성한 게시글에 접근", async () => {
    const newArticle = await CommunityService.getArticle({
      articleId: mockArticleId,
    });

    expect(newArticle.id).toEqual(mockArticleId);
  });

  it("/PUT : 막 작성한 게시글의 제목과 내용, 말머리를 수정", async () => {
    const toUpdate = {
      title: "isEditing",
      content: "isEditing",
      head: "info",
    };
    const editedArticle = await CommunityService.setArticle({
      loginUserId: mockUserId,
      articleId: mockArticleId,
      toUpdate,
    });

    expect(editedArticle.title).toEqual("isEditing");
    expect(editedArticle.content).toEqual("isEditing");
    expect(editedArticle.head).toEqual("info");
  });

  it("/PUT : 막 작성한 게시글에 좋아요 추가", async () => {
    const LikedArticle = await CommunityService.addLike({
      articleId: mockArticleId,
      currentUserId: mockUserId,
    });

    expect(LikedArticle.likedUsers.length).toEqual(1);
  });

  it("/PUT : 막 작성한 게시글에 좋아요 삭제", async () => {
    const HatedArticle = await CommunityService.removeLike({
      articleId: mockArticleId,
      currentUserId: mockUserId,
    });

    expect(HatedArticle.likedUsers.length).toEqual(0);
  });

  it("/DELETE : 막 작성한 게시글을 삭제", async () => {
    await CommunityService.deleteArticle({
      articleId: mockArticleId,
      loginUserId: mockUserId,
    });
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock1,
    });

    expect(getArticles.total).toEqual(initialArticles.total);
  });
});
