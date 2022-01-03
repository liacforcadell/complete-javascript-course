('use strict');

// //IMPORTANTE
// /////////////////////////////////////////
// //DEFAULT PARAMETERS
// /////////////////////////////////////////

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //OLD WAY (ES5):
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// //Skipping one parameter:
// createBooking('LH123', undefined, 1000);

// //IMPORTANTE
// ///////////////////////////////////////////////////
// //HOW PASSING ARGUMENTS WORKS: VALUE VS. REFERENCE
// ///////////////////////////////////////////////////
// //JAVASCRIPT DOES NOT HAVE PASSING BY REFERENCE

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Smith',
//   passport: 323232658986,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 323232658986) alert('Check In');
//   else alert('Wrong passport!');
// };

// // checkIn(flight, jonas);

// // console.log(flight);
// // console.log(jonas);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

//IMPORTANTE
/////////////////////////////////////////
//FIRST-CLASS AND HIGHER-ORDER FUNCTIONS
/////////////////////////////////////////
//HIGHER-ORDER FUNCTIONS: a function that receives another function as an argument, that returns a new function, or both. Only possible because of first-class functions.

//Example -> function that receives another function:
// const greet = () => console.log('Hey Jonas');
// btnClose addEventListener('click', greet)
//addEventListener() -> Higher-Order Function
//greet -> Callback function

//Example -> function that returns another function:
// function count() {
//   let counter = 0;
//   return function() {
//     counter++;
//   }
// }

//count() -> Higher-order function

// //IMPORTANTE
// /////////////////////////////////////////
// //FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
// /////////////////////////////////////////
// //JS uses callback functions all the time

// const oneWord = function (str) {
//   return str.replaceAll(' ', '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //Higher-order function:
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('Javascript is the best!', upperFirstWord);

// transformer('Javascript is the best!', oneWord);

// const high5 = function () {
//   console.log('🙌');
// };

// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// //IMPORTANTE
// /////////////////////////////////////////
// //FUNCTIONS RETURNING FUNCTIONS
// /////////////////////////////////////////

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// //Long way:
// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// //Short way:
// greet('Hello')('Jonas');

// //Challenge: using arrow functions
// // const greetArrow = greeting => {
// //   return name => {
// //     console.log(`${greeting} ${name}`);
// //   };
// // };

// // greetArrow('Hola')('Lia');

// const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

// greetArrow('Hola')('Lia');

// // //IMPORTANTE
// // /////////////////////////////////////////
// // //THE CALL AND APPLY METHODS
// // /////////////////////////////////////////

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   //book: function() {}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Lia Cano');
// lufthansa.book(635, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// //Does not work because the this in a regular called function is undefined
// // book(23, 'Sarah Williams');

// // /////////////////////////////////////////
// // //THE CALL METHOD

// //MANUALLY SETTING THE THIS KEYWORD OF A FUNCTION THAT WE WANT TO CALL
// //CALL METHOD call(object we want key this keyword to point to, rest of aguments)
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// book.call(lufthansa, 239, 'Taylor Swift');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss AirLines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);

// // /////////////////////////////////////////
// // //THE APPLY METHOD

// //It works like the call method, except for the fact that the second argument need to be an array of data.
// //book.apply(object that the this keyword need to point at, array)

// //IT is not that used in modern javascript

// const flightData = [283, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// //Better way with the spread operator:
// book.call(swiss, ...flightData);
// console.log(swiss);

// // //IMPORTANTE
// // /////////////////////////////////////////
// // //THE BIND METHOD
// // /////////////////////////////////////////

// //SAME USE AS THE CALL AND THE APPLY METHODS.
// //Allows us to manually set the object of the this keyword

// //DIFFERENCE: does not inmediatly call the function. It returns a new function where the this keyword is bound.

// // book.call(eurowings, 23, 'Sarah Williams');

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// //we save the returned function in bookEW variable
// console.log(typeof bookEW);

// bookEW(23, 'Axl Rose');
// console.log(eurowings);

// //We can also already set an argument (like the number of flight)
// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Taylor Alison Swift');
// bookEW23('Lia Cano Forcadell');

// // With Event Listeners

// //Setting a new property:
// lufthansa.planes = 300;
// //Setting a new function:
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// //THIS DOES NOT WORK:
// // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// //The this keyword in an function called by an event handler function (addEventListener()) points to the element on which that handler its attached. In this case it will be the button itself.

// //RESOLVED:
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// //we use the bind method because we cannot call the function, we only need to send it.

// //Partial Application:
// const addTax = (rate, value) => value + value * rate;

// console.log(addTax(0.1, 200));

// //Adding a standard value to the rate argument using bind, we use the standard null for the this keyword pointer (just a standard, we can use another value).
// const addVAT = addTax.bind(null, 0.23);
// // addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

// // const greet = function (greeting) {
// //   return function (name) {
// //     console.log(`${greeting} ${name}`);
// //   };
// // };

// //MINI-CHALLENGE:
// const addTax1 = function (rate) {
//   return function (value) {
//     console.log(value + value * rate);
//   };
// };

// const addVAT1 = addTax1(0.23);

// addVAT1(100);
// addVAT1(23);

// //Example Solution Jonas:
// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// /////////////////////////////////////////
// //CONDING CHALLENGE #1
// /////////////////////////////////////////

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const answer = Number(
//       prompt(
//         'What is your favorite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)'
//       )
//     );
//     if (typeof answer === 'number' && answer >= 0 && answer <= 3) {
//       this.answers[answer]++;
//     }
//     this.displayResults(this.answers);
//   },
//   displayResults(type) {
//     console.log(type);
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     //Get Answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     console.log(answer);

//     //Register Answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;

//     this.displayResults(), this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') console.log(this.answers);
//     else if (type === 'string')
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//   },
// };

// // poll.registerNewAnswer();

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const arr = [5, 2, 3];

// poll.displayResults.call({ answers: [5, 2, 3] });

// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

// // //IMPORTANTE
// // //////////////////////////////////////////////////
// // //INMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// // //////////////////////////////////////////////////

// //Execute function only one and never again.
// //To do this, we dont assign a name to the function and we wrap everything in parenthesis. We need to inmediately call it in the end, sin we are not storing this function anywhere.

// (function () {
//   console.log('This will never run again');
// })();

// //Arrow function:
// //Wrap arrow function in parenthesis to form an expression and the call the function().
// (() => console.log('This will ALSO never run again'))();

// //IMPORTANTE
// /////////////////////////////////////////
// //CLOSURES
// /////////////////////////////////////////

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
