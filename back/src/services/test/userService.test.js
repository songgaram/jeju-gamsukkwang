import { userModel } from "../../db"
import { UserService } from "../userService";

const mockUser = { 
  email: "mockRacer2@elice.io", 
  password: "12345678",
  nickname: "mockRacer2"
};

const realFunction = userModel.deleteById // mock 함수로 변경됐을 경우를 대비해 원래 기능을 상수로 저장

const tourId = "81cd8ae4-044e-42bc-ba1f-6108d192edc3" // 여미지 식물원
const point = 30
let userId = ""

describe("User Service Logic", () => {

  // user 생성 기능 관련 테스트
  it("새로운 User를 생성해야 합니다.", async () => {
    const newUser = await UserService.addUser(mockUser)
    userId = newUser.id

    expect(newUser.email).toEqual("mockRacer2@elice.io")
    expect(newUser.nickname).toEqual("mockRacer2")
  });

  it("중복된 이메일을 가진 user는 생성할 수 없습니다.", async () => {
    try{
      await UserService.addUser(mockUser)
    } catch(err) {
      expect(err.message).toBe("system.error.duplicatedEmail")
    }
  })

  it("중복된 닉네임을 가진 user는 생성할 수 없습니다.", async () => {
    userModel.isEmailExist = jest.fn().mockResolvedValue(true)

    try{
      await UserService.addUser(mockUser)
    } catch(err) {
      expect(err.message).toBe("system.error.duplicatedNickname")
    }
  })

  // user 조회 기능 관련 테스트
  it("해당 User의 상세 정보를 조회해야 합니다.", async () => {
    const foundUser = await UserService.findUser({ userId })

    expect(foundUser.email).toEqual("mockRacer2@elice.io")
    expect(foundUser.nickname).toEqual("mockRacer2")
  })

  it("조회하려는 User가 존재하지 않으면 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.findUser({ userId: "notExistingId" })
    } catch(err){
      expect(err.message).toBe("system.error.noUser")
    }
  })

  // 로그인 기능 관련 테스트
  it("로그인이 성공하면 토큰을 발급해야 합니다.", async () => {
    const loginResult = await UserService.loginUser({ 
      email: "mockRacer2@elice.io",
      password: "12345678"  
    })

    expect(loginResult).toHaveProperty("token");
  })

  it("해당 user가 존재하지 않으면 로그인에 실패해야 합니다.", async () => {
    try{
      await UserService.loginUser({
        email: "fake@elice.io",
        password: "fake1234"
      })
    } catch(err) {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe("system.error.noUser")
    }
  }) 

  it("로그인 시 비밀번호를 틀리면 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.loginUser({
        email: "mockRacer2@elice.io",
        password: "incorrectPassword"
      })
    } catch(err){
      expect(err.message).toBe("system.error.differentPassword")
    }
  })

  // user 수정 기능 관련 테스트
  it("해당 User의 닉네임을 수정해야 합니다.", async () => {
    const updatedUser = await UserService.setUser({ 
      userId,
      toUpdate: {
        nickname: "수정한 닉네임"
      }
    })

    expect(updatedUser.nickname).toEqual("수정한 닉네임")
  })

  it("수정하려는 User가 존재하지 않다면 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.setUser({
        userId: "notExistingId",
        toUpdate: {
          nickname: "수정한 닉네임"
        }
      })
    } catch(err){
      expect(err.message).toBe("system.error.noUser")
    }
  })

  it("수정하려는 User의 닉네임이 이미 사용중이기 때문에 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.setUser({ 
        userId,
        toUpdate: {
          nickname: "mockRacer"
        }
      })
    } catch(err){
      expect(err.message).toEqual("system.error.duplicatedNickname")
    }
  })
  
  // 프로필 이미지 변경 기능 관련 테스트
  it("해당 User의 프로필 이미지를 변경해야 합니다.", async () => {
    const updatedUser = await UserService.setProfileImg({ 
      userId,
      toUpdate: {
        profileImgUrl: "20220622141454_210_lala.jpg"
      }
    })
    expect(updatedUser.profileImgUrl).toEqual("20220622141454_210_lala.jpg")
  })

  it("프로필 이미지를 변경할 User가 존재하지 않다면 에러가 발생해야 합니다.", async () => {
    try{
        await UserService.setProfileImg({ 
        userId: "notExistingId",
        toUpdate: {
          profileImgUrl: "20220622141454_210_lala.jpg"
        }
      })
    } catch(err){
      expect(err.message).toBe("system.error.noUser")
    }
  })

  // 스탬프 추가 기능 관련 테스트
  it("해당 User가 인증한 랜드마크를 스탬프에 넣어줘야 합니다.", async () => {
    const stampAddUser = await UserService.addStamp({ userId, tourId })
    expect(stampAddUser.stamp).toContain( tourId )
  })

  it("스탬프를 넣어줄 User가 존재하지 않다면 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.addStamp({ userId: "notExistingId", tourId })
    } catch(err){
      expect(err.message).toBe("system.error.noUser")
    }
  })

  it("User가 인증한 랜드마크가 db에 존재하지 않다면 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.addStamp({ userId, tourId: "notExistingId" })
    } catch(err){
      expect(err.message).toBe("system.error.noSuchTourId")
    }
  })

  it("이미 User가 인증한 랜드마크는 다시 스탬프에 넣을 수 없습니다.", async () => {
    try{
      await UserService.addStamp({ userId, tourId })
    } catch(err){
      expect(err.message).toBe("system.error.alreadyStamped")
    }
  })

  // 경험치 증가 기능 관련 테스트
  it("해당 User의 경험치를 증가시켜야 합니다.", async () => {
    const upgradeUser = await UserService.addExp({ userId, point })
    expect(upgradeUser.experience).toEqual(30)
  })

  it("경험치를 증가시킬 User가 존재하지 않다면 에러가 발생해야 합니다.", async () => {
    try{
      await UserService.addExp({ userId: "notExistingId", point })
    }catch(err){
      expect(err.message).toBe("system.error.noUser")
    }    
  })

  // user 삭제 기능 관련 테스트
  it("삭제하려는 User가 존재하지 않다면 에러를 발생해야 합니다.", async () => {
    try{
      await UserService.withdrawUser({ userId: "notExistingId" })
    }catch(err){
      expect(err.message).toBe("system.error.noUser")
    }
  })

  it("User를 삭제하려는 함수에서 오류가 생기면 에러를 발생시킵니다.", async () => {
    userModel.deleteById = jest.fn().mockImplementation(() => Promise.reject("오류발생!"));

    try{
      await UserService.withdrawUser({ userId })
    } catch(err) {
      expect(err.message).toBe("system.error.fail")
    }
  })

  it("해당 User를 삭제해야 합니다.", async () => {
    userModel.deleteById = realFunction

    const deleteResult = await UserService.withdrawUser({ userId })
    expect(deleteResult).toEqual("system.success");
  })

});