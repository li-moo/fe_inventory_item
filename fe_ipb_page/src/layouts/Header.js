// import React from "react";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Container,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// // import { Icon } from "react-bootstrap-icons";
// import styles from "./Header.module.css";

// const Header = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   // const createDeliveryAddress = () => {
//   //   // Handle the logic for creating a delivery address here
//   //   console.log("Creating a delivery address...");
//   // };

//   return (
//     // <div className={style.divHeader}>
//     // <div className={`${style.divHeader} ${style.navbarCustom} ${style.bgSecondary}`}>
//     <div className={`${styles.divHeader} ${styles.navbarCustom}`}>


//       <Navbar dark expand="md">
//       <div className="d-flex align-items-center">
//         <NavbarBrand href="/" className="d-lg-none">
//           {/* <LogoWhite /> */}
//         </NavbarBrand>
//       </div>
//       <div className="hstack gap-2">
//         <Button
//           color="white"
//           size="sm"
//           className="d-sm-block d-md-none"
//           onClick={toggle}
//         >
//           {isOpen ? (
//             <i className="bi bi-x"></i>
//           ) : (
//             <i className="bi bi-three-dots-vertical"></i>
//           )}
//         </Button>
//       </div>

//       <Collapse navbar isOpen={isOpen}>
//         <Nav className="me-auto" navbar>
//           <Collapse navbar isOpen={isOpen}>
//             <Nav className="mx-auto" navbar>
//               <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
//                 <DropdownToggle caret nav style={{ color: 'grey'}}>
//                   상품 관리
//                 </DropdownToggle>
//                 <DropdownMenu end>
//                   {/* <DropdownItem>
//                     <Link to="/product">상품 관리 리스트</Link>
//                   </DropdownItem> */}
//                   <DropdownItem>
//                     <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
//                   </DropdownItem>
//                   <DropdownItem>
//                     <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
//                   </DropdownItem>
//                   {/* <DropdownItem>
//                     <Link to="/product">본사 - 보유 상품</Link>
//                   </DropdownItem> */}
//                   {/* <DropdownItem>Option 2</DropdownItem>
//                   <DropdownItem divider />
//                   <DropdownItem>Reset</DropdownItem> */}
                  
//                 </DropdownMenu>
//               </UncontrolledDropdown>

//               <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
//                 <DropdownToggle caret nav style={{ color: 'grey'}}>
//                   발주
//                 </DropdownToggle>
//                 <DropdownMenu end>
//                   <DropdownItem>
//                     <Link to="/order" style={{ textDecoration: 'none', color: 'grey' }}>발주하기</Link>
//                   </DropdownItem>
//                   <DropdownItem>
//                     <Link to="/orderslist" style={{ textDecoration: 'none', color: 'grey' }}>발주내역조회</Link>
//                   </DropdownItem>
//                   {/* <DropdownItem>
//                     <Link to="/storeproductlist">점포 상품 담기 리스트</Link>
//                   </DropdownItem> */}
//                   {/* <DropdownItem>Option 2</DropdownItem>
//                   <DropdownItem divider />
//                   <DropdownItem>Reset</DropdownItem> */}
//                 </DropdownMenu>
//               </UncontrolledDropdown>

//               <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
//                 <DropdownToggle caret nav style={{ color: 'grey'}}>
//                   자동 발주
//                 </DropdownToggle>
//                 <DropdownMenu end>
//                   <DropdownItem>
//                     <Link to="/storeautoorders" style={{ textDecoration: 'none', color: 'grey' }}>사용자설정 자동발주</Link>
//                   </DropdownItem>
//                   <DropdownItem>
//                     <Link to="/eventautoorders" style={{ textDecoration: 'none', color: 'grey' }}>이벤트 자동발주</Link>
//                   </DropdownItem>
//                 </DropdownMenu>
//               </UncontrolledDropdown>

