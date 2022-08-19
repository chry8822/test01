import React, { useState, useMemo } from 'react';
import { dummy } from './testDummy'

function App() {
  const [select, setSelect] = useState<any>(
    {
      player: 0,
      genre: 0,
      level: 0
    }
  )


  // const renderGame = useMemo(() => {
  //   let data: any[] = [];
  //   dummy.forEach((item: any, idx: any) => {
  //     if (select.player <= item.player && select.genre === 0 && select.level === 0) { // 인원
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     } else if (select.genre === item.genre && select.player === 0 && select.level === 0) { // 장르
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     } else if (select.level === item.level && select.player === 0 && select.genre === 0) { // 난이도
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     } else if (select.player <= item.player && select.genre === item.genre && select.level === 0){ // 인원 && 장르
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     } else if (select.level === item.level && select.genre === item.genre && select.player === 0){ // 레벨 && 장르
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     } else if (select.player <= item.player && select.level === item.level && select.genre === item.genre){ // 레벨 && 인원
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     } 
  //     else if (select.level === item.level && select.genre === item.genre && select.player <= item.player){ //레벨 && 장르 && 인원
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     }


  //     else if (
  //       select.player === 0 && select.genre === 0 && select.level === 0
  //     ) {
  //       data.push(
  //         <li key={idx}>{item.title}</li>
  //       )
  //       return
  //     }
  //   })
  //   return data
  // }, [select.player, select.genre, select.level])


  const test = useMemo(() => {
    let data:any ;
    data = dummy.filter((item:any, idx:any) => {
      if(select.player >= item.player){
        return item
      }else if(select.genre === item.genre){
        return item
      }else if(select.level === item.level){
        return item
      }else if(select.player === 0 && select.genre === 0 && select.level ===0){
        return item
      }
    })

    return (
      data.map((item:any, idx:any) => {
        return (
          <li key={idx}>{item.title}</li>
        )
      })
    )
  },[select.player, select.genre, select.level])



  return (
    <div className="App">
      <div>
        <ul>
          {/* {renderGame} */}
          {test}
        </ul>
      </div>
      <form action="">
        <select onChange={(e) => setSelect({ ...select, player: Number(e.target.value) })}>
          <option value="0">player</option>
          <option value="1">1인</option>
          <option value="2">2인</option>
          <option value="3">3인</option>
          <option value="4">4인</option>
        </select>
        <select onChange={(e) => setSelect({ ...select, genre: Number(e.target.value) })}>
          <option value="0">genre</option>
          <option value="1">카드</option>
          <option value="2">탈출</option>
          <option value="3">모험</option>
          <option value="4">추리</option>
          <option value="5">공부</option>
        </select>
        <select onChange={(e) => setSelect({ ...select, level: Number(e.target.value) })}>
          <option value="0">level</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
    </div>
  );
}

export default App;
