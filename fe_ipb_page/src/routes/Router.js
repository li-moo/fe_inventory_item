// import { lazy } from "react";
// import { Navigate } from "react-router-dom";
// import Order from "../components/pages/order/Orders.jsx";
// import StoreProductList from "../components/pages/storeproduct/StoreProductList.jsx";
// import ProductAdd from "../components/pages/product/ProductAdd.jsx";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages ****/

// const Starter = lazy(() => import("../views/Starter.js"));
// const About = lazy(() => import("../views/About.js"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
// const Login = lazy(() => import("../components/pages/login/Login.js"));
// const Staff = lazy(() => import("../components/pages/staff/Staff.js"));
// const StaffAdd = lazy(() => import("../components/pages/staff/StaffAdd.jsx"));
// const Weather = lazy(() => import("../components/pages/weather/Weather.jsx"));
// const Product = lazy(() => import("../components/pages/product/Product.jsx"))
// const ProductDetail = lazy(() => import("../components/pages/product/ProductDetaile.jsx"));
// const ProductAdd01 = lazy(() => import("../components/pages/product/ProductAdd.jsx"));
// const Event = lazy(() => import("../components/pages/event/Event.jsx"));
// const Orders = lazy(() => import("../components/pages/order/Orders.jsx"));
// const StoreProductList01 = lazy(() => import("../components/pages/storeproduct/StoreProductList.jsx"));


// /*****Routes******/

// const ThemeRoutes = [
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/starter" /> },
//       { path: "/starter", exact: true, element: <Starter /> },
//       { path: "/about", exact: true, element: <About /> },
//       { path: "/alerts", exact: true, element: <Alerts /> },
//       { path: "/badges", exact: true, element: <Badges /> },
//       { path: "/buttons", exact: true, element: <Buttons /> },
//       { path: "/cards", exact: true, element: <Cards /> },
//       { path: "/grid", exact: true, element: <Grid /> },
//       { path: "/table", exact: true, element: <Tables /> },
//       { path: "/forms", exact: true, element: <Forms /> },
//       { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
//       { path: "/login", exact: true, element: <Login /> },
//       { path: "/staff", exact: true, element: <Staff /> },
//       { path: "/staff/add", exact: true, element: <StaffAdd /> },
//       { path: "/weather", exact: true, element: <Weather /> },
//       { path: "/product", exact: true, element: <Product /> },
//       { path: "/product/detail/:id", exact: true, element: <ProductDetail /> },
//       { path: "/product/add", exact: true, element: <ProductAdd01 /> },
//       { path: "/event", exact: true, element: <Event /> },
//       { path: "/order", exact: true, element: <Orders /> },
//       { path: "/storeproductlist", exact: true, element: <StoreProductList01 /> },
//     ],
//   },
// ];

// export default ThemeRoutes;

import { lazy } from "react";
import { Navigate } from "react-router-dom";


/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Login = lazy(() => import("../components/pages/login/Login.js"));
const Staff = lazy(() => import("../components/pages/staff/Staff.js"))
const StaffAdd = lazy(() => import("../components/pages/staff/StaffAdd.jsx"))
const StaffUpdate = lazy(() => import("../components/pages/staff/StaffUpdate.jsx"))
const Weather = lazy(() => import("../components/pages/weather/Weather.jsx"))
const Product01 = lazy(() => import("../components/pages/product/Product.jsx"));
const ProductAdd = lazy(() => import("../components/pages/product/ProductAdd.jsx"));
const ProductDetail = lazy(() => import("../components/pages/product/ProductDetaile.jsx"))
const Event = lazy(() => import("../components/pages/event/Event.jsx"))
const Orders = lazy(() => import("../components/pages/order/Orders.jsx"))
const StoreProductList01 = lazy(() => import("../components/pages/storeproduct/StoreProductList.jsx"))
const OrderList = lazy(() => import("../components/pages/order/OrderList.jsx"))
const Store = lazy(() => import("../components/pages/store/Store.jsx"))
const StoreAdd = lazy(() => import("../components/pages/store/StoreAdd.jsx"))
const StoreDetail = lazy(() => import("../components/pages/store/StoreDetail.jsx"))
const StoreSales = lazy(() => import("../components/pages/sales/StoreSales.jsx"))
const StoreSalesListCategory = lazy(() => import("../components/pages/sales/StoreSalesListCategory.jsx"))
const Board = lazy(() => import("../components/pages/board/Board.jsx"))
const BoardAdd = lazy(() => import("../components/pages/board/BoardAdd.jsx"))
const EventAdd = lazy(() => import("../components/pages/event/EventAdd.jsx"))
const EventList = lazy(() => import("../components/pages/event/EventList.jsx"))


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/staff", exact: true, element: <Staff /> },
      { path: "/staff/add", exact: true, element: <StaffAdd /> },
      { path: "/staff/update/:id", exact: true, element: <StaffUpdate /> },
      { path: "/weather", exact: true, element: <Weather /> },,
      { path: "/product", exact: true, element: <Product01 /> },
      { path: "/product/add", exact: true, element: <ProductAdd /> },
      { path: "/product/detail/:id", exact: true, element: <ProductDetail /> },
      { path: "/event", exact: true, element: <Event /> },
      { path: "/order", exact: true, element: <Orders /> },
      { path: "/storeproductlist", exact: true, element: <StoreProductList01 /> },
      { path: "/orderslist", exact: true, element: <OrderList /> },
      { path: "/store", exact: true, element: <Store /> },
      { path: "/store/add", exact: true, element: <StoreAdd /> },
      { path: "/storedetail/:id", exact: true, element: <StoreDetail /> },
      { path: "/sales/listbystore", exact: true, element: <StoreSales /> },
      { path: "/sales/listbystore/category", exact: true, element: <StoreSalesListCategory /> },
      { path: "/board", exact: true, element: <Board />} ,
      { path: "/board/add", exact: true, element: <BoardAdd/>} ,
      { path: "/event/eventadd", exact: true, element: <EventAdd/>} ,
      { path: "/event/eventlist", exact: true, element: <EventList/>} ,
    ],
  },
];

export default ThemeRoutes;
