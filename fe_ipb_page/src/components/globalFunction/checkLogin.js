import { message } from "antd";

export default function checkLogin(logInData, navigate) {
  if (logInData.isLogIn === false) {
    // alert("로그인이 필요한 페이지입니다!");
    message.info('로그인이 필요한 페이지입니다!');
    navigate(`/login`);
  }
};
