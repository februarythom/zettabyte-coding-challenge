// Expected Result : [false, true]
// Direction :
// The first value : If all of arr2 has bigger value than the biggest value of arr1;
// The second value : If some of arr2 has smaller value than the smallest value of arr1;
const arr1 = [4, 6, 2, 3, 5];
const arr2 = [1, 3, 4, 7, 9, 10];

function result(arr1, arr2) {
  // Your Code Here

  // //hard way
  // const biggestArr1ValueA = arr1.reduce((prev, curr, currIndex) =>{
  //   return currIndex === 0 ? curr : curr > prev ? curr : prev;
  // },0);

  // //hard way
  // const smallertArr1ValueA = arr1.reduce((prev, curr, currIndex) =>{
  //   return currIndex === 0 ? curr : curr < prev ? curr : prev;
  // },0);

  const biggestArr1Value = arr1.sort((a,b) => b - a)[0]; //easy way
  const smallertArr1Value = arr1.sort((a,b) => a - b)[0]; //easy way

  const res = [
    arr2.reduce((prev, curr) =>{
      return prev = prev.concat(curr > biggestArr1Value);
    },[]).every((val) => val === true),
    arr2.reduce((prev, curr) =>{
      return prev = prev.concat(curr < smallertArr1Value);
    },[]).some((val) => val === true)
  ];

  return res;
}

console.log(result(arr1, arr2));
