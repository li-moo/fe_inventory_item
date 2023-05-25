import { useState, useEffect } from "react";

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{currentDate.toLocaleTimeString()}</>;
}

// 원래는 js로 작성했으나 오류가 나서 컴포넌트로 작성함

// 오류 메세지
// React Hook "useState" is called in function "currentDate" that is neither a React function component nor a custom React Hook function.