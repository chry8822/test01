import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import CountUp from 'react-countup';

function App() {
  const observerRef = useRef(null)

  useEffect(()=>{
    if(observerRef.current){
      let settings = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      } 
      console.log("등록")
      let observer = new IntersectionObserver(callback, settings)
      observer.observe(observerRef.current)
    }
  },[observerRef.current])

  const callback = (entries:any, observer:any) => {
    entries.forEach((entry:any) => {
      if(entry.isIntersecting){
        setCountFlag(true)
        console.log("해제")
        observer.unobserve(observerRef.current)
      }
    })
  }

  const [countFlag, setCountFlag] = useState<boolean>(false)
  console.log(countFlag)
   function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          new Array(10).fill(<div className='dummy'>카운트업 && 인터셉터 옵저버 테스트.</div>).map((item:any) => {
            return item
          })
        }
        <p>
          <div ref={observerRef}>
            <CountUp 
              start={123123}
              end={102423423453}
              duration={3}
              separator=","
              delay={0}
              enableScrollSpy={countFlag}
            />
          </div>
        </p>
      </header>
    </div>
  );
}

export default App;
