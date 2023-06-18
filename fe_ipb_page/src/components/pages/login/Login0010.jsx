import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, message, Alert } from "antd";
import { logInState } from '../../state/loginState';
import { tokenState } from '../../state/tokenState';
import { mainModalExpState } from '../../state/mainModalExpState';
import { weatherState } from '../../state/weatherState';
import { useRecoilState } from 'recoil';
// import { Alert } from "reactstrap";
import { Navigate, useNavigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken';


export default function Login0010() {

  // 로그인데이터를 logInState라는 변수명으로 받아온 데이터를 저장 
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [weatherData, setWeatherData] = useRecoilState(weatherState);
  const navigate = useNavigate();
  const [modalReadData, setModalReadData] = useRecoilState(mainModalExpState);
  const [tokenData, setTokenData] = useRecoilState(tokenState);


  useEffect(() => {
    getWeatherInfo();
  }, [logInData]);

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_API}/staff/weather`, {
        // const response = await fetch(`http://43.202.9.215:8080/staff/weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          store_id: logInData.store_id,
          area: logInData.area
        })
      });
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };


  const onFinish = (values) => {

    const url_be = `${process.env.REACT_APP_BE_API}/staff/login`;

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
      .then((response) => {

        localStorage.setItem('access', response.data);
        localStorage.setItem('refresh', response.refresh);

        const staff = response.data;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + staff;

        var token = response.token;
        localStorage.setItem("token", token);


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
          message.success(`점포: ${staff.name}`, 3);
          // window.location.href = "http://localhost:3000/";
          navigate("/");
          setModalReadData({
            isModalRead: false
          });
        } else {
          message.warning('로그인에 실패 하셨습니다. 다시 시도해주세요.');
        }
      })
      .catch(function (error) {
        if (error.response) {

        }
      })
  };


  return (
    <div>
      <Form
        // form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "18%", minWidth: '300px', margin: "0 auto", paddingTop: '20%' }} // 사이즈 반으로 줄이고 중앙 정렬
      >
        <h3>삑 그리고 다음</h3>
        <Form.Item
          name="login_id"
          rules={[{ required: true, message: "아이디를 입력해주세요" }]}
        >
          <Input size="large" placeholder="아이디" />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
        >
          <Input placeholder="비밀번호" type="password" size="large" />
        </Form.Item>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
          style={{
            maxWidth: "800px",
            minWidth: '300px',
            // background: "#7fb1d7", 
            // borderColor: "#73a7c8",
            transition: "background-color 0.3s"
          }}
        >
          로그인
        </Button>
        {/* // 버튼에 로딩 기능 추가 할 생각있으면하겠습니다. loading={isLoading} */}

        {/* <a className="inline-block mt-2 text-gray-400">비밀번호 찾기</a> */}
      </Form>

    </div>
  );
}

// export default Login0010;


