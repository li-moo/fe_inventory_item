import React , { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  // UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user05 from "../assets/images/users/user05.jpg";
import { logInState } from "../components/state/loginState";
import { weatherState } from "../components/state/weatherState";
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message, Modal} from "antd";
import  style from "./HeaderTop.module.css"
import { 
  RiLogoutBoxRLine, 
  RiSunFill, 
  RiSunCloudyFill, 
  RiHeavyShowersLine, 
  RiFlashlightFill,
  RiHome4Line
} from "react-icons/ri";
import { HiOutlineBell } from "react-icons/hi";
import todayData from '../components/globalFunction/todayData';
import CurrentDate from '../components/globalFunction/CurrentDate';
import MyModal from '../components/sse/MyModal';
import DropDown from '../components/sse/DropDown';

// function MyModal() {
//   return (
//     <div className="modal">
//       <h2>제목</h2>
//       <p>날짜</p>
//       <p>상세 내용</p>
//     </div>
//   );
// }

const HeaderTop = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navigate = useNavigate();
  

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const logOut = () => {
    setLogInData({
      isLogIn: false
    });
    setWeatherData({presentWeather: 'CLear'});
    message.info('로그아웃 되었습니다.', 2);
    //alert("로그아웃에 성공했습니다!");
    navigate(`/login`);

  }

  const getTodayData = todayData(); // 오늘 날짜를 받아온다 20203-05-23
  // console.log("todayData", getTodayData)


  const [logInData, setLogInData] = useRecoilState(logInState);
  const [weatherData, setWeatherData] = useRecoilState(weatherState);
  const loginCheck = useRecoilValue(logInState);
  // const [isLogin, setIsLogin] = React.useState(logInData.isLogIn);
  const [isLogin, setIsLogin] = React.useState(logInData.isLogIn);
  
    const onFinish = (values) => {

      // const url_be = "http://localhost:8080/api/v1/staff/login";
      const url_be = "http://localhost:8080/staff/login";
      // const url_be = "http://http://43.202.9.215:8080/staff/login";

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
            store_id: staff.store_id,
            store_name: staff.store_name,
            area: staff.area,
            // area: staff.area,
            // store_name: staff.store_name,
          })
          if (staff !== null && staff !== "") {
            console.log("로그인 성공");
            alert(`${staff.name}님 환영합니다.`);
            // window.location.href = "http://localhost:3000/";
            navigate(`/`);
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
      console.log(values.login_id);
      console.log(values.pwd);
      console.log("state확인용");
      console.log(logInData);
      console.log("1111weatherData", weatherData);
    };
  //
  console.log("logInData.isLogIn", logInData.isLogIn);

  useEffect(() => {
    console.log("useEffect/logInData", logInData);
    console.log("useEffect/logInData.isLogin === false", logInData.isLogIn === false);
    if (logInData.isLogIn === false) {
      navigate(`/login`);
    }
  },[loginCheck]);

  ///

  // setInterval(callback, delay, [arg1, arg2, ...]);

  useEffect(() => {
    // 초기 실행
    // sayHello();
    getWeatherInfo();
    // 5초마다 sayHello 함수 호출 -> 5000
    // 60초마다 sayHello 함수 호출 -> 60 * 1000
    // const interval = setInterval(sayHello, 60 * 1000);
    // const intervalWeatherInfo = setInterval(getWeatherInfo, 60 * 1000, [logInData.store_id, logInData.area]);
    const intervalWeatherInfo = setInterval(getWeatherInfo, 3 * 60 * 60 * 1000, [logInData.store_id, logInData.area]);
    
    // 컴포넌트 언마운트 시 clearInterval
    // return () => clearInterval(interval);
    return () => clearInterval(intervalWeatherInfo); //
  }, []);

  // function sayHello() {
  //   console.log("++++++++++++++++++++++++++++++");
  //   console.log("안녕하세요");
  // }
  ////
  const getWeatherInfo = async () => {
    try { 
      const response = await fetch(`http://localhost:8080/staff/weather`, {
        // const response = await fetch(`http://43.202.9.215:8080/staff/weather`, {
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
      console.log(">>/>>/weatherDatadata.presentWeather: ", weatherData.presentWeather);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    // <Navbar color="primary" dark expand="md" className={"navbar-custom bg-secondary"} >
    <Navbar color="primary" dark expand="md" className={"navbar-custom smaller-navbar "} >
      <div className="d-flex align-items-center">
        {/* <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand> */}
        {/* <Button
          color="dark"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button> */}
      </div>

      <div className="hstack gap-2">
        <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <div className={style.leftTab}>
            <NavItem>
              <Link to="/starter" className="nav-link">
                {/* {logInData.store_name} */}
                <RiHome4Line />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/weather" className={`nav-link`} >
                <div className={style.leftTabTab}>
                <p>{getTodayData}</p>
                <p><CurrentDate /></p>
                <p>
                  {weatherData.presentWeather === "Clear" && <RiSunFill />}
                  {weatherData.presentWeather === "Rain" && <RiHeavyShowersLine />}
                  {weatherData.presentWeather === "Clouds" && <RiSunCloudyFill />}
                  {weatherData.presentWeather === "Thunderstorm" && <RiFlashlightFill />}
                  {weatherData.presentWeather === "Mist" && <RiFlashlightFill />}
                </p>
                </div>
              </Link>
            </NavItem>
          </div>

          <div className={style.rightTab}>
          <NavItem>
          <Link to="/starter" className="nav-link">
          {logInData.store_name}
            </Link>
          </NavItem>

          <NavItem>
            <div id='classDrop'>
                <DropDown />
            </div>
          </NavItem>
          <NavItem>
            {
            logInData.isLogIn ?   
              <p className="nav-link" onClick={logOut}>
                <RiLogoutBoxRLine 
                  // style={{ color: 'white', size: '50px' }}
                />
              </p>
            : 
              <Link to="/login" className="nav-link">로그인</Link>      
            }
          </NavItem>
          </div>
        </Nav>

        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="dark">
            <img
              src={user05}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem divider />
            <DropdownItem><Link to="/staff">Staff</Link></DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </Dropdown> */}

      </Collapse>
    </Navbar>
  );
};


export default HeaderTop;
