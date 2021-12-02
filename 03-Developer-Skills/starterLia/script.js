// Remember, we're gonna use strict mode in all scripts now!
'use strict';

//SECCION USING LIVESERVER - There are two ways of doing it.
//1. Installing LiveServer extension
//2. Using node.js and an npm package called liveserver
//Node.js is a javascript runtime that we can install in our computer, it allows us to run javascript outside of the browser, but it also allows us to run developers tools
//Terminal:
//cls        (clear terminal)
//node -v     (node version)
// npm install live-server -g
//Obs:nmp is the node package manager(it is a program to download tools)
//Obs: -g       (it means that it should be installed globally)
//

//USING LIVE SERVER:
//live-server in terminal

//STEPS SOLVING PROBLEMS
//1. Make sure you understand 100% of the problem. Ask the right questions to get a clear picture of the problem.
//2. Divide and conquer.
//3. Do as much research as we have to.
//4. For bigger problems, write pseudocode before writing the actual code.

// //Problem 1
// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// const calcTempAmplitude = function (arr) {
//   let min = arr[0];
//   let max = arr[0];

//   for (let i = 0; i < arr.length; i++) {
//     const current = arr[i];
//     if (typeof current !== 'number') continue;
//     if (min > current) min = current;
//     if (max < current) max = current;
//   }

//   return max - min;
// };

// console.log(calcTempAmplitude(temperatures));

// //Problem 2
// const temp1 = [3, 5, 1];
// const temp2 = [9, 0, 5];

// console.log(calcTempAmplitude(temp1.concat(temp2)));

// //SECCION DEBUGGING
// //How to find the bug?
// //1. Developer console (for simple code)
// //2. Debugger (for complex code)
// debugger;
// const measureKelvin = function () {
//   const measurement = {
//     type: 'temperature',
//     unit: 'celsius',
//     value: Number(prompt('Degrees celsius: ')),
//   };

//   //To show objects in console
//   console.table(measurement);

//   //console.log(measurement.value);
//   //console.warn(measurement.value);
//   //console.error(measurement.value);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// console.log(measureKelvin());

//Introducing a bigger BUG

//NOTA
//to call the debugger from our code we just have to write a debugger statement:

//debugger;
const calcTempAmplitudeBug = function (arr) {
  let min = 0;
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (typeof current !== 'number') continue;
    if (min > current) min = current;
    if (max < current) max = current;
  }
  console.log(max, min);

  return max - min;
};

const temp1 = [3, 5, 1];
const temp2 = [9, 4, 5];

console.log(calcTempAmplitudeBug(temp1.concat(temp2)));

//Coding Challenge #1

const printForecast = function (array) {
  let str = '...';

  for (let i = 0; i < array.length; i++) {
    str += ` ${array[i]}°C in ${i + 1} days ... `;
  }

  console.log(str);
};

printForecast([17, 21, 23]);

printForecast([12, 5, -5, 0, 4]);
