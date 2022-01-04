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

const displayMovements = function (movements, sort = false) {
  //Empty existing html
  containerMovements.innerHTML = '';

  //Sorting
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //Slice() is used to make a copy

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    //insertAdjacentHTML('options', html)
    //Options:'afterbegin', 'beforeend'
    //Options:'beforebegin', 'afterend'
  });
};

// //SECCION
// ////////////////////////////////////////////////
// // CALCULATING AND PRINTING BALANCE
// ////////////////////////////////////////////////
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// //SECCION
// ////////////////////////////////////////////////
// // CALC AND PRINT INCOME, OUTCOME AND  INTEREST
// ////////////////////////////////////////////////

const calcDisplaySummary = function (acc) {
  const sumIN = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const sumOUT = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${sumIN}€`;
  labelSumOut.textContent = `${Math.abs(sumOUT)}€`;

  // const interest = movements
  //   .filter(mov => mov > 0)
  //   .reduce((acc, mov) => (mov * 1.2) / 100 + acc, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, dep) => dep + acc, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

// ////////////////////////////////////////////////
// // UPDATING UI
const UpdateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};

// //SECCION
// ////////////////////////////////////////////////
// // IMPLEMENTING LOGIN
// ////////////////////////////////////////////////

// Event Handler
//Obs: in html, when a form is submited, the html pages reloads. We need to stop that default behavior with method preventDefault().

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  //?. Optional chaining: it prevents the error if the account does not exist
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //Losing focus of cursor after login:
    inputLoginPin.blur();

    // Update UI
    UpdateUI(currentAccount);
  }
});

// //SECCION
// ////////////////////////////////////////////////
// // IMPLEMENTING TRANSFERS
// ////////////////////////////////////////////////

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Updating UI
    UpdateUI(currentAccount);
  }

  // Cleaning inputs
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
});

// //SECCION
// ////////////////////////////////////////////////
// // REQUEST LOAN
// ////////////////////////////////////////////////

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);

  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    // Add Movement
    currentAccount.movements.push(loan);
    // Update UI
    UpdateUI(currentAccount);
  }
  // Clear Inputs
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// //SECCION
// ////////////////////////////////////////////////
// // CLOSE ACCOUNT
// ////////////////////////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  //Clear Fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

// //SECCION
// ////////////////////////////////////////////////
// // SORTING BUTTON
let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// //SECCION
// ////////////////////////////////////////////////
// // DATA TRANSFORMATIONS: FILTER METHOD
// ////////////////////////////////////////////////

//Example Filter with anonymous function
// const deposits = movements.filter(function (mov, i, array) {
//   return mov > 0;  //return has to be a boolean
// });
// console.log(deposits);

//Example Filter with anonymous function
// const deposits = movements.filter(mov => mov > 0);
// console.log(movements);
// console.log(deposits);

// //Same example with For of Loop
// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // //SECCION
// // ////////////////////////////////////////////////
// // // DATA TRANSFORMATIONS: REDUCE METHOD
// // ////////////////////////////////////////////////
// //Reduce method: 2 parameters.
// //reduce(callback function, initial value of accumulator)

// //Example Reduce with anonymous function
// const balance = movements.reduce(function (
//   accumulator,
//   currentValue,
//   i,
//   array
// ) {
//   console.log(`Iteration ${i}: ${accumulator}`);
//   return accumulator + currentValue;
// },
// 0);
// console.log(balance);

// //Example Reduce with arrow function
// const balance2 = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance2);

// //Same example with For of Loop
// let balance3 = 0;
// for (const mov of movements) balance3 += mov;
// console.log(balance3);

// //Maximum Value with reduce:
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // CODING CHALLENGE #2
// ////////////////////////////////////////////////

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(`Human ages: ${humanAges}`);

//   const dogsAgeMore18 = humanAges.filter(ages => ages >= 18);
//   console.log(`More than 18: ${dogsAgeMore18}`);

//   // let count;
//   // const sumAge = dogsAgeMore18.reduce((acc, age, i) => {
//   //   count = i;
//   //   return acc + age;
//   // }, 0);

//   // const average2 = dogsAgeMore18.reduce(
//   //   (acc, age, i, arr) => acc + age / arr.length,
//   //   0
//   // );
//   // console.log(average2);

//   const average =
//     dogsAgeMore18.reduce((acc, age) => acc + age, 0) / dogsAgeMore18.length;

//   console.log(`Average: ${average}`);

//   // const average = sumAge / count;
//   // console.log(`Average: ${average}`);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // THE MAGIC OF CHAINING METHODS
// ////////////////////////////////////////////////
//Obs: we should not overuse chaining, it can reduce performance. Try adding all the methods optimizing with the less chainings possible.
//It is bad practice to chain method that mutate the underline original array (ex: splice or reverse)
//It is a good practice to avoid mutating arrays

// const euroToUSD = 1.1;

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUSD)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // CODING CHALLENGE #3
// ////////////////////////////////////////////////

// const calcAverageHumanAge = function (ages) {
//   const average = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(ages => ages >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(`Average: ${average}`);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // THE FIND METHOD
// ////////////////////////////////////////////////
//We can use it to retrieve one element of an array based on a condition
//Like the filter method, it need a callback function that returns a boolean
//It does not return a new array, just the first element of the array that satisfies the condition
//It has access to the (element, index, array)

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//Ex: with for of loop
// let accountUnique = 0;
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') accountUnique = acc;
// }
// console.log(accountUnique);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // THE FINDINDEX METHOD
// ////////////////////////////////////////////////
//Example in Banking app --> closing account.
//Similar to find, but it returns the index and not the element itself
//It has access to the (element, index, array)

// //IMPORTANTE
// ////////////////////////////////////////////////
// // THE SOME AND EVERY METHODS
// ////////////////////////////////////////////////
//It needs a condition that will return a boolean

// console.log(movements);

//Includes and some method are similar:
//Includes tests EQUALITY:
// console.log(movements.includes(-130));
// console.log(movements.some(mov => mov === -130));

//SECCION:
//SOME -> true if some satisfy condition
// //The SOME method tests a CONDITION:
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

//SECCION:
//EVERY -> true if ALL satisfy condition
// //Ex: check if all are deposits
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// //Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// //IMPORTANTE
// ////////////////////////////////////////////////
// // FLAT AND FLAT MAP METHODS     ES2019
// ////////////////////////////////////////////////

// Flat method: removes the nested arrays and flattens the array, it only works for ONE LEVEL of nesting.

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat());
// console.log(arrDeep.flat(2)); //Flattens 2 Levels of nesting
// console.log(arrDeep.flat(1));

// EXAMPLE:
// const accountMovements = accounts.map(acc => acc.movements);
// // console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// Example with chaining:
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

//FLAT MAP: combines the flat and map methods into one. Better for performance
//Only goes one level deep in nesting, it cannot be changed.

// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // SORTING ARRAYS
// ////////////////////////////////////////////////
//IT MUTATES THE ORIGINAL ARRAY
// It sorts based on strings, so it doesnt work well for sorting numbers.
//It converts everything to string (number to string) and then it does the sorting

// Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());

// Numbers: doesn't work as expected
// console.log(movements);
// console.log(movements.sort());

//It can be fixed by passing in a compare callback function into the sort method.

// a and b --> two consecutive numbers in the array

// ASCENDING ORDER
// return < 0   --> A, B (keep order)
// return > 0   --> B, A (switch order)
// movements.sort((a, b) => {
//   // if (a > b) return 1;
//   // if (a < b) return -1;
// });
// movements.sort((a, b) => a - b);
// console.log(movements);

// DESCENDING ORDER
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

// movements.sort((a, b) => b - a);

// console.log(movements);

// //IMPORTANTE
// ////////////////////////////////////////////////
// // MORE WAYS OF CREATING AND FILLING ARRAYS
// ////////////////////////////////////////////////

// Empty arrays + fill method
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// //Creates new array with 7 empty elements:
// const x = new Array(7);
// console.log(x);
// // We cannot call most methods in this empty array:
// //Example, map doesnt work:
// console.log(x.map(() => 5));
// //An empty array only works with the fill method:
// // FILL METHOD: it mutates the array
// x.fill(10);
// x.fill(1, 3); //Only starts filling at index 3
// x.fill(9, 4, 6); //Only starts filling at index 4 and ends at index 6
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.from()
// // parameters (object with lenght, function)
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const random = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );

// console.log(random);

// Create arrays from Array like structures (iterables): strings, maps, sets, result of querySelectorAll

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  // const all = movementsUI.map(el => Number(el.textContent.replace('€', '')));

  console.log(movementsUI);

  //Also creates a new array from an array like structure, but then we need to do the mapping separately.
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
