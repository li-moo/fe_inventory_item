import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/HeadOfficeRouter";


const HeadOfficeMain = () => {
  const headOfficeRouting = useRoutes(Themeroutes);

  return (

    <>
    <div className="dark">{headOfficeRouting}</div>
    </>
  );
}

export default HeadOfficeMain;