//               <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
//                 <DropdownToggle caret nav style={{ color: 'grey'}}>
//                   매출
//                 </DropdownToggle>
//                 <DropdownMenu end>
//                   {/* <DropdownItem>
//                     <Link to="/sales">매출</Link>
//                   </DropdownItem> */}
//                   <DropdownItem>
//                     <Link to="/sales/listbystore" style={{ textDecoration: 'none', color: 'grey' }}>점포 매출</Link>
//                   </DropdownItem>
//                 </DropdownMenu>
//               </UncontrolledDropdown>


//           {/* <UncontrolledDropdown inNavbar nav className={style.meCustom}>
//             <DropdownToggle caret nav>
//               배송
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>
//                 <Link to="/orderslist">배송</Link>
//               </DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown> */}


//           <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
//             <DropdownToggle caret nav style={{ color: 'grey'}}>
//               이벤트
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>
//               <Link to="/event" style={{ textDecoration: 'none', color: 'grey' }}>이벤트</Link>
//               </DropdownItem>
//               <DropdownItem>
//               <Link to="/sse" style={{ textDecoration: 'none', color: 'grey' }}>sse Test pages</Link>
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>


//           <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
//             <DropdownToggle caret nav style={{ color: 'grey'}}>
//               게시판
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>
//               <Link to="/board" style={{ textDecoration: 'none', color: 'grey'}}>게시판</Link>
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//         </Nav>
//       </Collapse>
//       </Nav>
//       </Collapse>
//     </Navbar>
//     </div>

//   );
// };

// export default Header;

import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Container,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOrderClicked, setIsOrderClicked] = useState(false);

  const handleOrderClick = () => {
    setIsOrderClicked(true);
    console.log("isOrderClicked", isOrderClicked)
  };


  const toggle = () => setIsOpen(!isOpen);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className={`${styles.divHeader} ${styles.navbarCustom}`}>
      <Navbar dark expand="md">
        <div className="d-flex align-items-center">
          <NavbarBrand href="/" className="d-lg-none">
            {/* <LogoWhite /> */}
          </NavbarBrand>
        </div>
        <div className="hstack gap-2">
          <Button
            color="white"
            size="sm"
            className="d-sm-block d-md-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered || isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen || isHovered}>
          <Nav className="me-auto" navbar>
            <Collapse navbar isOpen={isOpen}>
              <Nav className="mx-auto" navbar>
                <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
                  <DropdownToggle caret nav style={{ color: 'grey'}}>
                    상품 관리
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
                  <DropdownToggle caret nav style={{ color: 'grey'}}>
                    발주
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem active={false}>
                      <Link to="/order" active={false}
                                  style={{
                                    textDecoration: 'none', color: 'grey'
                                    // color: isOrderClicked ? 'red' : 'grey',
                                  }}
                                  // onClick={handleOrderClick}
                                  className="text-decoration-none text-secondary"
                      >발주하기</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/orderslist" style={{ textDecoration: 'none', color: 'grey' }}>발주내역조회</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
                  <DropdownToggle caret nav style={{ color: 'grey'}}>
                    자동 발주
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to="/storeautoorders" style={{ textDecoration: 'none', color: 'grey' }}>사용자설정 자동발주</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/eventautoorders" style={{ textDecoration: 'none', color: 'grey' }}>이벤트 자동발주</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
                  <DropdownToggle caret nav style={{ color: 'grey'}}>
                    매출
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to="/sales/listbystore" style={{ textDecoration: 'none', color: 'grey' }}>점포 매출</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
                  <DropdownToggle caret nav style={{ color: 'grey'}}>
                    이벤트
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to="/event" style={{ textDecoration: 'none', color: 'grey' }}>이벤트</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/sse" style={{ textDecoration: 'none', color: 'grey' }}>sse Test pages</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom}>
                  <DropdownToggle caret nav style={{ color: 'grey'}}>
                    게시판
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to="/board" style={{ textDecoration: 'none', color: 'grey'}}>게시판</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                

              </Nav>
            </Collapse>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
