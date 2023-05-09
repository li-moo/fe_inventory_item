import React from 'react';
import axios from 'axios';
import { Button, Form, Input} from "antd";
import { logInState } from '../state/loginState';
import { useRecoilState } from 'recoil';

export default function Login() {

  const [logInData, setLogInData] = useRecoilState(logInState);

    const onFinish = (values) => {

      const url_be = "http://localhost:8080/api/v1/staff/login";
      // const url_be = "http://localhost:8080/staff/login";

  
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
          setLogInData({
            ...logInData,
            isLogIn: true,
            id: staff.id,
            login_id: staff.login_id,
            name: staff.name,
            pwd: staff.id,
            store_id: staff.id,
       
          })
          if (staff !== null) {
            console.log("로그인 성공");
            alert(`${staff.name}님 환영합니다.`);
            window.location.href = "http://localhost:3000/";
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
      console.log(values.login_id);
      console.log(values.pwd);
      console.log("state확인용");
      console.log(logInData);
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
        {/* <Button size="large" type="primary" htmlType="submit" className="w-full" loading={isLoading}>
          로그인
        </Button> */}
         <Button size="large" type="primary" htmlType="submit" className="w-full">
          로그인
        </Button>
        {/* <a className="inline-block mt-2 text-gray-400" onClick={() => setShowPasswordModal(true)}>
          비밀번호 찾기
        </a> */}
        <a className="inline-block mt-2 text-gray-400">
          비밀번호 찾기
        </a>
      </Form>
      {/* <DefaultModal title="비밀번호 찾기" open={showPasswordModal} handleHide={() => setShowPasswordModal(false)}>
        🔑 임시 로그인 정보는 admin / admin 입니다.
      </DefaultModal> */}

    </div>
  );
}

// export default Login;