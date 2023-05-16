import React , {useEffect} from 'react';
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
import user1 from "../assets/images/users/user1.jpg";
import { logInState } from "../components/state/loginState";
import { weatherState } from "../components/state/weatherState";
import { useRecoilState, useRecoilValue } from 'recoil';
//import { useRecoilValue } from 'recoil';
// import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    setWeatherData({presentWeather: 'test'});
    alert("로그아웃에 성공했습니다!");
    navigate(`/login`);

  }

  const [logInData, setLogInData] = useRecoilState(logInState);
  const [weatherData, setWeatherData] = useRecoilState(weatherState);
  const loginCheck = useRecoilValue(logInState);
  const [isLogin, setIsLogin] = React.useState(logInData.isLogIn);

    const onFinish = (values) => {

      // const url_be = "http://localhost:8080/api/v1/staff/login";
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
      console.log(values.login_id);
      console.log(values.pwd);
      console.log("state확인용");
      console.log(logInData);
      console.log("1111", weatherData);
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

  return (
    <Navbar color="dark" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="dark"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
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
          <NavItem>
            <Link to="/starter" className="nav-link">
              점포: {logInData.store_name}
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/weather" className="nav-link">
            날씨: {weatherData.presentWeather}
            </Link>
          </NavItem>
          {/* // 아이디 패스워드가 부정확해도 로그아웃이 뜨는 문제  */}
          <NavItem>
            {
            logInData.isLogIn ?   
              <p className="nav-link" onClick={logOut}>로그아웃</p>
            : 
              <Link to="/login" className="nav-link">로그인</Link>      
            }
          </NavItem>
        </Nav>
        <div>
          <p style={{color: 'white'}}>{logInData.name}님 안녕하세요!</p>
        </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="dark">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem><Link to="/staff">Staff</Link></DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};


export default HeaderTop;
