'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//IMPORTANTE
////////////////////////////////////////////////
// PROJECT: BANKIST APP
////////////////////////////////////////////////

// //SECCION
// ////////////////////////////////////////////////
// // INSERTING HTML -> container movements
// ////////////////////////////////////////////////

const displayMovements = function (movements) {
  //Empty existing html
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    //insertAdjacentHTML('options', html)
    //Options:'afterbegin', 'beforeend'
    //Options:'beforebegin', 'afterend'
  });
};

displayMovements(account1.movements);

// //SECCION
// ////////////////////////////////////////////////
// // COMPUTING USERNAMES
// ////////////////////////////////////////////////

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    //Create a new property (username):
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

// userName('Steven Thomas Williams');
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// //IMPORTANTE
// ////////////////////////////////////////////////
// // SIMPLE ARRAY METHODS
// ////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //SLICE METHOD --> does not change the original array
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));

// //Creating a shallow copy of the array
// console.log(arr.slice());
// console.log([...arr]);

// //SPLICE METHOD --> it works the same as the slice method except for the fact that it mutates the original array
// // console.log(arr.splice(2));
// console.log(arr);
// //Removing the last element
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// //REVERSE --> it reverses and mutates the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// //CONCAT --> does not mutate the original array
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));
// console.log(letters);

//IMPORTANTE
////////////////////////////////////////////////
// AT METHOD      ES2022
////////////////////////////////////////////////

// const arr = [23, 11, 64];

// //Example using at method vs not using it
// console.log(arr[0]);
// console.log(arr.at(0));

// //Traditional Examples of getting the last element:
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// //With at method:
// console.log(arr.at(-1));

// //At method also works on strings:
// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

//IMPORTANTE
////////////////////////////////////////////////
// LOOPING ARRAYS: FOREACH METHOD
////////////////////////////////////////////////
//forEach loop doesnt break or continue the loop. You always have to loop the entire array.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //For of example
// for (const movement of movements) {
//   if (movement > 0) console.log(`You deposited ${movement}`);
//   else console.log(`You withdrew ${Math.abs(movement)}`);
// }

// //Obs: Math.abs() takes the absolute value, removes the sign.
// console.log('------ FOR EACH ------');
// //For each example:
// movements.forEach(function (movement) {
//   if (movement > 0) console.log(`You deposited ${movement}`);
//   else console.log(`You withdrew ${Math.abs(movement)}`);
// });

// //0: function(200)
// //1: function(450)
// //2: function(400)
// // ....

// //Accessing index with for of loop
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
// }

// //Accessing index with forEach loop
// //You can also access the entire array:
// //The order of the parameter matters: (current element, index, entireArray)
// movements.forEach(function (movement, index, array) {
//   if (movement > 0)
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   else console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
// });

//IMPORTANTE
////////////////////////////////////////////////
// FOREACH METHOD WITH MAPS AND SETS
////////////////////////////////////////////////

// // MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, entireMap) {
//   console.log(`${key}: ${value}`);
// });

// //SET: doesnt have keys or indexes. It is the same as the value.
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //Convention: A _ as a name in JavaScript means a throwaway variable (unneccesary variable). Sin the key is the same as the value, we can write it as _
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${_}: ${value}`);
// });

// //IMPORTANTE
// ////////////////////////////////////////////////
// // CODING CHALLENGE #1
// ////////////////////////////////////////////////

// const checkDogs = function (dogs1, dogs2) {
//   const dogs1Copy = dogs1.slice(1, -2);
//   console.log(dogs1Copy);
//   const totalDogs = dogs1Copy.concat(dogs2);
//   console.log(totalDogs);

//   totalDogs.forEach(function (dog, i) {
//     dog <= 3
//       ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} yeard old`)
//       : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//   });
// };

// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];
// checkDogs(Julia, Kate);

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // DATA TRANSFORMATIONS: MAP, FILTER, REDUCE
// ////////////////////////////////////////////////
//Map method: it is similar to the forEach method, except that it creates a brand new array from the original array.
//Map returns a new array containing the results of applying an operation on all original array elements.
//Filter: returms a new array containing the array elements that passed a specific test condition.
//Reduce: boils ('reduces') all array elements down to one single value (eg adding all elements together) Ex: suma con acumulador.

// //SECCION
// ////////////////////////////////////////////////
// // DATA TRANSFORMATIONS: MAP METHOD
// ////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// //Example using the map method with callback function:
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// console.log(movements);
// console.log(movementsUSD);

// //Example using the map method (with arrow function):
// console.log('---- Arrow Function ----');
// const movementsUSDArrow = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSDArrow);

// //Same example using the for of Loop:
// console.log('---- For of Loop ----');
// const movementsUSFfor = [];
// for (const mov of movements) {
//   movementsUSFfor.push(mov * eurToUsd);
// }

// console.log(movementsUSFfor);

// const movementsDescriptions = movements.map(
//   (mov, i, array) =>
//     `Movement ${i + 1}: ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
// );

// console.log(movementsDescriptions);
