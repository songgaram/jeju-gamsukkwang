import "dotenv/config";
import https from "https";
import fs from "fs";

import { app } from "./src/app";

// process.env.SERVER_PORT는 string type. 앞에 +를 붙이면 number로 온다.
const PORT = +process.env.SERVER_PORT || 5000;

const option = {
  key: fs.readFileSync("kdt-ai4-team08.elicecoding.com-key.pem"),
  cert: fs.readFileSync("kdt-ai4-team08.elicecoding.com.pem"),
};
https.createServer(option, app).listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. Port Number : ${PORT}`);
});
