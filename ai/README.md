# 제주도 랜드마크 예측 API 서버

## - 서버 실행
0. back 폴더로 진입
   ```sh
   $ cd back
   ```

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
    (.flask) $ pip install -r requirements.txt
    ```
4. flask 서버 실행
    ```sh
    (.flask) $ cd src
    (.flask) $ python app.py
    ```
## - WSGI서버 연결 실행 (Gunicorn)
1. Gunicorn 설치
    ```sh
    (.flask) $ pip gunicorn
    ```
2. Gunicorn으로 app.py 실행
    ```sh
    (.flask) $ cd src
    (.flask) $ gunicorn --workers {workers} --timeout {sec} --bind 0.0.0.0:{port} wsgi:application
    ```
    Linux 환경에서만 가능
