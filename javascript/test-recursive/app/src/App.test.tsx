import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});





// const timerStart = useCallback((e: any) => {
//   setValueFlag(false)
//   e.preventDefault()
//   if (intervalTimer.current) {
//     return
//   }
//   intervalTimer.current = setInterval(() => {
//     setTimerValue((time: any) => {
//       if (time.sec > 0) {
//         console.log("sec")
//         setValueFlag(false)
//         return {
//           ...time,
//           sec: time.sec - 1
//         }
//       } else if (time.sec === 0 || time.sec === "") {
//         if (time.min === 0 || time.min === "") {
//           if (time.hour === 0 || time.hour === "") {
//             setValueFlag(true)
//             setTimerShowFlag(false)
//             clearInterval(intervalTimer.current);
//             intervalTimer.current = null
//             return {
//               ...time,
//               hour: "",
//               min: "",
//               sec: "",
//             }
//           }
//         } else if (time.min > 0) {
//           console.log("min")
//           setValueFlag(false)
//           return {
//             ...time,
//             min: time.min - 1,
//             sec: 59
//           }
//         } if (time.hour > 0) {
//           console.log("hour")
//           setValueFlag(false)
//           return {
//             ...time,
//             hour: time.hour - 1,
//             min: 60,
//             sec: 0
//           }
//         }
//       }
//     })

//   }, 1000)
// }, [{ ...timerValue }])