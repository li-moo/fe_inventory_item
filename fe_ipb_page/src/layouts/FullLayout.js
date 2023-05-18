import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import HeaderTop from "./HeaderTop";

const FullLayout = () => {
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
          {/********header**********/}
          <HeaderTop />
          <Header />
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
