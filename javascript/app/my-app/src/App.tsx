import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let list:number[] = [0,1,2,3,4,5,6,7,8,9];
  let number:any = [];

  for(let i = 0; i < 4; i++){
    let select = Math.floor(Math.random() * list.length);
    number[i] = list.splice(select, 1)[0];
  }

  let count:number = 0;
  let strike:number = 0;
  let ball:number = 0;
  while(count < 10){
    let input:any = prompt("input number");
    let inputArray = input.split('');
    strike = 0;
    ball = 0;
    count ++;
    for (let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(number[i] == inputArray[j]){
          if(i === j){
            strike++
          }else{
            ball++
          }
          break;
        }
      }
    }
    if(strike === 4){
      alert("HomeRun!!" + "for count" + (count - 1) )
      break;
    }else if(count >= 10){
      console.error('count over')
    }else {
      alert(inputArray.join('') + ': ' + strike + ": strike " + ball + ": ball ")
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
    </div>
  );
}

export default App;
