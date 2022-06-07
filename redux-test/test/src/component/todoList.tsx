import React from "react"

import * as S from "./todoList.styles";

import TodoItem from "./todoItem";
import { useSelector } from "react-redux";




const TodoList = () => {
    
    const todos = useSelector((state:any) => state.todos);
    console.log(todos)
    

    const renderItem = () => {
        let html: any[] = [];
        todos.forEach((todo:any) => {
            html.push(
                <TodoItem key={todo.id} todo={todo}/>
            )
        });
        return html
    }

    return (
        <S.Container>
           {
            todos?.map((todo:any) => {
                    <TodoItem key={todo.id} todo={todo}/>
            })
           }
        </S.Container>
    )
}

export default TodoList;