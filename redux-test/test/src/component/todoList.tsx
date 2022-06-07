import React from "react";

import * as S from "./todoList.styles";

import TodoItem from "./todoItem";
import { useSelector } from "react-redux";

const TodoList = () => {
  const  todos  = useSelector((state: any) => state.todos);

  console.log(todos)

  return (
    <S.Container>
     {
       todos.map((todo: any) => {
        return <TodoItem key={todo.id} todo={todo} />
       })

     }
    </S.Container>
  );
};

export default TodoList;
