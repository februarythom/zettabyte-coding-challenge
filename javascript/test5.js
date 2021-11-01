// Expected Result : 6
// Direction : Get the total of "1" in binary value of number input
const number = 221;

function result(num) {
  // Your Code Here
  return Array.from(num.toString(2)).filter((val) => val === "1").length;
}

console.log(result(number));
