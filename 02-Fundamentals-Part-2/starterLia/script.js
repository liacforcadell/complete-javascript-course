'use strict'; //activates strict mode (makes it easier to write secure (avoid accidental bugs) javascript code)
//IMPORTANT: use strict has to be the very first statement in the script

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriverLicense = true; //tells you errores that you could have made in the names

// if(hasDriversLicense) console.log("I can drive :D");

// const interface = "Audio"; //reserves words that could be implemented in the future

// const private = 25;

// //!!!!FUNCTIONS!!!!!

// function logger() {
//     console.log("My name is Lia");
// }

// //Calling / running / invoking the function
// logger();
// logger();
// logger();

// //Al agregar los parametros, solo se debe agregar nombres para estos, no tipos.
// //No todas las funciones en JavaScript necesitan un return
// function fruitProcessor(apples, oranges) {
//     //console.log(apples, oranges);
//     const juice = `Juice with ${apples} apples and ${oranges} oranges`;

//     return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// //console.log(fruitProcessor(5,0));

// const appleOrangeJuice = fruitProcessor(2,4);
// console.log(appleOrangeJuice);

// //Function declarations vs Expressions

// //FUNCTION DECLARATION
// //A diferencia del Function Expressions, a estas se le puede llamar antes de que sean declaradas

// const age1 = calcAge1(1991);
// function calcAge1(birthYear) {
//     // const age = 2037 - birthYear;
//     // return age;
//     return 2037 - birthYear;
// }
// console.log(age1);

// //FUNCTION EXPRESSION
// //You write a function without a name
// //It is also called an anonymous function
// //Ej Anonymous: function () {}, se debe guardar en una variable o constante cuyo nombre se usa para llamar la funcion anonima.
// //Ej Not anonymous: function nombre () {}
// //There is no name after function

// //No se les puede llamar antes de que sean declarados
// const calcAge2 = function (birthYear) {
//     return 2037 - birthYear;
// }

// const age2 = calcAge2(1991);
// console.log(age1, age2);

// //ARROW FUNCTION

// //Ej: function expression
// const calcAge2 = function (birthYear) {
//     return 2037 - birthYear;
// }

// //Ej: Arrow Function
// //Sintax: (parameter) => return expression

// //Does not get a so called this keyword??????
// const calcAge3 = birthYear => 2037 - birthYear;
// const age3 = calcAge3(1991);

// console.log(age3);

// const yearsUntilRetirement = (birthYear, firstName) => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     return `${firstName} retires in ${retirement} years.`;
// }

// console.log(yearsUntilRetirement(1991, "Jonas"));
// console.log(yearsUntilRetirement(1980, "Bob"));

// //Calling one function inside another function

// function cutFruitPieces(fruit) {
//     return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//     const applePieces = cutFruitPieces(apples);
//     const orangePieces = cutFruitPieces(oranges);

//     const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`;
//     return juice;
// }

// console.log(fruitProcessor(2,3));

// //Review Functions

// const calcAge = function (birthYear) {
//     return 2037- birthYear;
// }

// const yearsUntilRetirement = function (birthYear, firstName) {
//     const age = calcAge(birthYear);
//     const retirement = 65 - age;

//     if(retirement > 0) {
//         console.log(`${firstName} retires in ${retirement} years.`);
//         return retirement;
//     } else {
//         console.log(`${firstName} has already retired 🎉🥳`);
//         return -1;
//     }

//  //   return `${firstName} retires in ${retirement} years.`;
// }
// console.log(yearsUntilRetirement(1991, "Jonas"));
// console.log(yearsUntilRetirement(1950, "Mike"));

//Resumen FUNCTIONS
//Function declaration: functions that can be used before its declared

//Function expression, a function value stored in a variable (called anonymous functions)

//Arrow function, great for quick oneline functions, but they have no this keyword

// //CODING CHALLENGE 1

// const calcAverage = (score1, score2, score3) =>
// (score1 + score2 + score3) / 3;

// const checkWinner = function (avgDolphins, avgKoalas) {
//     if (avgDolphins >= avgKoalas * 2)
//     return console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`)
//     else if (avgDolphins * 2 <= avgKoalas) {
//     return console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
//     } else {
//     return console.log(`No one wins ${avgDolphins} vs ${avgKoalas}`)
//     }
// }

// let averageDolphins = calcAverage(44, 23, 71);
// let averageKoalas = calcAverage(65, 54, 49);

// checkWinner(averageDolphins, averageKoalas);

// averageDolphins = calcAverage(85, 54, 41);
// averageKoalas = calcAverage(23, 34, 27);

// checkWinner(averageDolphins, averageKoalas);

