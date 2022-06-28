## 학습 weight 다운로드   
1. 저장 위치   
```
$ cd back/public/model
```   

2. 다운로드 방법   
- Windows   

```sh
Google Drive Link - https://drive.google.com/file/d/1d_grGrFqUfF6AFpfu-JHFuPo6FK9rZHT/view?usp=sharing
```   

- Linux   

  ```sh
  $ wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1d_grGrFqUfF6AFpfu-JHFuPo6FK9rZHT' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1d_grGrFqUfF6AFpfu-JHFuPo6FK9rZHT" -O model.h5 && rm -rf /tmp/cookies.txt
  ```

---

## 제주도 랜드마크 예측 API 서버

  ### - 서버 실행
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
  ### - WSGI서버 연결 실행 (Gunicorn)
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
