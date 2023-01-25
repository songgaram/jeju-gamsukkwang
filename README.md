# 제주감수꽝

![image](https://user-images.githubusercontent.com/96907766/184669073-86c9d46f-a1c0-4053-b29e-4f53b0046ea3.png) <br>
-   제주 랜드마크 추천 및 공유 AI 웹 서비스


## 프로젝트 구성 안내
**목차**
1. [프로젝트 소개](#프로젝트-소개)
2. [프로젝트 위키](#프로젝트-위키)
3. [프로젝트 구성도](#프로젝트-구성도)
4. [프로젝트 기능 설명](#프로젝트-기능-설명)
5. [프로젝트 팀원](#프로젝트-팀원)
6. [인공지능 모델 학습](#인공지능-모델-학습)
7. [버전](#버전)

## 프로젝트 소개

### 핵심 서비스
 
- 제주도의 관광 랜드마크를 지도 위에 표시하여 사용자의 접근성을 용이하게 하고, 클릭 시 관광 랜드마크와 관련된 정보를 사용자에게 제공
- 제주도와 관련된 여러 이미지들을 업로드 시, 서비스에 탑재한 인공지능이 이미지를 분석하여 관광 랜드마크를 파악하여 사용자에게 알려줌
- 실제 제주도를 관광하고 있는 관광객들이 이미지를 업로드 시, 해당 관광 랜드마크에 해당하는 스탬프를 제공하는 Gamification 기능을 제공, 해당 스탬프를 소유한 사용자가 해당 관광 랜드마크에 대한 리뷰를 작성할 수 있도록 함

### 기획 의도
- **온라인상에서 식당과는 달리 적은 관광지의 리뷰 수** <br>
→ 맛집과 비교하였을 때, 관광지는 지도를 통해 접근하는 리뷰 사이트 등에서 리뷰 수가 적어 사용자들이 리뷰를 통한 간단한 관광 계획 설계 등에 어려움이 있을 것으로 파악 <br>
- **인증 절차 없이 작성되는 리뷰로 받은 피해** <br>
→ 실제로 다녀간 관광객의 리뷰 만을 엄선하여 정확하고 신뢰성 있는 정보를 제공하자! <br>
- **내가 간 여행지를 저장하고 공유하는 방법은 없을까?** <br>
→ 여행지를 저장하고 기록하길 원함 <br>
- **팀원들이 가장 가고 싶어하는 여행지는?** <br>
→ 제주도!   

### 목표
- 패키지보다는 자유여행을 선호하는 것에 주목하여 더 다양한 관광 상품이 고객과 만나도록 함
- 관광지를 직접 경험해본 유저만이 작성한 리뷰를 제공하여 자신의 취향에 맞춰 다양한 여행을 해보고 싶은 수요를 충족시키는 서비스 제공

### 기술 스택

💻 **Frontend**

`React`

`Axios`

`Recoil`

`styled-components`   
<br>

💾 **backend**

`node.js` - 자바스크립트 애플리케이션을 실행

`express.js` - node.js를 위한 빠르고 개방적인 웹 프레임워크

`JWT` - 사용자 인증을 위해 rsa 알고리즘 방식으로 암호화 처리

`Jest` - 코드가 제대로 동작하는지 test하기 위해 사용

`Joi` - 데이터의 유효성 검사를 하기 위해 사용

`EXIFR` - 이미지의 메타 정보에서 위도, 경도를 추출하기 위해 사용

`AWS S3` - 프로필 변경 이미지, 커뮤니티 게시글에 삽입할 이미지를 업로드 후 저장하는 storage

`mongoDB` - NoSQL 데이터베이스로, 데이터를 저장하고 액세스함

`Swagger` - API 명세를 위해 사용   
<br>

🤖 **AI**

`TensorFlow` `Keras` 이미지 데이터 로드 및 증강, 학습 모델 구축을 위해 사용

`ResNet101` - 이미지 분류 모델

`Flask` - 이미지 예측 결과 반환 API 제작을 위한 프레임워크

`Swagger` - API 명세를 위해 사용

`dataset` - 🔗 [AIHub 한국형 랜드마크 이미지](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=56)   
<br>

🌐 **배포**

`Nginx` 웹서버 환경 구축을 위해 사용

`pm2` 메인 백엔드 서버의 프로세스 관리를 위해 사용

`gunicorn` 요청과 flask 애플리케이션 간의 통신 인터페이스로 사용   
<br>

### 모델 및 데이터셋 

#### [AIHub-랜드마크 이미지](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=56)
국내 랜드마크 이미지

#### [visitjeju.net](https://www.visitjeju.net/kr))
여행지 목록 중, 좋아요순•리뷰순 기준으로 정렬 후 선정

####  [categoryList.csv](./back/public/categoryList.csv)
랜드마크 목록

#### 인기 랜드마크지만 AIHub 데이터셋에 없는 랜드마크 일부는 크롤링 진행
#### 데이터셋의 불균형을 해결하기 위해 일부 크롤링 진행
#### 랜드마크 수 : 54개 (약 10,000장)
<br>

## 프로젝트 위키
[위키문](https://github.com/songgaram/jeju-gamsukkwang/wiki)

## 프로젝트 구성도

### 서비스 구조도

![image](https://user-images.githubusercontent.com/96907766/184671407-a94285b0-22fb-4cc8-990f-1deba2ed2760.png)


## 프로젝트 기능 설명
#### ⚙️ User MVP
- 관광 랜드마크 이미지를 인증 성공 시, 개인 페이지에 해당 관광 랜드마크에 해당되는 스탬프를 획득
- 스탬프의 갯수에 따라 레벨 등업 기능 (gamification과 관련해서 지속적인 서비스 이용과 재미와 흥미를 유도)
- 회원일 시, 리뷰나 게시판 등을 사용하여 타 사용자와 소통 가능

```
💡
//FE
  - 스탬프와 연동된 회원 정보 수정 기능, 스탬프 개수에 따른 레벨
    → react-query : 정보 업데이트
//BE
  - 회원 기본 기능, 회원 정보 수정, 스탬프 인증
    → bcypt : 비밀번호 암호화
    → jwt : 암호화 토큰
```

<br>

#### ⚙️ Review MVP
- 유저의 스탬프와 연동하여 랜드마크를 다녀온 사람만 리뷰를 작성하도록 했기 때문에, 검증된 후기를 볼 수 있고 혹시 있을 별점 테러를 방지할 수 있음

```
💡 
//FE
  - 인증 받은 유저리뷰 별점 (평균 별점 조회 기능)
    → InfiniteQuery : 리뷰 더보기 구현
//BE
  - 리뷰 기본 기능, 작성 권한 확인
```

#### ⚙️ Tour MVP
- 이미지를 업로드하면, 그 이미지를 인공지능이 인식하여 제주도의 어느 관광 랜드마크인지 판단하여 사용자에게 그곳의 상세내용과 리뷰 등을 제공함

```
💡
//FE
  - 랜드마크 이미지 & 텍스트 검색
  - 과도한 호출을 막기 위한 디바운스
//BE
  - 검색, 정보 제공
    → exifr : gps 정보
//AI
  - 이미지 예측 결과를 신뢰도 순으로 상위 5개 랜드마크로 정렬 후 반환
    → tensorflow.keras : 이미지 예측
    → pandas : 이미지 수정
```

#### ⚙️ Community MVP
- 자유게시판의 성격을 가진 게시판에서 사용자들이 제주도 관광에 대한 질문 및 팁들을 공유할 수 있게 함
- 지속적인 서비스 이용 유도, 자유롭게 묻고 마음맞는 여행메이트를 구할 수 있음

```
💡
 //FE
  - 게시글 기본 기능, 게시글 목록 페이지네이션, 말머리 기반 게시글 필터링
    → react-quill : 게시글 커스텀
//BE
  - 게시글 기본 기능
    → AWS S3, multer : 사진 업로드
```
<br>

### 시연 영상
<br>

[![Watch the video](https://user-images.githubusercontent.com/71453094/179664898-aec749ef-8618-4e4f-b03d-78571f1537f5.png)](https://youtu.be/L9IzsZCiF_E)


### 서비스 상세 페이지

### Home
![image](https://user-images.githubusercontent.com/96907766/184669242-bb22d935-3977-4d60-9e2a-580b6982dbb6.png) <br>
home 화면에 접속해 검색어로 검색을 하거나 이미지로 검색하기를 누르면 사진 파일을 선택할 수 있고, 로딩이 끝나면 검색결과를 확인 할 수 있습니다.

### 추천 랜드마크 목록
![image](https://user-images.githubusercontent.com/96907766/184669280-63557729-7f48-4863-a719-7ee95e0f90cb.png) <br>
추천 랜드마크의 목록을 보여주며, 좋아요순, 리뷰순, 리뷰평점순으로 정렬할 수 있습니다.

### 랜드마크 상세정보 페이지
![image](https://user-images.githubusercontent.com/96907766/184669338-dad60294-11d3-4c13-b87e-d8a2f1aacf31.png) <br>
랜드마크의 상세정보와 평점을 볼 수 있습니다.

### Review
![image](https://user-images.githubusercontent.com/96907766/184669522-a00216ce-fafd-4751-9c83-2ce09212345f.png) <br>
랜드마크 인증한 유저가 리뷰와 평점을 작성할 수 있습니다.

### Community
![image](https://user-images.githubusercontent.com/96907766/184669563-468207b9-3072-495f-b3b9-6e2907c24040.png) <br>
커뮤니티 게시글을 머리글로 정렬할 수 있으며, 페이지네이션을 이용해 구현되었습니다. 글쓰기는 수정, 삭제가 가능하며 에디터를 이용해 작성할 수 있습니다.

### Map
![image](https://user-images.githubusercontent.com/96907766/184669619-6d9a7e65-dfbf-41d0-9a60-7ece942ef924.png) <br>
카카오 맵 api를 이용해 랜드마크의 위치를 알 수 있고, 클릭하면 카카오맵으로 연결됩니다.

### Mypage
![image](https://user-images.githubusercontent.com/96907766/184669669-4d6f7694-a521-40f5-ade0-9bc6f23da3cf.png) <br>
회원 정보, 수정이 가능하며 Mymap에서는 스탬프 10개 단위로 레벨을 올려줍니다. (lv.1 감귤 > lv.2 도야지 > lv.3 야자수 > lv.4 한라산 > lv.5 동백꽃 > lv.6 돌하르방) <br>
이미지 인증 버튼을 누르고 파일을 선택하면 Mystamp에는 인증한 랜드마크 하나당 스탬프를 찍어줍니다. <br>

### Service Introduce
서비스를 소개하는 페이지 입니다.

## 프로젝트 팀원

### 역할 분담

| 이름   | 담당 업무                     |
| ------ | ----------------------------- |
| 김보현 | 팀장 / AI 개발               |
| 김효진 | AI 개발 /**중간 발표**     |
| 김기동 | 백엔드 개발               |
| 박정미 | 백엔드 개발/**최종 발표** |
| 한지선 | 프론트엔드 개발       |
| 송가람 | 프론트엔드 개발              |

### 멤버별 responsibility

1. 팀장

-   기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서, 개발 문서 작성
-   개발 단계: 팀원간의 일정 등 조율 
-   수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드 담당

-   기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
-   개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
-   수정 단계: 피드백 반영해서 프론트 디자인 수정

3.  백엔드 담당

[Backend README](/back/README.md)  

-   기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
-   개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용
-   수정 단계: 코치님 피드백 반영해서 분석

4. AI 담당

[Ai README](/ai/README.md)

-   데이터 선정 단계: 프로젝트 기획에 맞는 데이터 선정
-   데이터 수집 전처리 단계 : 데이터셋의 불균형을 해결하기 위해 크롤링 진행
<br>

## 인공지능 모델 학습

### Train/Test/Validation split   
* ```splitfolders```라이브러리를 이용해 ```8:1:1``` 비율로 split   
* split 코드 - [trainTestSplitImage.py](./utils/trainTestSplitImage.py)   
<br>

### Data Augmentation
* 데이터 특성상 유사도가 높은 이미지들이 많아 ```Tensorflow```의 ```ImageDataGenerator```를 이용해 test 이미지를 제외한 나머지 이미지들을 증강
* ImageDataGenerator config
    ```python
    ImageDataGenerator(rescale=1./255,
                            width_shift_range=0.1,
                            height_shift_range=0.1,
                            shear_range=0.2,
                            zoom_range=-0.3,
                            horizontal_flip=False,
                            vertical_flip=False,
                            brightness_range=[0.7, 1.3],
                            fill_mode='nearest'
                            )
    ```
<br>

### ResNet101 + custom layer   
다양한 모델 테스트 과정과 [ILSVRC](https://www.image-net.org/challenges/LSVRC/), [DACORN-랜드마크 분류 AI 경진대회](https://dacon.io/competitions/official/235585/overview/description)의 우승 경력을 고려하여 ResNet101 모델을 제주도 랜드마크 이미지 분류 학습을 위한 모델로 선정
* ResNet   
ResNet은 기본적으로 VGG-19의 구조를 뼈대로 함. 컨볼루션 층들을 추가해 깊게 만든 후, shortcut들을 추가한 구조   
![image](https://user-images.githubusercontent.com/96907766/184670737-0a8b5c84-ae2c-4cf0-80ae-33cf8b32fb52.png)
아래 표는 18층, 34층, 50층, 101층, 152층의 ResNet의 구조 요약   
![image](https://user-images.githubusercontent.com/96907766/184670772-4dcb6549-e4b6-4aed-bcb1-bb03ee3d0b16.png) <br/> 
ResNet은 [ILSVRC](https://www.image-net.org/challenges/LSVRC/)(ImageNet Large Scale Visual Recognition Challenge) 2015에서 우승한 모델로 이미지 분류 인식 오류율 3.8%로 1등을 차지한 모델   
    
논문 : [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)

<br>

## 버전
- 1.0.0



