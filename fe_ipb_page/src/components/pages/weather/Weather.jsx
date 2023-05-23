import { useRecoilValue } from 'recoil';
import { logInState } from '../../state/loginState';
import { weatherState } from '../../state/weatherState';
import React, {  useState, useEffect } from 'react';
import { Divider } from "antd"; 
import { useRecoilState } from 'recoil';

export default function Weather() {
  const { area } = useRecoilValue(logInState);
  const [weatherdata, setWeatherdata] = useRecoilState(weatherState);

  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    getWeatherInfo();
  }, []);

  // area 값을 이용하여 날씨 정보를 가져옴
  const getWeatherInfo = async () => {
    try {
      // const response = await fetch(`http://localhost:8080/staff/weather?area=${area}`, {
      // const response = await fetch(`http://localhost:8080/staff/weather?area=${logInState.area}`, {
      // const response = await fetch(`http://localhost:8080/staff/weather?area=busan`, {
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
      console.log("data: ");
      setWeatherdata(data);
      console.log(data);

      // if(data === null) {
      //   console.log("??????")
      // }

    } catch (error) {
      console.error(error);
    }
  };

  //
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // 1초마다 현재 날짜와 시간을 업데이트
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => {
      clearInterval(interval);
    };
  }, []);
  //


  return(
    <>
    <div>
      <h2>날씨 정보</h2>
      <Divider />
      <p>{logInData.name}님 안녕하세욤!</p>
      <p>현재 지역: {logInData.area}</p>
      <p>스토어 아이디: {logInData.store_id}</p>
      <p>날씨 정보: {weatherdata.presentWeather}</p>
    {/* {weatherdata.map((weather) => (
          <div key={weather.id}>
            <div>ID: {weather.id}</div>
          </div>
        ))} */}
    </div>
    <div>
      <h2>오늘 날짜 시간</h2>
      <Divider />
      <p>{currentDate.toLocaleDateString()}</p>
      <p>{currentDate.toLocaleTimeString()}</p>
    </div>
    </>
  );
}

/// 특정 시간 마다 업데이트 



