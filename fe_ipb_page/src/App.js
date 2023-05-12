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
    {/* <LoginCookie /> */}

    
    </>
  );
}

export default App;


// export default App;

// import React, { useState } from "react";
// import { useRoutes } from "react-router-dom";
// import Themeroutes from "./routes/Router";
// import Event from "./components/pages/event/Event";


// const App = () => {
//   const routing = useRoutes(Themeroutes);
//   const [logInState, setLogInState] = useState({ isLogIn: false });

//       if( logInState.store_id === 1 ) {
//         <div className="dark">{routing}</div>
//      } else {
//        <Event />
//      }

//   return (

//     <>
//       <div className="dark">{routing}</div>
//     </>
//   );
// }

// export default App;