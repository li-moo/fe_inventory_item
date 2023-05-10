// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from 'antd';
// import { Divider } from "antd";

// function StaffList() {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/staff/list');
//       setUserData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>스태프 정보</h2>
//       <Divider />
//       <Button onClick={() => fetchData()}>스태프 리스트 가져오기</Button>
//       {userData.map((user) => (
//         <div key={user.id}>
//           <div>ID: {user.id}</div>
//           <div>이름: {user.name}</div>
//           <div>로그인 ID: {user.login_id}</div>
//           <div>비밀번호: {user.pwd}</div>
//           <div>Store ID: {user.store_id}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StaffList;

import React, { useState, useEffect } from 'react';
import { Divider } from "antd";

function StaffList() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/staff/list');
      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>스태프 리스트</h2>
      <Divider />
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>이름</th>
      <th>로그인 ID</th>
      <th>비밀번호</th>
      <th>Store ID</th>
    </tr>
  </thead>
  <tbody>
    {userData.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.login_id}</td>
        <td>{user.pwd}</td>
        <td>{user.store_id}</td>
      </tr>
    ))}
  </tbody>
</table>
    </>
  );
}

export default StaffList;