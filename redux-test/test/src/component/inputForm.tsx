import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./inputForm.styles";
import { add_todo } from "../redux/actions";

const InputForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setText(value);
  };

  const handleClick = () => {
    const todo = {
      title: text,
      isComplete: false,
    };

    dispatch(add_todo(todo));
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <S.Container>
      <S.InputBox
        type="text"
        placeholder="writing!!"
        onChange={handleChange}
        value={text}
        onKeyDown={handleKeyPress}
      />
      <S.Button onClick={handleClick}>추가 하기</S.Button>
    </S.Container>
  );
};

export default InputForm;
