## Flask를 이용한 랜드마크 이미지 예측 API
* 예측 API를 위한 stack
    - Python
    - Flask
    - Gunicorn
    - Tensorflow
    - Keras
    - Pandas
    - Numpy
    <br>

* 실행 방법
    * 학습된 weight 다운로드 
        1. 저장 위치   
            ```
            $ cd ./public/model
            ```   
        <br>

        2. 다운로드 방법   
            - Windows   

            ```sh
            Google Drive Link - https://drive.google.com/file/d/1d_grGrFqUfF6AFpfu-JHFuPo6FK9rZHT/view?usp=sharing
            ```   

            - Linux   

            ```sh
            $ wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1d_grGrFqUfF6AFpfu-JHFuPo6FK9rZHT' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1d_grGrFqUfF6AFpfu-JHFuPo6FK9rZHT" -O model.h5 && rm -rf /tmp/cookies.txt
            ```
            <br>

    * local 환경 서버 테스트   

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
            <br>

    * WSGI서버 연결 실행 - Gunicorn (Linux 환경에서만 가능)
        1. Gunicorn 설치
            ```sh
            (.flask) $ pip gunicorn
            ```
        2. Gunicorn으로 app.py 실행
            ```sh
            (.flask) $ cd src
            (.flask) $ gunicorn --workers {workers} --timeout {sec} --bind 0.0.0.0:{port} wsgi:application
            ```
            <br>

    * API 명세서
        * [api-docs](http://kdt-ai4-team08.elicecoding.com:5003/api-docs/)
