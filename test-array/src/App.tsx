import React,{useState, useEffect, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import _, { multiply } from 'lodash'

function App() {
  // const [showResult, setShowResult] = useState<any>();

  let data = ["a","b","c","d","e","f","g",];

  // let test:any[] = data.map((item:any,idx:any) => {
  //   return item;
  // })

// let music:any[] = ["Jazz","Blues"];
// music.push("Rock-n-Roll");
// music[Math.floor((music.length - 1)/ 2 )] = 'Classic'
// music.shift();
// music.unshift('Rap','Reggae')

// let arr = [1, -2, 3, 4, -9, 6] ;
// const getMaxSubSum = (start:any,end:any) => {
  
// }
  // let test:any = {};
  // test.name = "john";
  // test.surname = "Smith";
  // test.name = "pete";
  // delete test.name

  // console.log(test)


  // let test = {
  //   name: "123"
  // };
// 객체에 프로퍼티가 있는지 확인함
// 객체가 있으면 for in 을 타기 때문에 true 없으면 false
  // const isEmpty = (obj:any) => {
  //     for(let key in obj){
  //       return console.log(true)
  //     }
  //     return console.log(false)
  // }

  // isEmpty(test)

  // 월급 계산
//   let salaries = {
//     John: 100,
//     Ann: 160,
//     Pete: 130
//   }

// const total = (obj:any) => {
//   let sum:number = 0;
//   // 0 값이 들어와도 더하면 값에 변화가 없이 때문에 더해주면된다. 구지 분기점 만들지 않아도됨
//   for(let money in obj){
//       sum += obj[money]
//   }
//   console.log(sum)
// }


// let menu:any = {
//   width: 200,
//   height: 300,
//   title: "My menu"
// };

// const multiplyNumberic = (obj:any) => {
//   for(let key in menu){
//     if(menu[key] > 0 && typeof menu[key] !== "string"){
//       menu[key] *= 2
//     }
//   }
//   console.log(menu)
// }

// multiplyNumberic(menu)

// let real = {
//   name: "me",
// }

// let test1 = {
//   moeny: "billion"
// }
// let test2 = {
//   house: "1000"
// }

// Object.assign(real,test1,test2)

// let oldOne = {
//   name: "old",
//   age: 300,
// }

// let newOne = Object.assign({},oldOne)
// newOne.name = "newOne"

////////////////  lodash 깊은 복사. 객체 안에 객체나 배열까지 복사한다. 객체 안에 객체는 또다른 레퍼런스이기 때문에 각각 깊은 복사를 해야 하는데 그걸 lodash 가 도와줌

// const thin = {
//   name:"thin",
//   age: 100,
//   email:["go@naver.com"]
// }

// // const newThin = _.cloneDeep(thin)
// const newThin = JSON.parse(JSON.stringify(thin))
// newThin.email.push("false")
// newThin.email.shift()

// function makeUser() {
//   return {
//     name: "chrys",
//     ref() {
//       return this
//     }
//   };
// }

// let user = makeUser();

// console.log(user.ref().name)

// function 간지나는함수(){
//   console.log(this)
// }
// 간지나는함수()

// useEffect(()=>{
//   let cal:any = {
//     read(){
//       this.a = Number(prompt("one"));
//       this.b = Number(prompt("two"));
//     },
//     mul(){
//       console.log(this.a * this.b)
//     },
//     sum(){
//       console.log(this.a + this.b)
//     }
//   }
  
//   cal.read();
//   cal.mul();
//   cal.sum();
// },[])


// let ladder = {
//   step: 0,
//   up() { 
//     this.step++;
//     return this;
//   },
//   down() { 
//     this.step--;
//     return this;
//   },
//   showStep() { 
//     console.log(this.step)
//   }
// };
//메소드 체이닝 호출한 메소드에서 this를 반환한다 그럼 ladder 객체에 다시 접근 하게 되어 다른 메소드를 사용할수 있다.
// ladder.up().up().down().up().showStep()


// let obj = {};

// function A(){return obj}
// function B(){return obj}
 
// let c = new (A as any)();
// let d = new (B as any)();

 // @ts-ignore
// function Calculator(a:number,b:number):any {
//  // @ts-ignore
//   this.read = function() {
//     this.a = a
//     this.b = b
//   };
//  // @ts-ignore
//   this.sum = function() {
//     return this.a + this.b;
//   };
//  // @ts-ignore
//   this.mul = function() {
//     return this.a * this.b;
//   };
// }

// let calculator =  new(Calculator as any)(10,2)
// calculator.read();

// console.log( "Sum=" + calculator.sum() );
// console.log( "Mul=" + calculator.mul() );


// function Acc(a:number){
//   // @ts-ignore
//   (this.result as number) = Number(a),
//   // @ts-ignore
//   this.read = function(){
//     this.result += Number(a)
//   }
//   // @ts-ignore
//   console.log(this.result)
// }

// let acc = new (Acc as any)(1)
// acc.read()


// let id = Symbol("id");
// let id1 = Symbol("id");


// let newUser:any = {
//   name: "park",
//   [id]: 123
// }

// let test = Symbol.for("test")
// let testAgain = Symbol.for("test")

// console.log(test === testAgain)


// const pow = (x,n) => {
//   let result = 1;
//   for(let i = 0; i < n; i++){
//     result *= x;
//   }
//   console.log(result)
// }

// pow(2,5)


// let company = { // 동일한 객체(간결성을 위해 약간 압축함)
//   sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
//   development: {
//     sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
//     internals: [{name: 'Jack', salary: 1300}]
//   }
// };

// function sumSalaries(department:any) {
//   if(Array.isArray(department)){
//     return department.reduce((prev, current) => prev + current.salary, 0);
//   }else {
//     let sum = 0;
//     for(let sub of Object.values(department)){
//       console.log(Object.values(department))
//       sum += sumSalaries(sub)
//     }
//     return sum
//   }
// }

// console.log(sumSalaries(company))

// const test = (num) => {
//   let result = 0;
//   for(let i = 1; i <= num; i++){
//     result += i
//   }
//   return console.log(result)
// }

// test(100)


// 등차 공식이 가장 빠름 
// const sumTo = (n:any) => {
//   return console.log(n * (n + 1) / 2)
// }

// sumTo(1000)

// const test = (n:any) => {
//   let result = 1;
//   for(let i = 1; i <= n; i++){
//     result *= i
//   }
//   console.log(result)
// }

// test(7)

// let x = 0;
// let y = 1;
// let sum = 0;

// for(let i = 2; i <= 3; i++){
//   sum = x + y;
//   x = y;
//   y = sum;
//   console.log(sum);
// }



// useEffect(() => {
//   // if(test.length === 7 && test){
//     setShowResult("")
//   // }
// },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p dangerouslySetInnerHTML={{__html:showResult}}> */}
          
        {/* </p> */}
      </header>
    </div>
  );
}

export default App;