// //ARRAYS - Two ways of creating an array

// //First way (more used) (its called the literal sintax)
// const friends = ['Michael', 'Steven', 'Peter'];

// console.log(friends);

// //Second way
// const y = new Array(1991, 1984, 2008, 2020);

// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);
// console.log(friends[friends.length - 1]);

// friends[2] = 'Jay';

// console.log(friends);

// //Obs
// //We can mutate arrays even if they were declared as a const because only primitive values are inmutable
// //What we cant do is replace the entire array

// //Un array puede guardar varios tipos de datos

// const firstName = 'Lia'
// const lia = [firstName, 'Cano', 2021 - 1992, 'programmer', friends];

// console.log(lia);

// //Excercise
// const calcAge = function (birthYear) {
//     return 2037- birthYear;
// }

// const years = [1990, 1967, 2002, 2010, 2018];

// //console.log(calcAge(years));    //Error NaN

// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);

// console.log(age1, age2, age3);

// const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];

// console.log(ages);

// //ARRAYS OPERATIONS

// //ADD ELEMENTS (2 METHODS)
// //PUSH method: adds elements to the end of an array
// //Push return the value of the lenght of the array
// const friends = ['Michael', 'Steven', 'Peter'];
// const newLenght = friends.push('Jay');

// console.log(friends);
// console.log(newLenght);

// //UNSHIFT METHOD: adds element to the beggining of the array
// //Returns the lenght of the array
// friends.unshift('John');
// console.log(friends);

// //REMOVE ELEMENTS
// //POP Method: removes the last element of the array
// //Returns the removed element
// friends.pop();
// const popped = friends.pop();
// console.log(popped);
// console.log(friends);

// //SHIFT Method: it removes the first element of the array
// //Returns the removed element
// friends.shift();
// console.log(friends);

// //INDEXOF method: tells us in which position a certain element of the arrays is
// console.log(friends.indexOf('Steven'));

// //If the element doesnt exist, it returns -1
// console.log(friends.indexOf('Bob'));

// //If the elements are repeated, it returns the first element
// friends.push('Steven');
// console.log(friends.indexOf('Steven'));

// //INLCUDES METHOD (ES6 javascript version)
// //It returns a boolean telling if the element is present or not
// //Uses strict equality
// console.log(friends.includes('Steven'));
// console.log(friends.includes('Bob'));
// friends.push(23);
// console.log(friends.includes('23'));

// if (friends.includes('Steven')) {
//     console.log('You have a friend called Steven');
// }

// //Coding Challenge 2

// const calcTip = function (bill) {
//     return bill >= 30 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// console.log(calcTip(100));

// const bills = [125, 555, 44];
// console.log(bills);

// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// console.log(tips);

// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(totals);

// //OBJECTS:

// //Example: this is called the object literal sintax
// const jonas = {
//     firstName : 'Jonas',
//     lastName : 'Smith',
//     age: 2037 - 1991,
//     job: 'teacher',
//     friends : ['Michael', 'Peter', 'Steven']
// };

// console.log(jonas);

// //RETRIEVING DATA FROM AN OBJECT
// //With a dot
// console.log(jonas.lastName);
// //With square brackets (we can put expressions in square brackets)
// console.log(jonas['lastName']);

// const nameKey = 'Name';
// console.log(jonas['first' + nameKey])
// console.log(jonas['last' + nameKey])

// const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends.');

// if (jonas[interestedIn]) {
//     console.log(jonas[interestedIn]);
// } else {
//     console.log('Wrong request! Choose between firstName, lastName, age, job, and friends.')
// }

// //ADDING NEW PROPERTIES TO THE OBJECT
// jonas.location = 'Portugal';
// jonas['twitter'] = '@jonasmith';
// console.log(jonas);

// //Challenge
// //Jonas has 3 friends, and his best friend is called Michael
// console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);

// //OBJECT METHODS!!
//to create object methods you just need to add a function to the object:

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Smith',
//     birthYear: 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     hasDriversLicense: true,

//     // calcAge: function(birthYear) {
//     //     return 2037 - birthYear;
//     // },

//     //     calcAge: function() {
//     //     console.log(this);
//     //     return 2037 - this.birthYear;
//     // },

//     //Its good practice to save the value of the function, so we dont have to calculate it multiple times if we need it more than once. this.age creates a new property called age in the object that calls the function.

//     calcAge: function() {
//         this.age = 2037 - this.birthYear;
//         return this.age;
//     },

// };

// // console.log(jonas.calcAge(jonas.birthYear));
// // console.log(jonas['calcAge'](1991));

