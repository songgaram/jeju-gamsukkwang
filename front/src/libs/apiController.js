import axios from "axios";
// import { errorController } from "./errorController";

const SERVER_PORT_NUMBER = process.env.REACT_APP_SERVER_PORT;
const SERVER_URL = `http://${window.location.hostname}:${SERVER_PORT_NUMBER}/`;

// axios 생성
const http = axios.create({
  baseURL: SERVER_URL, // 데이터를 요청할 기본 주소
  timeout: 5000,
});

// axios request 처리
http.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // config에 header 설정
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    accessToken && (config.headers["Authorization"] = `Bearer ${accessToken}`);

    return config;
  },
  function (error) {
    // 요청에 대한 오류 발생 시, 오류 내용을 출력하고 요청을 거절함
    console.log("🚀 ~ request error : ", error);
    return Promise.reject(error);
  },
);

// axios response 처리
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // 오류 처리를 위한 별도 errorController
    console.log("🚀 ~ response error : ", error);
    return Promise.reject(error);
  },
);

export default http;