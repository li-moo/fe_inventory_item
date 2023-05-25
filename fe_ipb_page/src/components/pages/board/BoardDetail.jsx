// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button, Modal } from "antd";
// import { Link } from 'react-router-dom';
// import { Form, Input } from 'antd';

// function BoardDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [board, setBoard] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:8080/board/detail?id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setBoard(data);
//       })
//       .catch(err => console.log(err))
//   }, [id]);

//   const handleDelete = () => {
//     fetch(`http://localhost:8080/board/delete?id=${id}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         navigate('/board');
//       })
//       .catch(err => console.log(err));
//   };

//   const showModalWindow = () => {
//     setShowModal(true);
//   };

//   const hideModalWindow = () => {
//     setShowModal(false);
//   };

//   if (!board) {
//     return null;
//   }

//   return (
//     <>
//       <div>
//         <div>
//           <h2>{board.name}</h2>
//           <Form>
//             <Form.Item label="제목">
//               <Input value={board.title}  readOnly/>
//             </Form.Item>
//             <Form.Item label="내용">
//               <Input.TextArea value={board.body_text} rows={10} autoSize={false} readOnly />
//             </Form.Item>
//             <Form.Item label="작성자">
//               <Input value={board.staff_id}  readOnly />
//             </Form.Item>
//           </Form>
//         </div>
//       </div>

//       {/* 삭제 버튼 */}
//       <Button type="primary" onClick={showModalWindow}>
//         삭제
//       </Button>

//       {/* 수정 버튼 */}
//       <Button type="primary" style={{ marginLeft: '10px' }}>
//         <Link to={`/board/edit/${id}`}>수정</Link>
//       </Button>

//       {/* 모달 */}
//       <Modal
//         title="삭제 확인"
//         visible={showModal}
//         onCancel={hideModalWindow}
//         onOk={handleDelete}
//       >
//         <p>게시물을 삭제하시겠습니까?</p>
//       </Modal>
//     </>
//   );
// }

// export default BoardDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Divider } from "antd";
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import styles from './BoardDetail.module.css'

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/board/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setBoard(data);
        console.log("보드 디테일 data:", data);
      })
      .catch(err => console.log(err))
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:8080/board/delete?id=${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/board');
      })
      .catch(err => console.log(err));
  };

  const showModalWindow = () => {
    setShowModal(true);
  };

  const hideModalWindow = () => {
    setShowModal(false);
  };

  if (!board) {
    return null;
  }

  return (
    <>
      <div>
        <div>
          <h2>{board.title}</h2>
          <div className={styles.dede}>
          <p>작성자: {board.name}</p>
          <p>작성일: {board.write_date}</p>
          </div>
          <Form>
            {/* <Form.Item label="제목">
              <Input value={board.title}  readOnly/>
            </Form.Item> */}
            <Form.Item>
              <Input.TextArea value={board.body_text} rows={10} autoSize={false} readOnly />
            </Form.Item>
            {/* <Form.Item label="작성자">
              <Input value={board.staff_id}  readOnly />
            </Form.Item> */}
          </Form>
        </div>
      </div>
      <div className={styles.Btn3}>
      <Button type="primary">
        <Link to={`/board`}>목록으로 </Link>
      </Button>
      {/* 삭제 버튼 */}
      <Button type="primary" onClick={showModalWindow}>
        삭제
      </Button>

      {/* 수정 버튼 */}
      <Button type="primary" style={{ marginLeft: '10px' }}>
        <Link to={`/board/edit/${id}`}>수정</Link>
      </Button>
      </div>

      {/* 모달 */}
      <Modal
        title="삭제 확인"
        visible={showModal}
        onCancel={hideModalWindow}
        onOk={handleDelete}
      >
        <p>게시물을 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}

export default BoardDetail;
