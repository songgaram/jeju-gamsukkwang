### BE

## 실행
```
패키지 설치 : yarn install

실행 : yarn start
테스트 : yarn test
무결성 %율 테스트 : yarn coverage
```

## 코드 커버리지 현황
```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   99.78 |    97.97 |   98.52 |   99.77 |                   
 config               |     100 |      100 |     100 |     100 |                   
  jwt.js              |     100 |      100 |     100 |     100 |                   
 db                   |   88.88 |       50 |      50 |    87.5 | 
  index.js            |   88.88 |       50 |      50 |    87.5 | 21
 db/models            |     100 |      100 |     100 |     100 | 
  communityModel.js   |     100 |      100 |     100 |     100 | 
  reviewModel.js      |     100 |      100 |     100 |     100 | 
  tourModel.js        |     100 |      100 |     100 |     100 | 
  userModel.js        |     100 |      100 |     100 |     100 | 
 db/schemas           |     100 |      100 |     100 |     100 | 
  community.js        |     100 |      100 |     100 |     100 | 
  review.js           |     100 |      100 |     100 |     100 | 
  tour.js             |     100 |      100 |     100 |     100 | 
  user.js             |     100 |      100 |     100 |     100 | 
 services             |     100 |      100 |     100 |     100 | 
  communityService.js |     100 |      100 |     100 |     100 | 
  reviewService.js    |     100 |      100 |     100 |     100 |
  tourService.js      |     100 |      100 |     100 |     100 |
  userService.js      |     100 |      100 |     100 |     100 |
 validators           |     100 |      100 |     100 |     100 |
  index.js            |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------
* db/index.js의 21 Line은 mongoDB와 연결되지 않았을 때와 관계된 Line이라 따로 처리하지 않았음.
```

## 폴더 구조
```
back
├── src
│    ├── db
│    │    ├── models
│    │    │     ├── communityModel.js
│    │    │     ├── reviewModel.js
│    │    │     ├── tourModel.js
│    │    │     └── userModel.js
│    │    ├── schemas
│    │    │     ├── community.js
│    │    │     ├── review.js
│    │    │     ├── tour.js
│    │    │     └── user.js
│    │    └── index.js
│    ├── middlewares
│    │    ├── index.js
│    │    ├── badRequest.js
│    │    ├── errorMiddleware.js
│    │    ├── loginRequired.js
│    │    └── multerS3.js
│    ├── routers
│    │    ├── communityRouter.js
│    │    ├── getLandmark.js
│    │    ├── index.js
│    │    ├── reviewRouter.js
│    │    ├── tourRouter.js
│    │    └── userRouter.js
│    ├── services
│    │    ├── test
│    │    │     ├── communityService.test.js
│    │    │     ├── reviewService.test.js
│    │    │     ├── tourService.test.js
│    │    │     └── userService.test.js
│    │    ├── communityService.js
│    │    ├── reviewService.js
│    │    ├── tourService.js
│    │    └── userSerivce.js
│    ├── swagger
│    │    ├── Com.yaml
│    │    ├── Review.yaml
│    │    ├── Tour.yaml
│    │    ├── User.yaml
│    │    └── index.js
│    ├── validators
│    │    └── index.js
│    └── app.js
└── index.js
```
