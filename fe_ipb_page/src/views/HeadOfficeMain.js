import React, { useState, useEffect } from 'react';
import { logInState } from "../components/state/loginState";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Table, Modal } from 'antd';
import axios from 'axios';

const HeadOfficeMain = () => {

  const navigate = useNavigate();
  const loginCheck = useRecoilValue(logInState);
  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    console.log("useEffect/logInData", logInData);
    console.log("useEffect/logInData.isLogin === false", logInData.isLogIn === false);
    if (logInData.isLogIn === false) {
      navigate(`/login`);
    }
  },[]);


  return (
    <div>
      본사 관리자 메인
    </div>
  );
};

export default HeadOfficeMain;
