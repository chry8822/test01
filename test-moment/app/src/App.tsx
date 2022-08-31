import React from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

function App() {
  // 현재 시간
  let curDate = new Date();
  // add() 현재 시간에 년,월,일,시,분,초 등 더하거나 마이너스(-) 를 사용하면 빼기를 할수있다.
  console.log((moment(curDate.getTime()).add("-32","y").format("YYYY-MM-DD")))
  // substract() 현재 시간에서 add 와 반대로 동작함
  console.log((moment(curDate.getTime()).subtract("32","y").format("YYYY-MM-DD")))

  let a = moment(curDate);
  let b = a.clone().add("-1","y");

  // a 와 b 의 날짜 차이
  console.log(a.diff(b, "day"))
  console.log(a.diff(b,"year"))


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
