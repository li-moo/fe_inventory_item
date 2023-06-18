// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { Button, Form, Input, message, Alert} from "antd";
// import { logInState } from '../../state/loginState';
// import { mainModalExpState } from '../../state/mainModalExpState';
// import { weatherState } from '../../state/weatherState';
// import { useRecoilState } from 'recoil';
// // import { Alert } from "reactstrap";
// import { Navigate, useNavigate } from 'react-router-dom';


// export default function Login0010() {

//   // 로그인데이터를 logInState라는 변수명으로 받아온 데이터를 저장 
//   const [logInData, setLogInData] = useRecoilState(logInState);
//   const [weatherData, setWeatherData] = useRecoilState(weatherState);
//   const navigate = useNavigate();
//   const [modalReadData, setModalReadData] = useRecoilState(mainModalExpState);

//   useEffect(() => {
//     getWeatherInfo();
//   }, [logInData]);

//   const getWeatherInfo = async () => {
//     try { 
//       const response = await fetch(`${process.env.REACT_APP_BE_API}/staff/weather`, {
//       // const response = await fetch(`http://43.202.9.215:8080/staff/weather`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body : JSON.stringify({
//           store_id: logInData.store_id,
//           area: logInData.area
//         })
//       }); 
//       const data = await response.json();
//       console.log("login/getWeaterInfo -> data: ", data);
//       setWeatherData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };


//     const onFinish = (values) => {

//       const url_be = `${process.env.REACT_APP_BE_API}/staff/login`;

//       axios
//       (url_be,
//         {
//           method: 'post',
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json',
//             withCredentials: true,
//             mode: 'no-cors'
//           },
//           data: {
//             login_id: values.login_id,
//             pwd: values.pwd
//           }
//         })
//         .then(async function (response) {
//           const staff = response.data;
//           console.log(staff); // staff 정보를 콘솔에 출력 //아니저런
//           if (staff !== null && staff !== "") {
//             setLogInData({
//               ...logInData,
//               isLogIn: true,
//               id: staff.id,
//               login_id: staff.login_id,
//               name: staff.name,
//               pwd: staff.id,
//               store_id: staff.store_id,
//               store_name: staff.store_name,
//               area: staff.area,
//             })
//             console.log("로그인 성공");
//             // alert(`${staff.name}님 환영합니다.`);
//             message.success(`점포: ${staff.name}`, 3);
//             // window.location.href = "http://localhost:3000/";
//             navigate("/");
//             console.log(logInData);
//             setModalReadData({
//               isModalRead: false
//             });
//           } else {
//             console.log("로그인 실패");
//             message.warning('로그인에 실패 하셨습니다. 다시 시도해주세요.');
//           }
//         })
//       .catch(function (error) {
//         if (error.response) {
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       })
//       console.log("values.login_id", values.login_id);
//       console.log("values.pwd", values.pwd);
//       console.log("state확인용", logInData);
//       console.log("weatherData", weatherData);
//     };   

//   return (
//     <div>
//       {/* <Form
//         // form={form}
//         layout="vertical"
//         onFinish={onFinish}
//       >
//         <Form.Item name="login_id" rules={[{ required: true, message: "아이디를 입력해주세요" }]}>
//           <Input  size="large" placeholder="아이디" />
//         </Form.Item>
//         <Form.Item name="pwd" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
//           <Input placeholder="비밀번호" type="password" size="large" />
//         </Form.Item> */}
//         {/* // 버튼에 로딩 기능 추가 할 생각있으면하겠습니다. loading={isLoading} */}
//         {/* <Button size="large" type="primary" htmlType="submit" className="w-full">
//           로그인
//         </Button>
//         <a className="inline-block mt-2 text-gray-400">
//           비밀번호 찾기
//         </a>
//       </Form> */}
//       <Form
//   // form={form}
//   layout="vertical"
//   onFinish={onFinish}
//   style={{ maxWidth: "18%", minWidth: '300px', margin: "0 auto", paddingTop: '20%' }} // 사이즈 반으로 줄이고 중앙 정렬
// >
//   <h3>삑 그리고 다음</h3>
//   <Form.Item
//     name="login_id"
//     rules={[{ required: true, message: "아이디를 입력해주세요" }]}
//   >
//     <Input size="large" placeholder="아이디" />
//   </Form.Item>
//   <Form.Item
//     name="pwd"
//     rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
//   >
//     <Input placeholder="비밀번호" type="password" size="large" />
//   </Form.Item>

//   <Button
//     size="large"
//     type="primary"
//     htmlType="submit"
//     className="w-full"
//     style={{ 
//       maxWidth: "800px", 
//       minWidth: '300px', 
//       // background: "#7fb1d7", 
//       // borderColor: "#73a7c8",
//       transition: "background-color 0.3s"
//   }}
//   >
//     로그인
//   </Button>
//   {/* // 버튼에 로딩 기능 추가 할 생각있으면하겠습니다. loading={isLoading} */}

//   {/* <a className="inline-block mt-2 text-gray-400">비밀번호 찾기</a> */}
// </Form>

//     </div>
//   );
// }

// // export default Login0010;


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

  // const [jwtAccessToken, setJwtAccessToken] = useLocalStorage(
  //   "jwtAccessToken",
  //   ""
  // );
  // console.log("loaded Token: ", jwtAccessToken);

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

        // console.log("token을 위한 staff>>", response);

        localStorage.setItem('access', response.data);
        localStorage.setItem('refresh', response.refresh);
        // console.log("localStorage", localStorage)

        const staff = response.data;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + staff;
        // console.log(staff); // staff 정보를 콘솔에 출력

        var token = response.token;
        // console.log("token", token);
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
          console.log(error.response);
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


