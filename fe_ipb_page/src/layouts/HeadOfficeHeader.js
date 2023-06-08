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
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
// import { Icon } from "react-bootstrap-icons";
import style from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const createDeliveryAddress = () => {
  //   // Handle the logic for creating a delivery address here
  //   console.log("Creating a delivery address...");
  // };

  return (
    // <div className={style.divHeader}>
    // <div className={`${style.divHeader} ${style.navbarCustom} ${style.bgSecondary}`}>
    <div className={`${style.divHeader} ${style.navbarCustom}`}>
      <Navbar color="primary" dark expand="md">
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
                    <Link to="/product">상품조회</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/product/add">상품등록</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/productinfolist">상품기본정보</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  발주
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/headofficeorderlist">발주내역조회</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  매출
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/sales/listbystore">전체 매출</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  이벤트
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/event">이벤트</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  게시판
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/board">게시판 </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  점포
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/store"> 점포조회 </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/store/add"> 점포등록 </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  직원
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/staff">직원조회</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/staff/add">직원등록</Link>
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