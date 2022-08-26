import React,{useState, useEffect, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [showResult, setShowResult] = useState<any>();

  let data = ["a","b","c","d","e","f","g",];

  // let test:any[] = data.map((item:any,idx:any) => {
  //   return item;
  // })

let music:any[] = ["Jazz","Blues"];
// music.push("Rock-n-Roll");
// music[Math.floor((music.length - 1)/ 2 )] = 'Classic'
// music.shift();
// music.unshift('Rap','Reggae')





useEffect(() => {
  // if(test.length === 7 && test){
    // setShowResult(music)
  // }
},[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p dangerouslySetInnerHTML={{__html:showResult}}>
          
        </p>
      </header>
    </div>
  );
}

export default App;
