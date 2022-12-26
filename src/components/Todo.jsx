import React, { useState } from "react";
import styled from "styled-components";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Todo = ({ todo, deleteTodo, editTodo }) => {
  // const { id, isDone, todoTitle } = todo; 구조분해할당

  const [editOpen, setEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 수정이라는 버튼을 눌렀을 떄 실행이 되는 함수
  const startEdit = () => {
    setEditOpen(true);
    // 기존에 있던 애를 고대로 담아놔라
    setInputValue(todo.todoTitle);
  };

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  // 확인 버튼을 누르면 endEdit이 실행되어라
  const endEdit = () => {
    const data = {
      todoTitle: inputValue,
    };
    // 내가 컨트롤하고 있는 id와 데이터를 보낼건데, axios patch 특성
    editTodo(todo.id, data);
    setEditOpen(false);
  };

  const onCheckToggle = (id) => {
    editTodo(todo.id, { isDone: !todo.isDone });
  };

  return (
    <StyleTodos>
      {!editOpen && (
        <>
          {todo.isDone ? (
            <MdCheckBox
              onClick={() => {
                onCheckToggle(todo.id);
              }}
            />
          ) : (
            <MdCheckBoxOutlineBlank
              onClick={() => {
                onCheckToggle(todo.id);
              }}
            />
          )}
          {todo.isDone ? (
            <StrokedStyledTodo>{todo.todoTitle}</StrokedStyledTodo>
          ) : (
            <StyledTodo>{todo.todoTitle}</StyledTodo>
          )}
        </>
      )}
      {/* <p>{todo.isDone.toString()}</p> */}
      {/* eidtopen 이라는 변수가 true면 오른쪽 걸 실행해라 */}
      {editOpen && (
        <StyledInput value={inputValue} onChange={onChangeInputValue} />
      )}

      {editOpen ? (
        <StyledButton onClick={endEdit}>확인</StyledButton>
      ) : (
        <StyledButton onClick={startEdit}>수정</StyledButton>
      )}
      <StyledButton
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        삭제
      </StyledButton>
    </StyleTodos>
  );
};

export default Todo;

const StyleTodos = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  margin-top: px;
`;

const StyledTodo = styled.div`
  border-radius: 5px;
  color: white;
  background-color: red;
  width: 50%;
  margin-left: 30px;
  padding: 8px;
  background-color: #394a70;
  height: 30px;
`;

const StrokedStyledTodo = styled.div`
  border-radius: 5px;
  color: white;
  background-color: red;
  width: 50%;
  margin-left: 30px;
  padding: 8px;
  background-color: #394a70;
  height: 30px;
  text-decoration: line-through;
`;

const StyledButton = styled.button`
  background: none;
  border-radius: 5px;
  color: orange;
  border: 2px solid;
  width: 60px;
  height: 50px;
  margin-left: 15px;

  /* font-size: 18px; */
  transition: color 0.5s, border-color 0.5s, transform 0.5s;

  &:hover {
    border-color: black;
    border-radius: 5px;
    color: black;
    box-shadow: 0 0.5em 0.5em -0.4em;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  border-radius: 5px;
  color: black;
  width: 50%;
  margin-left: 30px;
  padding: 8px;
`;

// const CheckBox = styled.div`
//   width: 50px;
//   height: 50px;
//   background: red;
// `;

// const CheckBoxOutlineBlank = styled.div`
//   width: 50px;
//   height: 50px;
//   background: blue;
// `;
