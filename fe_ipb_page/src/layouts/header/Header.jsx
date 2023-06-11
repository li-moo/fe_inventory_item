
// import React, { useState } from "react";
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
// import 'bootstrap/dist/css/bootstrap.css';
// import { Link } from "react-router-dom";
// import styles from "./Header.module.css";

// const Header = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [isHovered, setIsHovered] = React.useState(false);
//   const [isOrderClicked, setIsOrderClicked] = useState(false);

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleOrderClick = () => {
//     setIsOrderClicked(true);
//     console.log("isOrderClicked", isOrderClicked)
//   };

//   const toggle = () => setIsOpen(!isOpen);

//   // const toggle = () => {
//   //   setDropdownOpen((prevState) => !prevState);
//   //   if (!dropdownOpen) {
//   //   }
//   // };

//   const handleMouseEnter = () => setIsHovered(true);
//   // const handleMouseEnter = () => {
//   //   if (!isOpen) {
//   //     setTimeout(() => {
//   //       setIsHovered(true);
//   //     }, 3);
//   //   }
//   // };

//   const handleMouseLeave = () => setIsHovered(false);

//   return (
//     <div className={`${styles.divHeader} ${styles.navbarCustom}`}>
//       <Navbar dark expand="md">
//         <div className="d-flex align-items-center">
//           <NavbarBrand href="/" className="d-lg-none">
//             {/* <LogoWhite /> */}
//           </NavbarBrand>
//         </div>
//         <div className="hstack gap-2">
//           <Button
//             color="white"
//             size="sm"
//             className="d-sm-block d-md-none"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           // onClick={setIsHovered(!isHovered)}
//           >
//             {isHovered || isOpen ? (
//               <i className="bi bi-x"></i>
//             ) : (
//               <i className="bi bi-three-dots-vertical"></i>
//             )}
//           </Button>
//         </div>

//         {/* <Collapse navbar isOpen={isOpen || isHovered} style={{ position: 'fixed' }}> */}
//         <Collapse navbar isOpen={isOpen || isHovered} >
//           <Nav className="me-auto" navbar>

//             {/* <UncontrolledDropdown inNavbar nav className={styles.meCustom}> */}
//             {/* <UncontrolledDropdown isOpen={isOpen} toggle={toggle} id='top-myDrop--i'> */}
//             {/* <UncontrolledDropdown inNavbar nav className={styles.meCustom} isOpen={dropdownOpen} toggle={toggle} > */}
//             <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
//               <DropdownToggle caret nav style={{ color: 'grey' }} >
//                 상품 관리
//               </DropdownToggle>
//               {/* <DropdownMenu end onClick={() => { setDropdownOpen(!dropdownOpen); }}> */}
//               <DropdownMenu end>
//                 {/* <div className={styles.dropItemList}>
//                   <div onClick={() => { setIsOpen(false); }}>
//                     <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
//                   </div>
//                   <div isOpen={isOpen} toggle={toggle}>
//                     <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
//                   </div>
//                 </div> */}
//                 {/* <div className={styles.dropItemList} onClick={() => { isOpen = { isOpen }; toggle = { toggle }; }}> */}
//                 <div className={styles.dropItemList} >
//                   <DropdownItem >
//                     <div >
//                       <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
//                     </div>
//                   </DropdownItem>
//                   <DropdownItem >
//                     <div >
//                       <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
//                     </div>
//                   </DropdownItem>
//                   {/* <div >
//                     <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
//                   </div>
//                   <div >
//                     <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
//                   </div> */}
//                 </div>

//               </DropdownMenu>
//             </UncontrolledDropdown>

//             <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
//               <DropdownToggle caret nav style={{ color: 'grey' }}>
//                 발주
//               </DropdownToggle>
//               <DropdownMenu end >
//                 <div className={styles.dropItemList}>
//                   <DropdownItem>
//                     <div active={false}>
//                       <Link to="/order" active={false}
//                         style={{
//                           textDecoration: 'none', color: 'grey'
//                           // color: isOrderClicked ? 'red' : 'grey',
//                         }}

//                       >발주하기</Link>
//                     </div>
//                   </DropdownItem>

//                   <DropdownItem>

//                     <div>
//                       <Link to="/orderslist" style={{ textDecoration: 'none', color: 'grey' }}>발주내역조회</Link>
//                     </div>
//                   </DropdownItem>
//                 </div>

//               </DropdownMenu>
//             </UncontrolledDropdown>

//             <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
//               <DropdownToggle caret nav style={{ color: 'grey' }}>
//                 자동 발주
//               </DropdownToggle>
//               <DropdownMenu end >
//                 <div className={styles.dropItemList}>
//                   <DropdownItem>
//                     <div>
//                       <Link to="/storeautoorders" style={{ textDecoration: 'none', color: 'grey' }}>사용자설정 자동발주</Link>
//                     </div>
//                   </DropdownItem>
//                   <DropdownItem>
//                     <div>
//                       <Link to="/eventautoorders" style={{ textDecoration: 'none', color: 'grey' }}>이벤트 자동발주</Link>
//                     </div>
//                   </DropdownItem>

//                 </div>

//               </DropdownMenu>
//             </UncontrolledDropdown>

//             <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
//               <DropdownToggle caret nav style={{ color: 'grey' }}>
//                 매출
//               </DropdownToggle>
//               <DropdownMenu end >
//                 <div className={styles.dropItemList}>
//                   <DropdownItem>
//                     <div>
//                       <Link to="/sales/listbystore" style={{ textDecoration: 'none', color: 'grey' }}>점포 매출</Link>
//                     </div>
//                   </DropdownItem>

//                 </div>

//               </DropdownMenu>
//             </UncontrolledDropdown>

//             <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
//               <DropdownToggle caret nav style={{ color: 'grey' }}>
//                 이벤트
//               </DropdownToggle>
//               <DropdownMenu >
//                 <div className={styles.dropItemList}>
//                   <DropdownItem>
//                     <div>
//                       <Link to="/event" style={{ textDecoration: 'none', color: 'grey' }}>이벤트</Link>
//                     </div>
//                   </DropdownItem>
//                   <DropdownItem>
//                     <div>
//                       <Link to="/sse" style={{ textDecoration: 'none', color: 'grey' }}>sse Test pages</Link>
//                     </div>
//                   </DropdownItem>

//                 </div>

//               </DropdownMenu>
//             </UncontrolledDropdown>

//             <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
//               <DropdownToggle caret nav style={{ color: 'grey' }}>
//                 게시판
//               </DropdownToggle>
//               <DropdownMenu end >
//                 <div className={styles.dropItemList}>
//                   <DropdownItem>
//                     <div>
//                       <Link to="/board" style={{ textDecoration: 'none', color: 'grey' }}>게시판</Link>
//                     </div>
//                   </DropdownItem>

//                 </div>

//               </DropdownMenu>
//             </UncontrolledDropdown>

//             {/* <div className={styles.dropdown}>
//                   <button className={styles.dropbtn}>
//                     <span className={styles.dropbtn_icon}>more_horiz</span>
//                     View More
//                   </button>
//                   <div className={styles.dropdowncontent}>
//                     <a href="#">profile</a>
//                     <a href="#">write a post</a>
//                     <a href="#">settings</a>
//                   </div>
//                 </div> */}

//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div >
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
import { Link } from "react-router-dom";
// import { Icon } from "react-bootstrap-icons";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOrderClicked, setIsOrderClicked] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  // const createDeliveryAddress = () => {
  //   // Handle the logic for creating a delivery address here
  //   console.log("Creating a delivery address...");
  // };

  return (
    // <div className={style.divHeader}>
    // <div className={`${style.divHeader} ${style.navbarCustom} ${style.bgSecondary}`}>
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
            onClick={toggle}
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
                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={{ color: 'grey' }} >
                    상품 관리
                  </DropdownToggle>
                  {/* <DropdownMenu end onClick={() => { setDropdownOpen(!dropdownOpen); }}> */}
                  <DropdownMenu end>
                    {/* <div className={styles.dropItemList}>
                  <div onClick={() => { setIsOpen(false); }}>
                  <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
                   </div>
                   <div isOpen={isOpen} toggle={toggle}>
                     <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
                   </div>
                 </div> */}
                    {/* <div className={styles.dropItemList} onClick={() => { isOpen = { isOpen }; toggle = { toggle }; }}> */}
                    <div className={styles.dropItemList} >
                      <DropdownItem >
                        <div >
                          <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
                        </div>
                      </DropdownItem>
                      <DropdownItem >
                        <div >
                          <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
                        </div>
                      </DropdownItem>
                      {/* <div >
                    <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
                   </div>
                   <div >
                     <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
                 </div> */}
                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={{ color: 'grey' }}>
                    발주
                  </DropdownToggle>
                  <DropdownMenu end >
                    <div className={styles.dropItemList}>
                      <DropdownItem>
                        <div active={false}>
                          <Link to="/order" active={false}
                            style={{
                              textDecoration: 'none', color: 'grey'
                              // color: isOrderClicked ? 'red' : 'grey',
                            }}

                          >발주하기</Link>
                        </div>
                      </DropdownItem>

                      <DropdownItem>

                        <div>
                          <Link to="/orderslist" style={{ textDecoration: 'none', color: 'grey' }}>발주내역조회</Link>
                        </div>
                      </DropdownItem>
                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={{ color: 'grey' }}>
                    자동 발주
                  </DropdownToggle>
                  <DropdownMenu end >
                    <div className={styles.dropItemList}>
                      <DropdownItem>
                        <div>
                          <Link to="/storeautoorders" style={{ textDecoration: 'none', color: 'grey' }}>사용자설정 자동발주</Link>
                        </div>
                      </DropdownItem>
                      <DropdownItem>
                        <div>
                          <Link to="/eventautoorders" style={{ textDecoration: 'none', color: 'grey' }}>이벤트 자동발주</Link>
                        </div>
                      </DropdownItem>

                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={{ color: 'grey' }}>
                    매출
                  </DropdownToggle>
                  <DropdownMenu end >
                    <div className={styles.dropItemList}>
                      <DropdownItem>
                        <div>
                          <Link to="/sales/listbystore" style={{ textDecoration: 'none', color: 'grey' }}>점포 매출</Link>
                        </div>
                      </DropdownItem>

                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={{ color: 'grey' }}>
                    이벤트
                  </DropdownToggle>
                  <DropdownMenu >
                    <div className={styles.dropItemList}>
                      <DropdownItem>
                        <div>
                          <Link to="/event" style={{ textDecoration: 'none', color: 'grey' }}>이벤트</Link>
                        </div>
                      </DropdownItem>
                      <DropdownItem>
                        <div>
                          <Link to="/sse" style={{ textDecoration: 'none', color: 'grey' }}>sse Test pages</Link>
                        </div>
                      </DropdownItem>

                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={{ color: 'grey' }}>
                    게시판
                  </DropdownToggle>
                  <DropdownMenu end >
                    <div className={styles.dropItemList}>
                      <DropdownItem>
                        <div>
                          <Link to="/board" style={{ textDecoration: 'none', color: 'grey' }}>게시판</Link>
                        </div>
                      </DropdownItem>

                    </div>

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