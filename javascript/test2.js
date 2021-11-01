// Expected result : [7, 3, 1, 2, 5, 6, 9, 10, 4, 8]
// Direction : Mutate arr1 to return combined array with arr2. The conditions are :
// 1. odd number at beginning
// 2. even number at the end of array
// 3. Original arr1 at the middle

const arr1 = [1, 2, 5, 6, 9, 10];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function result(arr1, arr2) {
  // Your Code Here
  return arr1.reduce((prev, curr, currIndex, arr) => {
    var dataFit = curr - arr[currIndex - 1]
    return prev = dataFit === 1 ? prev.concat(arr2[currIndex + 1]) : prev;
  }, [])
  .reverse()
  .filter((val, index) => {
    return !(index % 2)
  })
  .concat(arr2)
  .concat(
    arr2.filter((val) => {
      return !(val % 2)
    }).filter((val, index) => {
      return (index % 2)
    })
  )
}

console.log(result(arr1, arr2));
