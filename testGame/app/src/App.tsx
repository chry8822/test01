import React, { useState, useMemo, useEffect } from 'react';
import { dummy } from './testDummy'

function App() {
  const [select, setSelect] = useState<any>(
    {
      player: 0,
      genre: 0,
      level: 0
    }
  )


  const test = useMemo(() => {
    let data:any[] = dummy;
      if(select.player){
        data = data.filter((item:any) => select.player >= item.player)
        // 선택한 인원수와 같거나 작은 데이터들 할당
      }if(select.genre){
        data = data.filter((item:any) => select.genre === item.genre)
        // 선택한 장르와 같은 데이터 할당
      }if(select.level){
        data = data.filter((item:any) => select.level === item.level)
        // 선택한 난이도와 같은 데이터 할당
      }if(data.length <= 0){
        // 데이터가 비어 있으면 데이터 title 추가
        data[0] = {
          title : "조건에 맞는 게임 없음"
        }
      }
      return data
    },[select.player, select.genre, select.level]);
    
    // 필터링 함수와 렌더링 함수 분리

    const renderData = useMemo(() => {
      return (
        test.map((item:any, idx:number)=>{
            return (
              <li key={idx}>{item.title}</li>
            )
      })
    )
  },[test])
  


  let numbers = [1,5,3,3,5,10]
  let result:number = 0
  // numbers.map((item:number,idx:any) => {
  //   result += idx
  // })

  for(let i = 0; i < numbers.length; i ++){
    result += numbers[i]
  }

  let text:any = "Lorem ipsum dolor, sit amet consectetur adipisicing."
  let split:any = text.replace(",","").replace(".","")
  split = split.split(" ");

  // split.map((item:any, idx:any) => {
  //   return (
  //     console.log(
  //       idx + 1 + "." + item
  //     )
  //   )
  // })
  // 결과
  // 1.Lorem
  // 2.ipsum
  // 3.dolor
  // 4.sit
  // 5.amet
  // 6.consectetur
  // 7.adipisicing


  let textRemoveComma:any = text.replace(",","").replace(".","");
  let names:string[] = textRemoveComma.split(" ");
  const [search, setSearch] = useState<string>("")

  // const submit = (e:any) => {
  //   e.preventDefault();
  //   checkName(search)
  // }

  // const checkName = (data:any) => {
  //   names.map((item:any,idx:any) => {
  //       console.log(
  //         item == data ? idx + "." + item : ""
  //     )
  //   })
  // }

  // const market:any = {
  //   name: "emart",
  //   fruits:[
  //     {
  //       name:"banana",
  //       price: 4000
  //     },
  //     {
  //       name:"apple",
  //       price: 500
  //     },
  //     {
  //       name:"melon",
  //       price: 10000
  //     },
  //   ]
  // }

  // market.fruits.sort((next:any, prev:any) => {
  //   return (
  //     prev.price - next.price 
  //   )
  // })

  // console.log(market.fruits)

  // let nums:number[] = [1,2,3,4,5,6,7,8,9,10]
  // nums.forEach((item:number) => {
  //   console.log(item, item * item )
  // })

  let nums:number[] = [2,4,6,8,10,11,7];
  // console.log(nums)
  // nums.some((item:number, idx:number) => console.log(item % 2 === 0 ? idx + "." + "true" : idx + "." + "false"))
  // console.log(nums.every((item:number, idx:number) => item % 2 == 0))
  // console.log(nums.some((item:number, idx:number) => item % 2 == 0 ? idx + "." + "true" : idx + "." + "false"))

  nums.every((item:number, idx:number) => {
    console.log(item % 2 === 0)
    return item % 2 === 0
    })

  return (
    <div className="App">
      {/* <form onSubmit={submit}>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}/>
        <button type="submit" value="Submit">input</button>
      </form> */}
      {

      }
      <div>
        <ul>
          {renderData}
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
