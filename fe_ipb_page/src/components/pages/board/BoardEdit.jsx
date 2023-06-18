import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, Modal, Input, Form } from 'antd';

const { TextArea } = Input;

function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: '',
    body_text: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_API}/board/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setBoard(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBoard(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Open the confirmation modal before submitting the update
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // API 호출하여 게시물 업데이트 수행
    fetch(`${process.env.REACT_APP_BE_API}/board/update?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    })
      .then(() => {
        navigate(`/board`);
      })
      .catch(err => console.log(err));
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <h2>게시글 수정</h2>
      <Divider />
      <p>작성자: {board.name}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Form.Item label="제목" value={board.title}>
            <Input
              type="text"
              name="title"
              value={board.title}
              onChange={handleChange}
              className="input"
            />
          </Form.Item>
          {/* <Form.Item label="내용" name="body_text" value={board.body_text} onChange={handleChange}>
            <TextArea 
              rows={11} 
            />
        </Form.Item> */}
        </div>
        <div className="form-group">
          <label className="label">내용:</label>
          <TextArea
            rows={8}
            name="body_text"
            value={board.body_text}
            onChange={handleChange}
            className="textarea"
          />
          {/* <textarea
            name="body_text"
            value={board.body_text}
            onChange={handleChange}
            className="textarea"
          /> */}
        </div>
        <button type="submit" className="submit-button">수정 완료</button>
      </form>

      {/* Confirmation Modal */}

      <Modal
        title="수정 확인"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="수정"
        cancelText="취소"
      >
        <p>게시물을 수정하시겠습니까?</p>
      </Modal>
    </div>
  );
}

export default BoardEdit;