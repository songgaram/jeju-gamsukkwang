import { UserService } from "../src/services/userService";
import axios from 'axios'
// import "dotenv/config"

const mockUser = { 
  email: 'mockRacer@elice.io', 
  password: '12345678',
  nickname: 'mockRacer'
};

const tourId = '28b8a934-522f-47cf-a009-3b483c74bbaa' //오설록 티 뮤지엄
const point = 30

let userId = ''

describe('User Service Logic', () => {
  // let connection;
  // let db;

  // beforeAll(async () => {
  //   connection = await MongoClient.connect(process.env.MONGODB_URL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   db = await connection.db("jest");
  // });

  // afterAll(async () => {
  //   await connection.close();
  // });

  // const users = db.collection('users');

  it('User를 생성합니다.', async () => {
    const newUser = await UserService.addUser(mockUser);
    userId = newUser.id
    expect(newUser.email).toEqual('mockRacer@elice.io')
    expect(newUser.nickname).toEqual('mockRacer')
    expect(newUser).toHaveProperty("hashedPassword");
  });

  it("User를 조회합니다.", async () => {
    const foundUser = await UserService.findUser({ userId })
    expect(foundUser.email).toEqual('mockRacer@elice.io')
    expect(foundUser.nickname).toEqual('mockRacer')
  })

  it('로그인이 성공하면 토큰을 발급합니다.', async () => {
    const loginResult = await UserService.loginUser({ 
      email: "mockRacer@elice.io",
      password: "12345678"  
    })

    expect(loginResult).toHaveProperty("token");
  })

  it("User를 수정합니다.", async () => {
    const updatedUser = await UserService.setUser({ 
      userId,
      toUpdate: {
        nickname: '수정한 닉네임'
      }
    })
    expect(updatedUser.nickname).toEqual('수정한 닉네임')
  })
  
  it("User의 프로필 이미지를 변경합니다.", async () => {
    const updatedUser = await UserService.setProfileImg({ 
      userId,
      toUpdate: {
        profileImgUrl: '20220622141454_210_lala.jpg'
      }
    })
    expect(updatedUser.profileImgUrl).toEqual('20220622141454_210_lala.jpg')
  })

  it('User가 인증한 랜드마크를 스탬프 배열에 넣어줍니다.', async () => {
    const stampAddUser = await UserService.addStamp({ userId, tourId })
    expect(stampAddUser.stamp).toContain( tourId )
  })

  it('User의 경험치를 업그레이드합니다.', async () => {
    const upgradeUser = await UserService.addExp({ userId, point })
    expect(upgradeUser.experience).toEqual(30)
  })

  it('User를 삭제합니다.', async () => {
    const deleteResult = await UserService.withdrawUser({ userId })
    expect(deleteResult).toEqual("system.success");
  })

});