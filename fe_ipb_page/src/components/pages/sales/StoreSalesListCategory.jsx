// import React, { useState, useEffect } from 'react';
// import { Button, Divider } from "antd";
// import { Link } from "react-router-dom";
// import { useRecoilState } from 'recoil';
// import { logInState } from "../../state/loginState";
// import { Table } from 'antd';

// function StoreSalesListCategory() {
//   const [storeSalesData, setStoreSalesData] = useState([]);
//   const [logInData, setLogInData] = useRecoilState(logInState);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/sales/listbystore?store_id=${logInData.store_id}`);
//       const data = await response.json();
//       const combinedData = combinePriceForSameProductName(data);
//       setStoreSalesData(combinedData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const combinePriceForSameProductName = (data) => {
//     const combinedData = [];
//     const groupedData = {};

//     data.forEach((item) => {
//       const productName = item.product_name;

//       if (groupedData[productName]) {
//         groupedData[productName].total_price += item.price;
//       } else {
//         groupedData[productName] = {
//           ...item,
//           total_price: item.price,
//         };
//       }
//     });

//     Object.keys(groupedData).forEach((productName) => {
//       combinedData.push(groupedData[productName]);
//     });

//     return combinedData;
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Product Name',
//       dataIndex: 'product_name',
//       key: 'product_name',
//     },
//     {
//       title: 'Category ID',
//       dataIndex: 'category_id',
//       key: 'category_id',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'qnt',
//       key: 'qnt',
//     },
//     {
//       title: 'Cost',
//       dataIndex: 'cost',
//       key: 'cost',
//     },
//     {
//       title: 'Expiration Date',
//       dataIndex: 'exp',
//       key: 'exp',
//     },
//     {
//       title: 'Sales Date',
//       dataIndex: 'sales_date',
//       key: 'sales_date',
//     },
//     {
//       title: 'Store Name',
//       dataIndex: 'store_name',
//       key: 'store_name',
//     },
//     {
//       title: 'Store Product ID',
//       dataIndex: 'store_product_id',
//       key: 'store_product_id',
//     },
//     {
//       title: 'Total Price',
//       dataIndex: 'total_price',
//       key: 'total_price',
//       render: (_, record) => (
//         <span>{record.total_price.toFixed(2)}</span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <h2>리스트 페이지 입니다</h2>
//       <Button>
//         <Link to='/staff/add'>-</Link>
//       </Button>
//       <Divider />

//       <Table dataSource={storeSalesData} columns={columns} />
//     </>
//   );
// }

// export default StoreSalesListCategory;

// import React, { useState, useEffect } from 'react';
// import { Button, Divider } from "antd";
// import { Link } from "react-router-dom";
// import { useRecoilState } from 'recoil';
// import { logInState } from "../../state/loginState";
// import { Table } from 'antd';

// function StoreSalesListCategory() {
//   const [storeSalesData, setStoreSalesData] = useState([]);
//   const [logInData, setLogInData] = useRecoilState(logInState);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/sales/listbystore?store_id=${logInData.store_id}`);
//       const data = await response.json();
//       const combinedData = combinePriceForSameProductName(data);
//       setStoreSalesData(combinedData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const combinePriceForSameProductName = (data) => {
//     const combinedData = [];
//     const groupedData = {};

//     data.forEach((item) => {
//       const productCategory= item.category_id
//       //         groupedData[productCategory].total_qnt += item.qnt;
//       const productQnt = item.qnt;

//       if (groupedData[productCategory]) {
//         groupedData[productCategory].total_price += item.price*item.qnt;
//       } else {
//         groupedData[productCategory] = {
//           ...item,
//           total_price: item.price,
//         };
//       }

//       if (groupedData[productQnt]) {
//         groupedData[productQnt].total_qnt += item.qnt;
//       } else {
//         groupedData[productQnt] = {
//           ...item,
//           total_qnt: item.qnt,
//         };
//       }
//     });

//     Object.keys(groupedData).forEach((productCategory) => {
//       combinedData.push(groupedData[productCategory]);
//     });

//     return combinedData;
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Product Name',
//       dataIndex: 'product_name',
//       key: 'product_name',
//     },
//     {
//       title: 'Category ID',
//       dataIndex: 'category_id',
//       key: 'category_id',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'qnt',
//       key: 'qnt',
//       render: (_, record) => (
//         <span>{record.total_qnt}</span>
//       ),
//     },
//     {
//       title: 'Cost',
//       dataIndex: 'cost',
//       key: 'cost',
//     },
//     {
//       title: 'Expiration Date',
//       dataIndex: 'exp',
//       key: 'exp',
//     },
//     {
//       title: 'Sales Date',
//       dataIndex: 'sales_date',
//       key: 'sales_date',
//     },
//     {
//       title: 'Store Name',
//       dataIndex: 'store_name',
//       key: 'store_name',
//     },
//     {
//       title: 'Store Product ID',
//       dataIndex: 'store_product_id',
//       key: 'store_product_id',
//     },
//     {
//       title: 'Total Price',
//       dataIndex: 'total_price',
//       key: 'total_price',
//       render: (_, record) => (
//         <span>{record.total_price}</span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <h2>리스트 페이지 입니다</h2>
//       <Button>
//         <Link to='/staff/add'>-</Link>
//       </Button>
//       <Divider />

//       <Table dataSource={storeSalesData} columns={columns} />
//     </>
//   );
// }

// export default StoreSalesListCategory;

// import React, { useState, useEffect } from 'react';
// import { Button, Divider } from "antd";
// import { Link } from "react-router-dom";
// import { useRecoilState } from 'recoil';
// import { logInState } from "../../state/loginState";
// import { Table } from 'antd';

// function StoreSalesListCategory() {
//   const [storeSalesData, setStoreSalesData] = useState([]);
//   const [logInData, setLogInData] = useRecoilState(logInState);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/sales/listbystore?store_id=${logInData.store_id}`);
//       const data = await response.json();
//       // const combinedData = combinePriceForSameProductName(data);
//       setStoreSalesData(data);
//       console.log(">>>>>>>> storeSalesData:", storeSalesData);
//       console.log(">>>>>>>> storeSalesData.qnt:", storeSalesData.qnt);
//     } catch (error) {
//       console.error(error);
//     }
//   };




//   return (
//     <>
//     </>
//   );
// }

// export default StoreSalesListCategory;

import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";

function StoreSalesListCategory() {
  const [storeSalesData, setStoreSalesData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/sales/listbystore?store_id=${logInData.store_id}`);
      const data = await response.json();
      setStoreSalesData(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Expiration Date</th>
            <th>Sales Date</th>
            <th>Store Name</th>
            <th>Store Product ID</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {storeSalesData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_name}</td>
              <td>{item.category_id}</td>
              <td>{item.price}</td>
              <td>{item.qnt}</td>
              <td>{item.cost}</td>
              <td>{item.exp}</td>
              <td>{item.sales_date}</td>
              <td>{item.store_name}</td>
              <td>{item.store_product_id}</td>
              <td>{item.price * item.qnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StoreSalesListCategory;