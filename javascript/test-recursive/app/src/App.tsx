import React, { useState, useEffect, useRef, useReducer, useCallback, useMemo } from 'react';
import logo from './logo.svg';
import './App.scss';
import moment from 'moment';

function App() {

  const [total, setTotal] = useState("")
  const [timerShowFlag, setTimerShowFlag] = useState<boolean>(false)
  const interval = useRef<any>(null)
  const intervalTimer = useRef<any>(null)
  const [valueFlag, setValueFlag] = useState<boolean>(true)

  const [timerValue, setTimerValue] = useState<any>({
    hour: "",
    min: "",
    sec: "",
  })

  useEffect(() => {
    interval.current = setInterval(() => {
      let now = moment();
      setTotal(now.format("hh : mm : ss"))
    }, 1000)
    return () => clearInterval(interval.current)
  }, [])



  const changeValue = useCallback((e: any, type: any) => {
    let value = e.target.value;
    if (value.length > 2) {
      value = Number(value.slice(0, 2))
    }
    if (value) {
      setTimerValue((item: any) => {
        return {
          ...item,
          [type]: value
        }
      })
    }
  }, [{ ...timerValue }])



  const timerStart = useCallback((e: any) => {
    setValueFlag(false)
    e.preventDefault()
    if (intervalTimer.current) {
      return
    }
    intervalTimer.current = setInterval(() => {
      setTimerValue((time: any) => {
        if (time.sec > 0) {
          console.log("sec")
          setValueFlag(false)
          return {
            ...time,
            sec: time.sec - 1
          }
        } else if (time.sec === 0 || time.sec === "") {
          if (time.min === 0 || time.min === "") {
            if (time.hour === 0 || time.hour === "") {
              setValueFlag(true)
              setTimerShowFlag(false)
              clearInterval(intervalTimer.current);
              intervalTimer.current = null
              return {
                ...time,
                hour: "",
                min: "",
                sec: "",
              }
            }
          } else if (time.hour > 0) {
            console.log("hour")
            setValueFlag(false)
            return {
              ...time,
              hour: time.hour - 1,
              min: 59,
              sec: 0
            }
          }
        } else if (time.min > 0) {
          console.log("min")
          setValueFlag(false)
          return {
            ...time,
            min: time.min - 1,
            sec: 59
          }
        }
      })

    }, 1000)
  }, [{ ...timerValue }])



  const resetValue = useCallback(() => {
    setValueFlag(true)
    setTimerValue({
      ...timerValue,
      hour: "",
      min: "",
      sec: "",
    })
  }, [{ ...timerValue }])


  return (
    <div className="App">
      <p className='curTime'>
        {total}
      </p>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='title'>timer</div>
        <p className='timer'>
          {timerValue.hour != "" || timerValue.hour > 0 ? (timerValue.hour < 10 ? "0" + timerValue.hour : timerValue.hour) : <span className='stop' >00</span>}<span className={timerShowFlag ? "" : "stop"}> - </span>
          {timerValue.min != "" || timerValue.min > 0 ? (timerValue.min < 10 ? "0" + timerValue.min : timerValue.min) : <span className='stop'>00</span>}<span className={timerShowFlag ? "" : "stop"}> - </span>
          {timerValue.sec != "" || timerValue.sec > 0 ? (timerValue.sec < 10 ? "0" + timerValue.sec : timerValue.sec) : <span className='stop'>00</span>}
        </p>
        <div className='inputWarpper'>
          <form onSubmit={(e) => { timerStart(e) }}>
            <div>
              <input
                type="number"
                value={valueFlag && (timerValue.hour || "")}
                onChange={(e) => changeValue(e, "hour")}
              />
              <input
                type="number"
                value={valueFlag && (timerValue.min || "")}
                onChange={(e) => changeValue(e, "min")}
              />
              <input
                type="number"
                value={valueFlag && (timerValue.sec || "")}
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
