import "dotenv/config";
import { app } from "./src/app";

// process.env.SERVER_PORT는 string type. 앞에 +를 붙이면 number로 온다.
const PORT = +process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
