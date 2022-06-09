import axios from "axios";

const SERVER_PORT_NUMBER = process.env.SERVER_PORT;
const SEVER_URL = `http://${window.location.hostname}:${SERVER_PORT_NUMBER}/`;
const TOKEN = localStorage.getItem("userToken");

// axios 생성
const instance = axios.create({
  baseURL: SEVER_URL, // 데이터를 요청할 기본 주소
  timeout: 5000,
});

// axios request 처리
instance.interceptors.request.use(
  function (config) {
    // config에 header 설정
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = TOKEN ? `Bearer ${TOKEN}` : "";
    return config;
  },
  function (error) {
    // 요청에 대한 오류 발생 시, 오류 내용을 출력하고 요청을 거절함
    console.log("🚀 ~ request error : ", error);
    return Promise.reject(error);
  },
);

// axios response 처리
instance.interceptors.response.use(
  function (response) {
    // 응답에 대한 리턴값 설정
    console.log(response);

    return response.data.data;
  },
  function (error) {
    // 오류 처리를 위한 별도 errorController
    errorController(error);
  },
);
