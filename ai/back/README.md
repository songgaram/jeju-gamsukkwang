# 제주도 랜드마크 예측 API 서버
---
## - 서버 실행

1. 가상환경 생성
  ```sh
  $ python -m venv .flask
  ```
2. 가상환경 실행
    - Windows
      ```sh
      $ source .flask/Scripts/activate
      ```
    - Linux
      ```sh
      $ source .flask/bin/activate
      ```
3. 필요 패키지 설치
    ```sh
    $ pip install -r requirements.txt
    ```
4. flask 서버 실행
    ```sh
    $ python app.py
    ```