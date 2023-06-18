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
import styles from "./Header2020.module.css";

const Header2020 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOrderClicked, setIsOrderClicked] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  // const createDeliveryAddress = () => {
  //   // Handle the logic for creating a delivery address here
  //   console.log("Creating a delivery address...");
  // };

  const mainToggle = {
    color: '#FFFAEE',
    fontSize: '16px',
    fontWeight: 600,
  };

  const mainToggleHover = {
    color: 'blue',
  };


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
            // color="white"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={toggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered || isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-arrow-down-circle"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen || isHovered}>
          <Nav className="me-auto" navbar>
            <Collapse navbar isOpen={isOpen}>
              <Nav className="mx-auto" navbar>
                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav
                    style={mainToggle}
                  >
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
                  <DropdownToggle caret nav style={mainToggle}>
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
                  <DropdownToggle caret nav style={mainToggle}>
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
                  <DropdownToggle caret nav style={mainToggle}>
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
                  <DropdownToggle caret nav style={mainToggle}>
                    이벤트
                  </DropdownToggle>
                  <DropdownMenu >
                    <div className={styles.dropItemList}>
                      <DropdownItem>
                        <div>
                          <Link to="/event" style={{ textDecoration: 'none', color: 'grey' }}>이벤트</Link>
                        </div>
                      </DropdownItem>
                      {/* <DropdownItem>
                        <div>
                          <Link to="/sse" style={{ textDecoration: 'none', color: 'grey' }}>sse Test pages</Link>
                        </div>
                      </DropdownItem> */}

                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown inNavbar nav className={styles.meCustom} >
                  <DropdownToggle caret nav style={mainToggle}>
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

export default Header2020;