// //To use the function, first we need calcAge() to add age property and then we can call directly age property
// console.log(jonas.calcAge())
// console.log(jonas.age);

// //Challenge

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Smith',
//     birthYear: 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     hasDriversLicense: true,
//     calcAge: function() {
//         this.age = 2037 - this.birthYear;
//         return this.age;
//     },
//     getSummary: function() {
//         this.summary = `${this.firstName} is a ${this.calcAge()}-years old ${this.job}, and he ${this.hasDriversLicense ? "has" : "doesn't have"} a drivers license.`;
//         return this.summary;
//     }

// };

// console.log(jonas.getSummary());

// //CODING CHALLENGE #3

// const mark = {
//     fullName: "Mark Miller",
//     mass: 78,
//     height: 1.69,
//     calcBMI: function() {
//         this.BMI = this.mass / this.height ** 2;
//         return this.BMI;
//     }
// }

// const john = {
//     fullName: "John Smith",
//     mass: 92,
//     height: 1.95,
//     calcBMI: function() {
//         this.BMI = this.mass / this.height ** 2;
//         return this.BMI;
//     }
// }

// if(mark.calcBMI() > john.calcBMI()) {
//     console.log(`${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName} (${john.BMI})!`);
// } else if (mark.calcBMI() < john.calcBMI()) {
//     console.log(`${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName} (${mark.BMI})!`);
// } else {
//     console.log(`${john.fullName} and ${mark.fullName} have the same BMI (${john.BMI} vs ${mark.BMI})!`)
// }

// //LOOPS
// //Three parts: initial value of counter, condition, increasing the counter

// //For loop keeps running while condition is TRUE
// for(let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// //For Loops for Arrays

// const jonasArray = [
//     'Jonas',
//     'Smith',
//     2037 - 1991,
//     'teacher',
//     ['Michael', 'Peter', 'Steven'],
//     true
// ];

//  const types = [];
// //Atender: para un for loop de Arrays se debe comenzar con 0
// for (let i = 0; i < jonasArray.length ; i++) {
//     console.log(jonasArray[i], typeof jonasArray[i]);
//     //Filling the types array (2 ways)
//     //types[i] = typeof jonasArray[i];
//     types.push(typeof jonasArray[i]);
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//     ages.push(2037 - years[i]);
// }

// console.log(ages);

// //CONTINUE AND BREAK STATEMENTS!!

// //Example: USE OF CONTINUE

// console.log("CONTINUE EXAMPLE")
// for (let i = 0; i < jonasArray.length ; i++) {
//     if (typeof jonasArray[i] !== "string") continue;
//     console.log(jonasArray[i], typeof jonasArray[i]);
// }
// console.log("BREAK EXAMPLE")
// //Example: USE OF BREAK
// for (let i = 0; i < jonasArray.length ; i++) {
//     if (typeof jonasArray[i] === "number") break;
//     console.log(jonasArray[i], typeof jonasArray[i]);
// }

// //LOOPING BACKWARDS AND LOOPS IN LOOPS

// const jonas = [
//     'Jonas',
//     'Smith',
//     2037 - 1991,
//     'teacher',
//     ['Michael', 'Peter', 'Steven'],
//     true
// ];

// for (let i = jonas.length - 1; i >= 0; i--) {
//     console.log(i, jonas[i]);
// }

// //Example: Loop in Loops

// for(let ex = 1; ex < 4; ex++) {
//     console.log(`Starting excercise... ${ex}`);
//     for (let i = 1; i < 6; i++) {
//         console.log(`Lifting weight repetition ${i} 🏋️‍♀️`);
//     }
// }

// //WHILE LOOP (it is more versitile than the for loop because it really doenst need a number)
// let i = 1;
// while (i <= 10) {
//     console.log(`Lifting weight repetitions ${i} 🏋️‍♀️`);
//     i++;
// }

// //Example with no counter variable;
// let dice = Math.trunc(Math.random() * 6) + 1;
// //console.log(dice);

// while (dice !== 6) {
//     console.log(`You rolled a ${dice}`);
//     dice = Math.trunc(Math.random() * 6) + 1;
//     if (dice === 6) console.log(`Loop is about to end....`)
// }

//Coding Challenge #4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = function (bill) {
  return bill >= 30 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(tips[i] + bills[i]);
}

console.log(`Bills: ${bills}`);
console.log(`Tips: ${tips}`);
console.log(`Totals: ${totals}`);

const calcAverage = function (arr) {
  let acumulador = 0;
  for (let i = 0; i < arr.length; i++) {
    acumulador += arr[i];
  }
  return acumulador / arr.length;
};

console.log(`Totals: ${calcAverage(totals)}`);
