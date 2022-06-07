import React from "react"

import * as S from "./todoList.styles";

import TodoItem from "./todoItem";
import { useSelector } from "react-redux";


const TodoList = () => {
    const todos = useSelector((state:any) => state.todos);

    return (
        <S.Container>
            {todos && todos.map((todo:any) => {
                <TodoItem key={todo.id} todo={todo}></TodoItem>
            })}
        </S.Container>
    )
}

export default TodoList;