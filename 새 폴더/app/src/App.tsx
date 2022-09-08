import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import CountUp from 'react-countup';

function App() {
  const observerRef = useRef<any>(null)

  useEffect(()=>{
    window.scrollTo(0,0)
    setCountFlag(true)
  },[])
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
    console.log(entries)
    entries.forEach((entry:any) => {
      if(entry.isIntersecting){
        setCountFlag(false)
        console.log("해제")
        observer.unobserve(observerRef.current)
      }
    })
  }

  let test:any = observerRef.current && observerRef.current.getBoundingClientRect();

  const [countFlag, setCountFlag] = useState<boolean>(true)
  console.log(countFlag)
   function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          // @ts-ignore
          Array(10).fill().map((item:any, idx:number) => {
            return (
              <div key={idx} className='dummy'>카운트업 && 인터셉터 옵저버 테스트.</div>
            )
          })
        }
        <p>
          <div ref={observerRef}>
            <CountUp 
              start={10}
              end={10242232894756289343}
              duration={2}
              separator=","
              enableScrollSpy={countFlag}
            />
          </div>
        </p>
      </header>
    </div>
  );
}

export default App;
