import React, { useState, useEffect } from 'react';
import BoardList from './BoardList';
import BoardListStore from './BoardListStore';


function Board() {

  return (
    <>
    <h2>자유 게시판</h2>
    <BoardList />
    </>
  );
}

export default Board;


// react-router-dom 라이브러리를 사용하여 페이지 라우팅을 구현하면 됩니다.
// 게시물 내용을 보여주는 컴포넌트 
// 이 컴포넌트는 URL의 파라미터를 사용하여 어떤 게시물을 보여줄지 결정합니다.
//  이를 위해 react-router-dom의 useParams 훅을 사용합니다.