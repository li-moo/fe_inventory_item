import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { logInState } from "./components/state/loginState";
import { useRecoilState } from 'recoil';
import LoginCookie from "./components/pages/cookie/LoginCookie";


const App = () => {
  const routing = useRoutes(Themeroutes);

  return (

    <>
    <div className="dark">{routing}</div>
    </>
  );
}

export default App;
