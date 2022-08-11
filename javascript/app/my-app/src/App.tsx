import React,{ useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputNumber, setInput] = useState<any>("")
  const [number, setNumber] = useState<any>([])

  let list:number[] = [0,1,2,3,4,5,6,7,8,9];
  

useEffect(() => {
  let inNumber:any = []
  for(let i = 0; i < 4; i++){
    let select = Math.floor(Math.random() * list.length);
    if(number.length < 5){
        inNumber[i] = list.splice(select, 1)[0]
        setNumber(inNumber)
      }
    }
  },[])

  let strike:number = 0;
  let ball:number = 0;
  let testCount = 0 ;

const test = () => {
  if(testCount <= 10){
    let input:any = inputNumber;
    let inputArray:any = input.split('');
    strike = 0;
    ball = 0;
    testCount++
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
      console.log("HomeRun!!" + "for count" + (testCount - 1) )
    }else if(testCount >= 10){
      console.log('count over')
    }else {
      console.log(inputArray.join('') + ': ' + strike + ": strike " + ball + ": ball ")
    }
  }
}
    

const submitNum = useCallback((e:any) => {
  e.preventDefault()
  if(inputNumber.length !== 0){
    test()
  }
},[inputNumber])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>attact Number</h2>
         <form>
            <label htmlFor="attact"></label>
            <input 
                type="text" 
                id='attact' 
                name='attact'
                autoComplete="off"
                value={inputNumber}
                maxLength={4}
                onChange={(e)=>{
                setInput(e.target.value)
              }}
            />
            <button type='submit' onClick={(e) => submitNum(e)}>enter</button>
         </form>
      </header>
    </div>
  );
}

export default App;
