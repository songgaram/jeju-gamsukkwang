import { communityModel } from "../../db";
import { CommunityService } from "../communityService";

const mockUserId = "b4f9ab8c-43fa-4bd9-8f82-27a979f7a3a9";
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

describe("Community MVP Test", () => {
  it("말머리가 free인 게시글을 작성한다.", async () => {
    const postMock = {
      loginUserId: mockUserId,
      title: "isTesting",
      content: "isTesting",
      head: "free",
    };
    const newArticle = await CommunityService.addArticle(postMock);
    mockArticleId = newArticle.id;

    expect(newArticle.title).toEqual("isTesting");
    expect(newArticle.content).toEqual("isTesting");
    expect(newArticle.head).toEqual("free");
  });

  it("전체 게시글 목록을 획득하고, 말머리가 free인 게시글 목록을 획득한다", async () => {
    const getArticles = await CommunityService.getArticles({
      getArticles: getMock1,
    });
    const getFrees = await CommunityService.getArticles({
      getArticles: getMock2,
    });

    expect(getArticles.total).toEqual(1);
    expect(getFrees.total).toEqual(1);
  });

  it("작성한 게시글의 제목과 내용, 말머리를 수정한다.", async () => {
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

  it("말머리가 info인 게시글 목록을 획득한다.", async () => {
    const getInfos = await CommunityService.getArticles({
      getArticles: getMock3,
    });

    expect(getInfos.total).toEqual(1);
  });

  it("작성한 게시글의 제목과 내용, 말머리를 수정한다.", async () => {
    const toUpdate = {
      title: "isEditingAgain",
      content: "isEditingAgain",
      head: "question",
    };
    const editedArticle = await CommunityService.setArticle({
      loginUserId: mockUserId,
      articleId: mockArticleId,
      toUpdate,
    });

    expect(editedArticle.title).toEqual("isEditingAgain");
    expect(editedArticle.content).toEqual("isEditingAgain");
    expect(editedArticle.head).toEqual("question");
  });

  it("말머리가 question인 게시글 목록을 획득한다.", async () => {
    const getQuestions = await CommunityService.getArticles({
      getArticles: getMock4,
    });

    expect(getQuestions.total).toEqual(1);
  });

  it("작성자가 아닌 유저가 게시글 수정을 요청할 경우 에러가 발생한다.", async () => {
    const toUpdate = {
      title: "isEditingAgain2",
      content: "isEditingAgain2",
      head: "free",
    };
    try {
      await CommunityService.setArticle({
        loginUserId: "1234444",
        articleId: mockArticleId,
        toUpdate,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.unAuthorized");
    }
  });

  it("수정하려는 게시글이 없을 때, 에러가 발생한다.", async () => {
    const toUpdate = {
      title: "isEditingAgain2",
      content: "isEditingAgain2",
      head: "free",
    };
    try {
      await CommunityService.setArticle({
        loginUserId: mockUserId,
        articleId: "419827598346",
        toUpdate,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticle");
    }
  });

  it("작성한 게시글의 id로 게시글을 볼 수 있다.", async () => {
    const theArticle = await CommunityService.getArticle({
      articleId: mockArticleId,
    });

    expect(theArticle.title).toEqual("isEditingAgain");
    expect(theArticle.content).toEqual("isEditingAgain");
    expect(theArticle.head).toEqual("question");
  });

  it("특정 게시글이 없을 때 그 게시글로 접근하려는 경우, 에러가 발생한다.", async () => {
    try {
      await CommunityService.getArticle({
        articleId: "210953049682457",
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticle");
    }
  });

  it("작성한 게시글에 좋아요를 추가할 수 있다.", async () => {
    const LikedArticle = await CommunityService.addLike({
      articleId: mockArticleId,
      currentUserId: mockUserId,
    });

    expect(LikedArticle.likedUsers.length).toEqual(1);
  });

  it("동일한 글에 중복하여 좋아요 시도를 요청할 경우, 에러가 발생한다.", async () => {
    try {
      await CommunityService.addLike({
        articleId: mockArticleId,
        currentUserId: mockUserId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.alreadyLiked");
    }
  });

  it("존재하지 않는 글에 좋아요 시도를 요청할 경우, 에러가 발생한다.", async () => {
    try {
      await CommunityService.addLike({
        articleId: "123444",
        currentUserId: mockUserId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticle");
    }
  });

  it("이미 좋아요를 한 글에서 좋아요를 삭제할 수 있다.", async () => {
    const HatedArticle = await CommunityService.removeLike({
      articleId: mockArticleId,
      currentUserId: mockUserId,
    });

    expect(HatedArticle.likedUsers.length).toEqual(0);
  });

  it("좋아요를 하지 않은 글에서 좋아요 삭제를 시도할 시 에러가 발생한다.", async () => {
    try {
      await CommunityService.removeLike({
        articleId: mockArticleId,
        currentUserId: mockUserId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noLiked");
    }
  });

  it("존재하지 않는 글에 좋아요 삭제 시도를 요청할 경우, 에러가 발생한다.", async () => {
    try {
      await CommunityService.removeLike({
        articleId: "123444",
        currentUserId: mockUserId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticle");
    }
  });

  it("작성자가 아닌 유저가 게시글 삭제를 요청할 경우, 에러가 발생한다.", async () => {
    try {
      await CommunityService.deleteArticle({
        articleId: mockArticleId,
        loginUserId: "123325403846203596",
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.unAuthorized");
    }
  });

  it("삭제하려는 게시글이 없을 경우, 에러가 발생한다.", async () => {
    try {
      await CommunityService.deleteArticle({
        articleId: "1046581039456094357",
        loginUserId: mockUserId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticle");
    }
  });

  it("작성한 게시글을 삭제한다.", async () => {
    const res = await CommunityService.deleteArticle({
      loginUserId: mockUserId,
      articleId: mockArticleId,
    });

    expect(res).toEqual("system.success");
  });

  it("예기치 못한 오류가 발생할 경우, 에러가 발생한다", async () => {
    communityModel.findById = jest.fn().mockResolvedValue({
      id: mockArticleId,
      userId: mockUserId,
    });
    communityModel.deleteById = jest
      .fn()
      .mockImplementation(() => Promise.reject("오류 발생"));

    try {
      await CommunityService.deleteArticle({
        loginUserId: mockUserId,
        articleId: mockArticleId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.fail");
    }
  });

  it("어떤 게시글도 없다면, 그 목록을 획득하려 할 때 에러가 발생한다.", async () => {
    try {
      await CommunityService.getArticles({ getArticles: getMock1 });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticles");
    }
  });

  it("말머리가 free인 게시글이 없다면, 그 목록을 획득하려 할 때 에러가 발생한다.", async () => {
    try {
      await CommunityService.getArticles({ getArticles: getMock2 });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticles");
    }
  });

  it("말머리가 info인 게시글이 없다면, 그 목록을 획득하려 할 때 에러가 발생한다.", async () => {
    try {
      await CommunityService.getArticles({ getArticles: getMock3 });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticles");
    }
  });

  it("말머리가 question인 게시글이 없다면, 그 목록을 획득하려 할 때 에러가 발생한다.", async () => {
    try {
      await CommunityService.getArticles({ getArticles: getMock4 });
    } catch (err) {
      expect(err.message).toEqual("system.error.noArticles");
    }
  });
});
