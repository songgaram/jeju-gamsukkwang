# BE

### 실행
```
패키지 설치 : yarn install

실행 : yarn start
테스트 : yarn test
코드 커버리지 테스트 : yarn coverage
```

### 코드 커버리지 현황
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
* db/index.js의 21th Line은 mongoDB와 연결되지 않았을 때와 관계된 Line이라 따로 처리하지 않았음.
```

### 폴더 구조
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

### 기술 스택/패키지
```
"dependencies": {
    "aws-sdk": "^2.1097.0",
    "axios": "^0.27.2",
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "exifr": "^7.1.3",
    "express": "^4.18.1",
    "joi": "^17.6.0",
    "joi-password": "^3.0.1",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.3",
    "mongoose": "^6.3.5",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^2.10.0",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.17.10",
    "@babel/core": "^7.18.2",
    "@babel/node": "^7.17.10",
    "@babel/plugin-transform-runtime": "^7.18.2",
    "@babel/preset-env": "^7.18.2",
    "cross-env": "^7.0.3",
    "dotenv": "^16.0.1",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^28.1.1",
    "nodemon": "^2.0.16",
    "path": "^0.12.7",
    "prettier": "^2.7.1",
    "swagger-jsdoc": "^6.2.1",
    "swagger-ui-express": "^4.4.0"
```
