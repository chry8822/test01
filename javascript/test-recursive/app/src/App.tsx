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
      now = moment();
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
        if(timerValue.sec > 0){
          console.log("123")
        setTimerValue({
          sec: timerValue.sec - 1
        })
      }else if (timerValue.sec <= 0){
        clearInterval(intervalTimer.current);
        return
      }
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
        <div>timer</div>
        {
          timerShowFlag ?
          (`${timerValue.hour}${timerValue.min}${timerValue.sec}`): 
          <p>00 - 00 - 00</p>
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
