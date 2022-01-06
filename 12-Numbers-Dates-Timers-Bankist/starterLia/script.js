'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-12-30T17:01:17.194Z',
    '2022-01-04T23:36:17.929Z',
    '2022-01-05T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// Formatting currencies
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Date
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  // Setting time to 5 minutes
  let time = 300;

  // We separate this function to call it inmediately:
  const tick = function () {
    const min = `${Math.floor(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    // In each call, print the remaining time in the UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1 second
    time--;
  };

  // Calling tick inmediately: to avoid the 1 second delay when we are calling it for the first time
  tick();

  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//IMPORTANTE
// Experimenting with the API

// Internalization API: new Intl.DateTimeFormat('language-COUNTRY').format(date);
// ISO Language Code Table:
// http://www.lingoes.net/en/translator/langcode.htm

const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', //Options: 'numeric', '2-digit'
  year: 'numeric', //'2-digit'
  weekday: 'long', //Options: 'short', 'narrow'
};

// Get language and country from user's navigator:
const locale = navigator.language;
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat('es-PY', options).format(now);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // // Format: day/Month/YEAR, Hour:min
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // LogoutTimer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    //Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
      //Reset Timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//In JavaScript all numbers are represented as floating point numbers, even when we write them as integers.
// console.log(23 === 23.0);
// Numbers in Js are always stored in a binary format, so it is diffucult to represent some fractions that have no problem in the base 10 system.
//Example:
// Base 10 (0 to 9):
// 0.1 + 0.2 = 0.3
// Base 2 (javascript):
// console.log(0.1 + 0.2);
// ERROR IN JAVASCRIPT:
// console.log(0.1 + 0.2 === 0.3);

//Converting string to number:
// console.log(Number('23'));
// console.log(+'23');

// Parsing: string needs to start with a number
// 2 ARGUMENTS: (string, reddix)
//reddix: is the base of the numeral system that we are using
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e30', 10)); //DOESNT WORK

//Converting Binary number: reddix 2
// console.log(Number.parseInt('100px', 2));

// console.log(Number.parseInt('   2.5rem'));
// console.log(Number.parseFloat('   2.5rem'));

//Also works:
// console.log(parseFloat('   2.5rem'));
//in modern javascript is more encouraged to write the Number function.

// IS NOT A NUMBER FUNCTION isNaN():
//More info: https://stackoverflow.com/questions/33164725/confusion-between-isnan-and-number-isnan-in-javascript

// Only to check if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(+'20x');
// console.log(Number.isNaN(+'20X'));
// console.log(23 / 0);
// console.log(Number.isNaN(23 / 0));

// Best way of checking if a value is a real number:
// console.log('---- IS FINITE ----');
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));
// When using integer, we can check if it is a number with:
// console.log('---- IS INTEGER ----');
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));

//IMPORTANTE
///////////////////////////////////////////
//  MATH AND ROUNDING
///////////////////////////////////////////

// Raiz cuadrada:
// console.log(Math.sqrt(25));
// Raiz cuadrada con Exponenciacion:
// console.log(25 ** (1 / 2));
// Raiz cubica:
// console.log(8 ** (1 / 3));

// Maximum:
// It does type coercing but not parsing:
// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, '23', 11, 2));
// console.log(Math.max(5, 18, '23px', 11, 2)); //Does not work

//Minimum:
// console.log(Math.min(5, 18, 23, 11, 2));

// PI:
// console.log(Math.PI * Number.parseFloat('10px') ** 2); // Calculating the area of a circle with the radius of 10

// Random number:
// console.log(Math.trunc(Math.random() * 6) + 1);

// IMPORTANTE
// RANDOM FORMULA:
// console.log('---- RANDOM NUMBER ----');
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

// Rounding integers:
// console.log('---- Rounding integers ----');
// console.log(Math.trunc(23.1));
// //ERROR gives me different result than video:
// console.log(Math.trunc(23.9));

//Rounding UP:
// console.log(Math.ceil(23.1));
// console.log(Math.ceil(23.9));

//Rounding DOWN:
// console.log(Math.floor(23.1));
// console.log(Math.floor('23.9'));

// FLOOR AND TRUNC WORK DIFFERENTLY WITH NEGATIVE NUMBERS: floor works better than trunc with negatives
// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// ROUNDING DECIMALS
//ToFixed: returns a string (not a number)
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2)); //+ converts it to number

//IMPORTANTE
///////////////////////////////////////////
//  REMAINDER OPERATOR
///////////////////////////////////////////
// console.log(5 % 2);
// console.log(8 % 3);

// FUNCTION IS EVEN:
const isEven = n => n % 2 === 0;

// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (isEven(i)) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

//IMPORTANTE
///////////////////////////////////////////
//  NUMERIC SEPARATORS      ES2021
///////////////////////////////////////////
// 287,460,000,000
// const diameter = 287_460_000_000;
// console.log(diameter);

// const price = 345_99;
// console.log(price);

// const transferFee1 = 15_00;
// const transferFee2 = 1_500;

// // DOESNT WORK: const PI =3._1415;

// console.log(Number('230_000')); //DOESNT WORK
// console.log(parseInt('230_000')); //DOESNT WORK

// //IMPORTANTE
// ///////////////////////////////////////////
// //  BIGINT      ES2020
// ///////////////////////////////////////////
// //Obs: bigInt does not have a limit

// //Biggest number that js can safely represent:
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// //IT CANNOT BE REPRESENTED ACCURATELY:
// console.log(6656565652133879875454321654878654321);
// //CONVERTING NUMBER TO BIGINT: n in the end.
// console.log(6656565652133879875454321654878654321n);

// //Not use constructor BigInt with large numbers:
// console.log(BigInt(6656565652133879875454321654878654321)); // IT DOESNT WORK PROPERLY, it should only be used with small numbers

// // Operations with BigInt
// console.log(10000n + 10000n);
// console.log(54648979641321654654543135465n * 654654879851654n);

// // Cannot mix bigInts with regular numbers:
// const huge = 565465813216548798734654546543n;
// const num = 23;
// // console.log(huge * num); //Doesn't work
// //Doesn't work: console.log(Math.sqrt(16n));

// console.log(huge * BigInt(num));

// // Exceptions:
// // Logical operators
// // BigInt > normalNumber
// console.log(20n > 15);

// // String concatinations:
// console.log(huge + 'is REALLY big!!!!');

// // Divisions:
// // Divisions in bigInt cut offs the decimal part
// console.log(11n / 3n);
// console.log(11 / 3);

//IMPORTANTE
///////////////////////////////////////////
//  CREATING DATES
///////////////////////////////////////////

// Create a date (4 ways):
// 1
// const now = new Date();
// console.log(now);

// // 2
// console.log(new Date('Wed Jan 05 2022 10:41:24'));

// //Us writing the date is not a goood idea:
// console.log(new Date('December 24, 2015'));

// // ***
// //'2019-11-18T21:31:17.178Z' --> Z means UTC -> universal time ( no timeZone or daylight savings)
// console.log(new Date(account1.movementsDates[0]));

// // 3
// //ATENCION --> month is 0 based
// console.log(new Date(2037, 10, 19, 15, 23, 5));

// // Autocorrection of date: november 31 doesnt exist.
// console.log(new Date(2037, 10, 31));
// console.log(new Date(2037, 10, 35));

// // 4
// // Unix Time:
// // 0 milisenconds after unix time:
// // Show different from 01/01/1970 because of TimeZone differences
// console.log('Unix');
// console.log(new Date(0));

// // --> 3 days in miliseconds
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// //Timestamp --> 3 * 24 * 60 * 60 * 1000
// console.log(3 * 24 * 60 * 60 * 1000);

// Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);

// //IMPORTANTE
// // Always use getFullYear()
// //ERROR NO USAR getYear() DEPRECATED
// console.log(future.getFullYear());
// console.log(future.getMonth()); //its 0 based
// console.log(future.getDate()); //gets day of month
// console.log(future.getDay()); //gets day of week
// //getDay() --> 0: Sunday
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());

// //Nice formated string:
// console.log(future.toISOString());

// //Getting Timestamp:
// console.log(future.getTime());
// //Creating new date with that timestamp:
// console.log(new Date(2142267780000));

// //Getting Timestamp for right now:
// console.log(Date.now());

// //SET METHODS
// future.setFullYear(2040);
// console.log(future);

//IMPORTANTE
///////////////////////////////////////////
//  OPERATION WITH DATES
///////////////////////////////////////////
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(Number(future));
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
// // (1000 * 60 * 60 * 24) --> converting miliseconds to days
// const days1 = calcDaysPassed(
//   new Date(2037, 3, 4),
//   new Date(2037, 3, 14, 10, 8)
// );
// console.log(days1);

//IMPORTANTE
//MORE COMPLEX CASES: USE A DATE LIBRARY
// For more precise calculations, time changes due to daylight saving changes
// Name: Moment.js
// https://momentjs.com/

// //IMPORTANTE
// ///////////////////////////////////////////
// //  INTERNATIONALIZING NUMBERS Intl
// ///////////////////////////////////////////
// const num = 3884764.23;

// const options1 = {
//   style: 'currency', //Options: 'percent', 'currency'
//   unit: 'celsius',
//   currency: 'EUR', //Only works with style: currency
//   // useGrouping: false,
// };

// console.log('US     ', new Intl.NumberFormat('en-US', options1).format(num));

// console.log(
//   'Germany     ',
//   new Intl.NumberFormat('de-DE', options1).format(num)
// );

// console.log(
//   'Paraguay     ',
//   new Intl.NumberFormat('es-PY', options1).format(num)
// );

// console.log('UK     ', new Intl.NumberFormat('en-GB', options1).format(num));

// console.log('Syria     ', new Intl.NumberFormat('ar-SY', options1).format(num));

// console.log('--- NAVIGATOR ---');
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language).format(num)
// );

// //IMPORTANTE
// ///////////////////////////////////////////
// //  TIMERS: setTimeOut and setInterval
// ///////////////////////////////////////////

// SECCION
// SetTimeout
//setTimeout() --> 2 arguments
// (Callback function, miliseconds until function is called)
// setTimeout(() => console.log('Here is your pizza 🍕'), 3000); //3 seconds

// setTimeout(
//   (ing1, ing2) =>
//     console.log(`1. Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   'olives',
//   'spinach'
// ); // Adding arguments to the function
// console.log('Waiting...');

// // CLEARING TIMEOUT --> deleting timer
// const ingredients = ['bacon', 'cheese'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) =>
//     console.log(`2. Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// ); // Adding arguments to the function
// if (ingredients.includes('bacon')) clearTimeout(pizzaTimer);

// SECCION
// setInterval --> executes every interval
// const options2 = {
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
//   second: 'numeric',
// };

// setInterval(function () {
//   const now = new Date();
//   console.log(Intl.DateTimeFormat(navigator.language, options2).format(now));
//   // console.log(now);
// }, 1000);
