import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import HeadOfficeMain from "./HeadOfficeMain";
import { useRecoilState } from 'recoil';
import { logInState } from '../src/components/state/loginState';
// import 'antd/dist/antd.css';


const App = () => {
  const routing = useRoutes(Themeroutes);
  const [logInData, setLogInData] = useRecoilState(logInState);
  if (logInData.store_id === 1) {
    return (
    <>
      <HeadOfficeMain/>
    </>)
  }
  return (
    <div style={{backgroundColor: 'white'}}>
    {/* <div> */}
      {/* <div className="dark">{routing}</div> */}
      <div>{routing}</div>
    </div>
  );
}

export default App;
