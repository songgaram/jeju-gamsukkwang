import axios from "axios";
// import { errorController } from "./errorController";

const SERVER_PORT_NUMBER = process.env.REACT_APP_SERVER_PORT;
const SERVER_URL = `http://${window.location.hostname}:${SERVER_PORT_NUMBER}/`;
console.log(SERVER_URL);
const TOKEN = localStorage.getItem("userToken");

// axios 생성
const http = axios.create({
  baseURL: SERVER_URL, // 데이터를 요청할 기본 주소
  timeout: 5000,
});

// axios request 처리
http.interceptors.request.use(
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
http.interceptors.response.use(
  function (response) {
    // 응답에 대한 리턴값 설정
    console.log(response);

    return response.data.data;
  },
  function (error) {
    // 오류 처리를 위한 별도 errorController
    console.log("🚀 ~ response error : ", error);
    return Promise.reject(error);
  },
);

/**
 * ! 코드가 약간 줄어보여도 좋지 않음
 * ! get이 뭐하는 get인지 누가봐도 알 수 있도록 하는게 좋음
 */

// const get = (...args) => {
//   instance.get(...args);
// };

// const post = (...args) => {
//   instance.post(...args);
// };

// const put = (...args) => {
//   instance.put(...args);
// };

// const del = (...args) => {
//   instance.del(...args);
// };

//export { get, post, put, del };

export default http;
