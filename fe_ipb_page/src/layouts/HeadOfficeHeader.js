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
import style from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    // <div className={style.divHeader}>
    // <div className={`${style.divHeader} ${style.navbarCustom} ${style.bgSecondary}`}>
    <div className={`${style.divHeader} ${style.navbarCustom}`}>
      {/* <Navbar color="primary" dark expand="md"> */}
      <Navbar dark expand="md">
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
                  <DropdownItem  >
                    <Link to="/product" style={{ textDecoration: 'none', color: 'grey' }} >상품조회</Link>
                  </DropdownItem>
                  <DropdownItem >
                    <Link to="/product/add" style={{ textDecoration: 'none', color: 'grey' }} >상품등록</Link>
                  </DropdownItem>
                  <DropdownItem  >
                    <Link to="/productinfolist" style={{ textDecoration: 'none', color: 'grey' }}>상품기본정보</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  발주
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem  >
                    <Link to="/headofficeorderlist" style={{ textDecoration: 'none', color: 'grey' }} >발주내역조회</Link>
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
                  <DropdownItem >
                    <Link to="/event" style={{ textDecoration: 'none', color: 'grey' }} >이벤트</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  게시판
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem >
                    <Link to="/board" style={{ textDecoration: 'none', color: 'grey' }} >게시판 </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  점포
                </DropdownToggle>
                <DropdownMenu end >
                  <DropdownItem>
                    <Link to="/store" style={{ textDecoration: 'none', color: 'grey' }} > 점포조회 </Link>
                  </DropdownItem>
                  <DropdownItem >
                    <Link to="/store/add" style={{ textDecoration: 'none', color: 'grey' }} > 점포등록 </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  직원
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem >
                    <Link to="/staff" style={{ textDecoration: 'none', color: 'grey' }} >직원조회</Link>
                  </DropdownItem>
                  <DropdownItem >
                    <Link to="/staff/add" style={{ textDecoration: 'none', color: 'grey' }} >직원등록</Link>
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