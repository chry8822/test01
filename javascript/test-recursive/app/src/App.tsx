import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import logo from './logo.svg';
import './App.scss';
import moment from 'moment';

function App() {
  let now = moment()
  const [total, setTotal] = useState(now.format("hh : mm : ss"))
  const [timerShowFlag, setTimerShowFlag] = useState<boolean>(false)
  const interval = useRef<any>(null)
  const intervalTimer = useRef<any>(null)

  
  const [timerValue, setTimerValue] = useState<any>({
    hour: "",
    min: "",
    sec: "",
  })


  useEffect(() => {
    interval.current = setInterval(() => {
      setTotal(now.format("hh : mm : ss"))
    }, 1000)
    return () => clearInterval(interval.current)
  }, [])




  const changeValue = (e: any, type: any) => {
    let value = e.target.value;
    if (value.length > 2) {
      value = Number(value.slice(0, 2))
    }
    setTimerValue({
      ...timerValue,
      [type]: value
    })
  }

  const timerStart = (e: any) => {
    e.preventDefault()
    intervalTimer.current = setInterval(() => {
        setTimerValue((time:any)=>{
          if(time.sec > 0){
            setTimerShowFlag(true)
            return {
              ...time,
              sec : time.sec - 1
            }
          }else if(time.sec <= 0){
            setTimerShowFlag(false)
            clearInterval(intervalTimer.current);
            return {
              ...time
            }
          }
        })
      },1000)
  };


  const resetValue = () => {
    setTimerValue({
      ...timerValue,
      hour: "",
      min: "",
      sec: "",
    })
  }

console.log(timerValue)
  return (
    <div className="App">
      <p className='curTime'>
        {total}
      </p>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          {hour} : {min} : {sec} 
        </p> */}
        <div className='title'>timer</div>
        {
          <p className='timer'>
            {timerValue.hour != "" ?(timerValue.hour < 10 ? "0" + timerValue.hour : timerValue.hour) : <span className='stop' >00</span>}<span className={timerShowFlag ? "" : "stop"}> - </span> 
            {timerValue.min !=  "" ?(timerValue.min < 10 ? "0" + timerValue.min : timerValue.min) : <span className='stop'>00</span>}<span className={timerShowFlag ? "" : "stop"}> - </span> 
            {timerValue.sec != "" ?(timerValue.sec < 10 ? "0" + timerValue.sec : timerValue.sec) : <span className='stop'>00</span>}
          </p>
        }
        <div className='inputWarpper'>
          <form onSubmit={(e) => { timerStart(e) }}>
            <div>
              <input
                type="number"
                value={timerValue.hour || ""}
                onChange={(e) => changeValue(e, "hour")}
              />
              <input
                type="number"
                value={timerValue.min || ""}
                onChange={(e) => changeValue(e, "min")}
              />
              <input
                type="number"
                value={timerValue.sec || ""}
                onChange={(e) => changeValue(e, "sec")}
              />
            </div>
            <div className='btnWrapper'>
              <input type="submit" value={"start"} />
              <input type="button" value={"reset"} onClick={resetValue} />
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
