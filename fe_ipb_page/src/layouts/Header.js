// import React from "react";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   // NavItem,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   // Dropdown,
//   Button,
// } from "reactstrap";
// //import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
// //import user1 from "../assets/images/users/user1.jpg";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   // const [dropdownOpen, setDropdownOpen] = React.useState(false);
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => {
//     setIsOpen(!isOpen);
//   };
//   const showMobilemenu = () => {
//     // document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };
//   return (
//     <Navbar color="dark" dark expand="md">
//       <div className="d-flex align-items-center">
//         <NavbarBrand href="/" className="d-lg-none">
//           {/* <LogoWhite /> */}
//         </NavbarBrand>
//         {/* <Button
//           color="dark"
//           className="d-lg-none"
//           onClick={() => showMobilemenu()}
//         >
//           <i className="bi bi-list"></i>
//         </Button> */}
//       </div>
//       <div className="hstack gap-2">
//         <Button
//           color="dark"
//           size="sm"
//           className="d-sm-block d-md-none"
//           onClick={Handletoggle}
//         >
//           {isOpen ? (
//             <i className="bi bi-x"></i>
//           ) : (
//             <i className="bi bi-three-dots-vertical"></i>
//           )}
//         </Button>
//       </div>

//       <Collapse navbar isOpen={isOpen}>
//       {/* <Collapse> */}
//         <Nav className="me-auto" navbar>
//           {/* <NavItem>
//             <Link to="/starter" className="nav-link">
//               Starter
//             </Link>
//           </NavItem>
//           <NavItem>
//             <Link to="/about" className="nav-link">
//               About
//             </Link>
//           </NavItem> */}

//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               상품 관리
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>
//                 <Link to="/product" 
//                   style={{ textDecoration: 'none', color: 'black' }}>
//                     상품 관리 리스트  </Link>
//               </DropdownItem>
//               <DropdownItem>
//                 점포 보유 상품 리스트
//               </DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               발주
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>
//               <Link to="/order">점포 발주</Link>
//               </DropdownItem>
//               <DropdownItem>
//               <Link to="/storeproductlist">점포 상품 담기 리스트</Link>
//               </DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               매출
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>Option 1</DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               배송
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>Option 1</DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               이벤트
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>
//               <Link to="/event">이벤트</Link>
//               </DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               게시판
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>Option 1</DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </Nav>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default Header;

import React from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";
// import { Icon } from "react-bootstrap-icons";
import style from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const createDeliveryAddress = () => {
    // Handle the logic for creating a delivery address here
    console.log("Creating a delivery address...");
  };

  return (
    <Navbar color="primary" dark expand="md" className={"navbar-custom bg-secondary"}>
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          {/* <LogoWhite /> */}
        </NavbarBrand>
      </div>
      <div className="hstack gap-2">
        <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={toggle}
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
          <Collapse navbar isOpen={isOpen}>
            <Nav className="mx-auto" navbar>
              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  상품 관리
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/product">상품 관리 리스트</Link>
                  </DropdownItem>
                  <DropdownItem>점포 보유 상품 리스트</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  발주
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/order">점포 발주</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/storeproductlist">점포 상품 담기 리스트</Link>
                  </DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  매출
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/sales">매출</Link>
                  </DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>


          <UncontrolledDropdown inNavbar nav className={style.meCustom}>
            <DropdownToggle caret nav>
              배송
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <Link to="/orderslist">배송</Link>
              </DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>


          <UncontrolledDropdown inNavbar nav className={style.meCustom}>
            <DropdownToggle caret nav>
              이벤트
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
              <Link to="/event">이벤트</Link>
              </DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>


          <UncontrolledDropdown inNavbar nav className={style.meCustom}>
            <DropdownToggle caret nav>
              게시판
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown inNavbar nav className={style.meCustom}>
            <DropdownToggle caret nav>
              점포
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <Link to='/store'>
                조회
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

        </Nav>
      </Collapse>
      </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;