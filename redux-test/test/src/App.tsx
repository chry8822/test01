import React from 'react';
import * as S from "./App.styles";
import './App.css';

import InputForm from "./component/inputForm"
import TodoList from './component/todoList';

function App() {
  return (
   <S.Container>
     <S.Wrapper>
        <h1>Redux</h1>
        <InputForm />
        <TodoList />
     </S.Wrapper>
   </S.Container>
  );
}

export default App;
