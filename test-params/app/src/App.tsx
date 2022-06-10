// import React from 'react';
// import { useParams,BrowserRouter, Routes, Route, useLocation,useNavigate  } from "react-router-dom"
// import './App.css';

// function App() {
//   const navigate = useNavigate()

//   return (
//     <BrowserRouter>
//       <h1>useParams</h1>
//       <Buttons />
//       <br />
//       <Routes>
//         <Route path='/:path' element={<Path />}/>

//       </Routes>
//     </BrowserRouter>

//   );
// }

// export default App;

import React,{ useState } from 'react';
import { useParams,BrowserRouter, Routes, Route, useLocation,useNavigate  } from "react-router-dom"
import moment from 'moment';
import './App.css';

const App = () => {
  const [time,setTime] =useState(moment.duration(0));
  const [timeTick, setTimeTick] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const tick = () => setTime(prevTime => prevTime.clone().add(1, 'seconds'));
    const timeTick = setInterval(() => {
      tick();
    },1000)
    setTimeTick(timeTick);
  };

  const pauseTimer = () => {
    if(timeTick) {
      clearInterval(timeTick);
    }
  };

  const stopTimer = () => {
    pauseTimer();
    setTime(moment.duration(0))
  };


  return (
    <div className="App">
      <h1>Timer</h1>
      <p>{moment(time.asSeconds(),'s').format("HH:mm:ss:SSS SS S")}</p>
      <button type="button" onClick={() => startTimer()}>시작</button>
      <button type="button" onClick={() => pauseTimer()}>일시정지</button>
      <button type="button" onClick={() => stopTimer()}>정지</button>
    </div>
  );
}

export default App;
