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
                  {/* <DropdownItem>
                    <Link to="/product">상품 관리 리스트</Link>
                  </DropdownItem> */}
                  <DropdownItem>
                    <Link to="/storeproductlist">재고 관리</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/storeexp">유통기한 관리</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/product">본사 - 보유 상품</Link>
                  </DropdownItem>
                  {/* <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem> */}
                  
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  발주
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link to="/order">발주하기</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/orderslist">발주내역조회</Link>
                  </DropdownItem>
                  {/* <DropdownItem>
                    <Link to="/storeproductlist">점포 상품 담기 리스트</Link>
                  </DropdownItem> */}
                  {/* <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown inNavbar nav className={style.meCustom}>
                <DropdownToggle caret nav>
                  매출
                </DropdownToggle>
                <DropdownMenu end>
                  {/* <DropdownItem>
                    <Link to="/sales">매출</Link>
                  </DropdownItem> */}
                  <DropdownItem>
                    <Link to="/sales/listbystore">점포 매출</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>


          {/* <UncontrolledDropdown inNavbar nav className={style.meCustom}>
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
          </UncontrolledDropdown> */}


          <UncontrolledDropdown inNavbar nav className={style.meCustom}>
            <DropdownToggle caret nav>
              이벤트
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
              <Link to="/event">이벤트</Link>
              </DropdownItem>
              <DropdownItem>
              <Link to="/sse">sse Test pages</Link>
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
              <DropdownItem>
              <Link to="/headOffice/board">본사 - 게시판 </Link>
              </DropdownItem>
              <DropdownItem>
              <Link to="/board">점포 - 게시판 </Link>
              </DropdownItem>
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
    </div>

  );
};

export default Header;