import { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";
import { weatherState } from "../../state/weatherState";

function LoginCookie() {

  const [logInData, setLogInData] = useRecoilState(logInState);
  const [weatherData, setWeatherData] = useRecoilState(weatherState);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // 로그아웃 처리 등을 수행
      setLogInData({});
    setWeatherData({presentWeather: 'test'});
    };

    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener(
      console.log("브라우저 종료")
    );

    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      console.log("브라우저 종료")
    };
  }, []);

  // ...
}

export default LoginCookie;