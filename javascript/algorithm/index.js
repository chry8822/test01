// var insertionSort = function(array) {
//     var i = 1, j, temp;
//     for (i; i < array.length; i++) {
//       temp = array[i]; // 새로운 숫자를 선택함
//       for (j = i - 1; j >= 0 && temp < array[j]; j--) { // 선택한 숫자를 이미 정렬된 숫자들과 비교하며 넣을 위치를 찾는 과정, 선택한 숫자가 정렬된 숫자보다 작으면
//         array[j + 1] = array[j]; // 한 칸씩 뒤로 밀어낸다
//       }
//       array[j + 1] = temp; // 마지막 빈 칸에 선택한 숫자를 넣어준다.
//     }
//     console.log(array)
//     return array;
//   };

const test = (array) => {

}


test([5, 6, 1, 2, 4, 3]); // [1, 2, 3, 4, 5, 6]

  //unshift 맨앞
  // push 맨뒤

const alphbets = ["a", "a", "a", "b", "c", "c", "d", "e"];
const counts = alphbets.reduce((acc, current) => {
  if (acc[current]) {
    acc[current] += 1;
  } else {
    acc[current] = 1;
  }
  return acc;
}, []);
 
// let oneTwoThree = [1,2,3]
// result = oneTwoThree.reduce((acc, cur) => {
//     acc.push(cur % 2 ? '홀수' : '짝수');
//     return acc;
//   }, []);
//   console.log(result)

let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let result = arr.sort().reduce((acc, cur) =>{
    const length = acc.length;
    // console.log(cur)
    if(length === 0 || acc[length - 1] !== cur) {
        acc.push(cur)
    }
    return acc
},[])

// console.log(result); //[1,2,3,4,5]

 console.log([...new Set(arr)])
 console.log(arr.filter((item,idx)=> arr.indexOf(item) === idx))
 console.log(arr.reduce((acc,cur) => acc.includes(cur) ? acc : [...acc, cur],[]))


 