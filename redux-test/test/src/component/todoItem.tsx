import React from "react";

import { useDispatch } from "react-redux";

import * as S from "./todoItem.styles";
import { delete_todo } from "../redux/actions";

const TodoItem = ( props: any) => {
  const dispatch = useDispatch();

  const { id, title, isComplete } = props.todo;

  const handleClick = () => {
    dispatch(delete_todo(id));
  };
 
  return (
    <S.Container>
      <S.TextColumn>
        <div>
          <S.Text>{title}</S.Text>
          <S.X onClick={handleClick}>{isComplete || "X"}</S.X>
        </div>
      </S.TextColumn>
    </S.Container>
  );
};

export default TodoItem;
