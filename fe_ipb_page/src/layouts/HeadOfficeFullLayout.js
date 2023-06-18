import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar";
import HeadOfficeHeader from "./HeadOfficeHeader";
import { Container } from "reactstrap";
import HeaderTop from "./HeadOfficeHeaderTop";

const FullLayout = () => {
  const location = useLocation();

  // 로그인 페이지인 경우에는 HeaderTop과 Header를 숨깁니다.
  const isLoginPage = location.pathname === "/login";
  const shouldShowHeader = !isLoginPage;

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/* // sidebar주석 처리시 안나옴  */}
        {/********Sidebar**********/}
        {/* <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside> */}
        {/********Content Area**********/}
        <div className="contentArea">
          {shouldShowHeader && (
            <>
              <HeaderTop />
              <HeadOfficeHeader />
            </>
          )}
          {/********Middle Content**********/}
          {/* //Outlet은 React Router v6에서 새로 추가된 컴포넌트
          // 중첩된 라우트를 렌더링할 때 사용 */}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
