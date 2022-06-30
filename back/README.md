### BE

## 실행
```
패키지 설치 : yarn install

실행 : yarn start
테스트 : yarn test
무결성 %율 테스트 : yarn coverage
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
│    └ app.js
└ index.js
```
