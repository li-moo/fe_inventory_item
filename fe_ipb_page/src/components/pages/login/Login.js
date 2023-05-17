import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, message} from "antd";
import { logInState } from '../../state/loginState';
import { weatherState } from '../../state/weatherState';
import { useRecoilState } from 'recoil';
import { Alert } from "reactstrap";

export default function Login() {

  // 로그인데이터를 logInState라는 변수명으로 받아온 데이터를 저장 
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [weatherData, setWeatherData] = useRecoilState(weatherState);

  useEffect(() => {
    getWeatherInfo();
  }, [logInData]);

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/staff/weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          store_id: logInData.store_id,
          area: logInData.area
        })
      }); 
      const data = await response.json();
      console.log("data: ", data);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  // useEffect(() => {
  //   // 초기 실행
  //   sayHello();

  //   // 5초마다 sayHello 함수 호출
  //   const interval = setInterval(sayHello, 5000);

  //   // 컴포넌트 언마운트 시 clearInterval
  //   return () => clearInterval(interval);
  // }, []);

  // function sayHello() {
  //   console.log("++++++++++++++++++++++++++++++");
  //   console.log("안녕하세요");

  // }

    const onFinish = (values) => {

      const url_be = "http://localhost:8080/staff/login";
      axios
      (url_be,
        {
          method: 'post',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
            mode: 'no-cors'
          },
          data: {
            login_id: values.login_id,
            pwd: values.pwd
          }
        })
        .then(async function (response) {
          const staff = response.data;
          console.log(staff); // staff 정보를 콘솔에 출력
          if (staff !== null && staff !== "") {
            setLogInData({
              ...logInData,
              isLogIn: true,
              id: staff.id,
              login_id: staff.login_id,
              name: staff.name,
              pwd: staff.id,
              store_id: staff.store_id,
              store_name: staff.store_name,
              area: staff.area,
            })
            console.log("로그인 성공");
            alert(`${staff.name}님 환영합니다.`);
            window.location.href = "http://localhost:3000/";
            console.log(logInData);
          } else {
            console.log("로그인 실패");
          }
        })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      console.log("values.login_id", values.login_id);
      console.log("values.pwd", values.pwd);
      console.log("state확인용", logInData);
      console.log("weatherData", weatherData);
    };   

  return (
    <div>
      <Form
        // form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="login_id" rules={[{ required: true, message: "아이디를 입력해주세요" }]}>
          <Input  size="large" placeholder="아이디" />
        </Form.Item>
        <Form.Item name="pwd" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
          <Input placeholder="비밀번호" type="password" size="large" />
        </Form.Item>
        {/* // 버튼에 로딩 기능 추가 할 생각있으면하겠습니다. loading={isLoading} */}
        <Button size="large" type="primary" htmlType="submit" className="w-full">
          로그인
        </Button>
        <a className="inline-block mt-2 text-gray-400">
          비밀번호 찾기
        </a>
      </Form>

    </div>
  );
}

// export default Login;