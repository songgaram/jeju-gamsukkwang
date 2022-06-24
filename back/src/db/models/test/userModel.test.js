import { userModel } from "../../../db"

const nickname = "mockRacer"

describe("User Model Logic", () => {

  it("닉네임으로 User를 조회할 수 있다.", async () => {
    const foundUser = await userModel.findByNickname({ nickname })

    expect(foundUser.nickname).toEqual("mockRacer")
    expect(foundUser.email).toEqual("mockRacer@elice.io")
  })

  it("모든 User를 조회할 수 있다.", async () => {
    const users = await userModel.findAll()

    expect(users.length).toEqual(1)
  })

})