import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Divider, Typography } from "antd";
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import styles from './BoardDetail.module.css'
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";

const { Title, Paragraph, Text } = Typography;


function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [logInData, setLogInData] = useRecoilState(logInState);

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

  const isAuthorized = logInData.store_id === 1;

  return (
    <>
      <Typography>
      <div>
        <div>
          <Title>{board.title}</Title>
          <div className={styles.dede}>
            <p>작성자: {board.name}</p>
            <p>작성일: {moment(board.write_date).format('YYYY년 MM월 DD일')}</p>
          </div>
          <div>
            <img src={board.imgname}/>
            <Paragraph style={{ width: '65%' }}>
              {board.body_text}
            </Paragraph>
          </div>
        </div>
      </div>
      </Typography>

      <div className={styles.Btn3}>
      <Button type="primary">
        <Link to={`/board`}>목록으로 </Link>
      </Button>

      {isAuthorized && (
          // 수정 버튼
          <Button type="primary" style={{ marginLeft: '10px' }}>
            <Link to={`/board/edit/${id}`}>수정</Link>
          </Button>
        )}

        {isAuthorized && (
          // 삭제 버튼
          <Button type="primary" onClick={showModalWindow}>
            삭제
          </Button>
        )}
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
