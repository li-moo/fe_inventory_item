// import React from 'react';

// function MyModal() {
//   return (
//     <div className="modal">
//       <h2>제목</h2>
//       <p>날짜</p>
//       <p>상세 내용</p>
//     </div>
//   );
// }

// export default MyModal;

import React from 'react';

function MyModal({ isOpen, handleOk, handleCancel }) {
  return (
    <div>
      {isOpen && (
        <div className="modal">
          <h2>제목</h2>
          <p>모달 내용</p>
          <button onClick={handleOk}>확인</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      )}
    </div>
  );
}

export default MyModal;