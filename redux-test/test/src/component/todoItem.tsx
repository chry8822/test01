import React from "react";

import { useDispatch } from "react-redux";

import * as S from "./todoItem.styles";
import { delete_todo } from "../redux/actions";

const TodoItem = (todo:any) => {
    const dispatch = useDispatch();
    
    const { id, title, isComplete } = todo;
    console.log(title,id)
 
    const handleClick = () => {
        dispatch(delete_todo(id));
    };


    return (
        <S.Container>
            <S.TextColumn>
                <div>
                    <S.Text>
                        asdfsadf
                       {title}
                    </S.Text>
                    <S.X onClick={handleClick}>{isComplete || "X"}</S.X>
                </div>
            </S.TextColumn>
        </S.Container>

    )
}

export default TodoItem;