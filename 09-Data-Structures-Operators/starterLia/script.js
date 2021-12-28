'use strict';

//Third Enhancement Object Literals:
//you can compute property names instead of writing them down. Example:
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // [`day-${2 + 4}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ENHANCED OBJECT LITERALS   introduced in ES6:
  //Before ES6:
  //openingHours: openingHours,
  //Example ES6 Enhanced Object Literals - First Enhancement:
  openingHours,

  //Second Enhancement Object Literals: (getting rid of the => :function) Example:
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //Without Second Enhancement Object Literals
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delecius pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// // //IMPORTANTE
// // /////////////////////////////////////////
// // //WHICH DATA STRUCTURE TO USE?
// // /////////////////////////////////////////

//1. SOURCES OF DATA:
//1. From the program itself (source code) (ex: status messages)
//2. From the UI (data input from the user or data written in DOM)
//3. From external sources (web API)

//We use data structures to store collections of data: 4 common build in data structures in javascript - 2 additional are WeakMap and WeakSet

//Questions to choose correct Data Structure:
//1. Do we need a simple list?
//Yes: Arrays or Sets
//2. Do we need Key/Value pairs?
//Yes: Object or a Map
//--> Key/Value pairs allows us to describe the values

//WHEN TO USE THEM
//ARRAYS VS SETS -> simple lists
//USING ARRAYS: when you need to store them in order, when they might contain duplicates, or when you need to manipulate data
//USING SETS: working with unique values, when high performance is really important (searching and deleting items can be 10x faster in sets than in arrays), use to remove duplicates from arrays.

//OBJECTS VS MAPS -> when we need to describe the values using keys
//USING OBJECTS: more traditional (and abused), easier to write and access values with . and []
//Use when you need to include functions(methods)
//Use when working with JSON
//USING MAPS: better performance, key can have any data type, easy to iterate, easy to compute size.
//Use when you simply need to map keys to values
//use when tou need keys that are not strings

// // // //IMPORTANTE
// // // /////////////////////////////////////////
// // // //MAPS              introduced ES6
// // // /////////////////////////////////////////
// //DIFFERENCE BETWEEN OBJECTS AND MAPS:
// //In maps, the keys can have any type. In object, keys are basically always strings

// const rest = new Map();

// //Filling a map .set():
// //Pass two arguments (keyName, value)
// // .set() return the updated Map

// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Fireneze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// //Read data from a map .get()
// //We need to pass the name of the key as an argument
// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 23;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// //check if map has key:
// console.log(rest.has('categories'));

// //delete key:
// rest.delete(2);
// console.log(rest);

// //Size:
// console.log(rest.size);

// //Remove all elements:
// // rest.clear();
// // console.log(rest);

// rest.set([1, 2], 'Test');
// console.log(rest);

// //This doesnt work because it does not refer to the same place in memory:
// // console.log(rest.get([1, 2]));
// //To use .get() with a array as a key we need to do this:
// const arr = [3, 4];
// rest.set(arr, 'Test');
// console.log(rest.get(arr));

// //Using DOM Elements:
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);

// //Another way of adding to map:
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'Javascript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// //CONVERTING FROM OBJECT TO MAP:
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));

// console.log(hoursMap);

// //Maps: iteration

// //QUIZZ App
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt('Your answer'));

// // if (answer === question.get('correct')) console.log(question.get(true));
// // else console.log(question.get(false));

// // console.log(question.get(question.get('correct') === answer));

// //CONVERTING FROM MAP TO ARRAY:
// console.log([...question]);

// //Other methods (return an iterator), it is best to use an ...
// console.log(question.entries());
// console.log(question.keys());
// console.log(question.values());

// // console.log(...question.entries());
// console.log(...question.keys());
// console.log(...question.values());

// // // //IMPORTANTE
// // // /////////////////////////////////////////
// // // //SETS          introduced in ES6
// // // /////////////////////////////////////////
// //Sets are a collection of unique values, cannot have duplicates. Order in a set is irrelevant, it doesnt have indexes. That means that there is no way to retrieve one value from a set

// //new Set(): inside the method we need to pass an iterable

// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);

// console.log(ordersSet);

// console.log(new Set('Jonas'));

// console.log(new Set());

// //Size of a set
// console.log(ordersSet.size);

// //Check if a certain element is in the Set:
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));

// //Add new elements to a set
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// console.log(ordersSet);

// //Delete elements of a set
// ordersSet.delete('Risotto');
// console.log(ordersSet);

// //Delete ALL elements
// // ordersSet.clear();
// // console.log(ordersSet);

// for (const order of ordersSet) console.log(order);

// //It is used to remove duplicate values from an array
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// const staffUnique = new Set(staff);

// console.log(staffUnique);

// //Convert from set to array

// const staffUniqueArray = [...new Set(staff)];

// console.log(staffUniqueArray);

// //Size
// console.log(new Set(staff).size);
// console.log(new Set('liacanoforcadell').size);

// // //IMPORTANTE
// // /////////////////////////////////////////
// // //LOOPING OBJECTS
// // /////////////////////////////////////////
// //Object.keys(openingHours) = is an array of the property names of the object. It is because its an array that we can loop through it.

// //LOOPING through PROPERTY NAMES of an OBJECT: Object.keys()
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of Object.keys(openingHours)) {
//   openStr += `${day}, `;
// }

// console.log(openStr);

// //LOOPING through PROPERTY VALUES of an OBJECT: Object.values()
// const values = Object.values(openingHours);
// console.log(values);

// //SIMULATING LOOPING THROUGH THE ENTIRE OBJECT:
// //Requieres looping through Entries (PROPERTY NAMES + VALUES) of an OBJECT:
// // Entire object:
// const entries = Object.entries(openingHours);
// console.log(entries);

// //Example:
// //[key, { open, close }]: uses destructuring

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// //IMPORTANTE
// /////////////////////////////////////////
// //OPTIONAL CHAINING (?.)   introduced in ES2020:
// /////////////////////////////////////////
// //Example without Optional Chaining, we need to add a conditional so we dont get an error when we look for Mon:
// //Obs: we almost always use it with the nullish coalescing operator ??
// //1. Mon doesnt exist:
// if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);
// //1. Fri exists:
// if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// //Example WITH optional chaining:
// console.log(restaurant.openingHours.mon?.open);
// //Explanation: Only if restaurant.openingHours.mon exists, .open will be read. If it doesnt exist, undefined will be returned inmediatly, without trying to read .open.

// //Multiple optional chainings:
// console.log(restaurant.openingHours?.mon?.open);

// //Example:
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   //console.log(day);
//   // const open = restaurant.openingHours[day]?.open || 'closed'; cannot use || because it will not work with 0, must use ??

//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// //Methods (if a method exists):
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRissotto?.(0, 1) ?? 'Method does not exist');

// //Arrays
// //Using optional chaining to check if an array is empty:
// const users = [{ name: 'Lia', email: 'lia@gmail.com' }];
// console.log(users[0]?.name ?? 'User array empty');

// const users1 = [];
// console.log(users1[0]?.name ?? 'User array empty');

// //Same example Without optional chaining:
// if (users.length > 0) console.log(users[0].name);
// else console.log('User array empty');

//SHORT CIRCUITING (&& AND ||)
//  3 properties about logical operators:
//1. Use ANY data type
//2. Return ANY data dype
//3. Short-circuting explanation:
// console.log('---------OR Operator----------');
// //- OR operator: if the first value is a TRUTHY value, it will return it inmediatly. It will not even evalue it.
// //Example: 3 is a truthy value
// console.log(3 || 'Jonas');
// //Other examples: it returns the first truthy value that it finds, it will return the last value it it doesnt find a truthy value
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// //Example using Short-Circuiting ||
// //Without short-circuiting
// // restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// //Same example using Short-Circuiting
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('---------AND Operator----------');
// //- AND operator: when it comes to Short-Circuiting it works in the exact oposite way from the OR operator.
// //If the first value is a FALSY value, it will return it inmediatly. It will not even evalue it.
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// //Example using Short-Circuiting ||
// //Without short-circuiting
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }
// //Same example using Short-Circuiting
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//IMPORTANTE
//RESUMEN
//Or operator: will return the first truthy value of all the operants or simply the last value if all of them are falsy
//And operator: will return the first falsy value of all the operants or simply the last value if all of them are truthy
//NOTA
//PRACTICAL APLICATIONS:
//OR: set defaults values
//And: execute code in the second operant if the first one is true

///////////////////////////////////
// IMPORTANTE
//THE NULLISH COALESCING OPERATOR: introduced in ES2020
//It works similarly to the OR operator, but with the principle of Nullish values instead of falsy values
//INCORRECT:
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
// console.log(guests);
//CORRECT:
//Nullish values: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

///////////////////////////////////
// IMPORTANTE
//LOGICAL ASSIGNMENT OPERATORS: introduced in ES2021
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//EJEMPLO
//Sin LOGICAL ASSIGNMENT OPERATORS
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

//CON LOGICAL OR(||) ASSIGNMENT OPERATORS (tiene problemas con el 0)
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//CON LOGICAL NULLISH(??) ASSIGNMENT OPERATORS
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

//CON LOGICAL AND(&&) ASSIGNMENT OPERATORS
// rest1.owner = rest1.owner && 'Anonymous';
// rest2.owner = rest2.owner && 'Anonymous';

rest1.owner &&= 'Anonymous';
rest2.owner &&= 'Anonymous';

//resultado:
// console.log(rest1);
// console.log(rest2);

//INFORMACION
//Spread: used where we would write values separated by commas
//Rest pattern: used where we would write variable names separated by commas

///////////////////////////////////
// IMPORTANTE
// THE REST PATTERN
//Uses the exact same sintax as the spread operator, but it does the opposite of the spread operator.
//Use: collect multiple elements y condense them in an array

//Spread operator vs Rest Pattern: spread is to unpack from an array, rest is to pack in an array

// //Example spread: on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// //Example rest: on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// //Obs: in this example, the rest element collects all the elements that are unused in the destructuring assignment

// // 1) Destructuring

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, risotto, otherFood);

// //REST IN OBJECTS
// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(weekDays);

// // 2) Functions
// //Using rest parameters:
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinachs');

// restaurant.orderPizza('mushrooms');

///////////////////////////////////
// IMPORTANTE
// THE SPREAD OPERATOR (...)
//NOTA
//Works in all ITERABLES (all arrays, strings, maps or sets)
//OBJECTS ARE NOT ITERABLES
//it is similar to destructuring.
//Diference: takes ALL THE ELEMENTS FROM THE ARRAY and it doesn't create new variables.
//Can only be used in places where otherwise we will write values separated by commas.
//We can use the spread operator when we are building an array or when we pass values into a function

// const arr = [7, 8, 9];
//not good ->
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

//Using spread operator
// const newArr = [1, 2, ...arr];
// console.,log(newArr);

// console.log(...newArr);
// console.log(1, 2, 7, 8, 9);

// const newMenu = [...restaurant.mainMenu, 'Chocolatada'];
// console.log(...newMenu);

//Other uses of the spread operator
//Copy Array
// const mainMenuCopy = [...restaurant.mainMenu];

//Join 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

//Iterables: arrays, strings, maps and sets. NOT OBJECTS
// const str = 'Jonas';
// const letters = [...str, '', 'S.'];
// console.log(letters);
// console.log(...letters);
// console.log(...str);

// const ingredientes = [
//   prompt("Let's make pasta! Ingrediente 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

//Ambos ejemplos hacen lo mismo, el spread operator facilita mucho el trabajo
// restaurant.orderPasta(ingredientes[0], ingredientes[1], ingredientes[2]);
// restaurant.orderPasta(...ingredientes);

//SINCE ES2018 the spread operator also works on objects

//Real world example using the spread operator with objects
//New restaurante object
// const newRestaurant = {
//   foundingYear: 1998,
//   ...restaurant,
//   founder: 'Giuseppe',
// };

// console.log(newRestaurant);

//IT REALLY MAKES A SHALLOW COPY
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
//You can change a variable
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

///////////////////////////////////
// IMPORTANTE
// DESTRUCTURING OBJECTS
//OBJECT DESTRUCTURING = we use curly braces and we write the exact name of the properties of the object, order doesnt matter

// const { name, openingHours, categories } = restaurant;
// // console.log(name, openingHours, categories);

// //Changing the variable names:
// const {
//   name: restauranteName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// // console.log(restauranteName, hours, tags);

// //Default values = ?
// const { menu = [], starterMenu: starters = [] } = restaurant;
// // console.log(menu, starters);

// //Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// //To assign like this we need parentesis
// ({ a, b } = obj);
// // console.log(a, b);

// //NESTED OBJECTS
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// // console.log(o, c);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

/*
///////////////////////////////////
// IMPORTANTE
// DESTRUCTURING ARRAYS

//NOTA
//Long way of destructuring arrays
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

//INFORMACION
//DESTRUCTURING ARRAYS (short way):
/* const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);
console.log(typeof x); */

//Obs: when js sees [] on the left side of the = it knows it shoud destructure.

//You dont have to destructure all the elements of the array
// const [first, second] = restaurant.categories;
// console.log(first, second);

//Destructure the first and third element
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

//IMPORTANTE
//Using destructuring to alter position of elements:
//1. Create new array with the elements we want to alter in the orden we want them (elements inverted)
//2. Destructure those elements
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

//Destructuring allows us to return multiple values with 1 function.

// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// //NOTA
// //NESTED DESTRUCTURING
// //Destructuring array inside an array
// const nested = [2, 4, [5, 6]];

// // const [values, , nestedValues] = nested;
// // console.log(values, nestedValues);

// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// //IMPORTANTE
// //Default Values: when we are destructuring arrays. Useful when we dont know the lenght of the array, we might try to unpack the array in positions that don't exist
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

/////////////////////////////////////////
//CONDING CHALLENGE #1
/////////////////////////////////////////

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// //.1
// // const [players1] = game.players;
// // const [, players2] = game.players;
// const [players1, players2] = game.players;

// // console.log(players1);
// // console.log(players2);

// //2.
// // const [gk] = players1;
// // const [, ...fieldPlayers] = players1;

// const [gk, ...fieldPlayers] = players1;
// // console.log(gk);
// // console.log(fieldPlayers);

// //3. NO PUDE HACER
// const allPlayers = [...players1, ...players2];
// // console.log(allPlayers);

// //4.
// const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// // console.log(playersFinal);

// //5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// // const { team1, x: draw, team2 } = game.odds;

// // console.log(team1, draw, team2);

// //6.

// // const printGoals = function (...players) {
// // let totalGoals = 0;
// // for (let i = 0; i < players.length; i++) {
// // console.log(players[i]);
// // totalGoals += 1;
// // }
// // console.log(totalGoals);
// // console.log(`${players.length} goals were scored`);
// // };

// // printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels');
// // printGoals('Lewandowski', 'Gnarby');

// // printGoals(...game.scored);

// //7.
// //Or operator: will return the first truthy value of all the operants or simply the last value if all of them are falsy
// //And operator: will return the first falsy value of all the operants or simply the last value if all of them are truthy

// // team1 < team2 && console.log('Team 1 is more likely to win');

// // team1 > team2 && console.log('Team 2 is more likely to win');

//IMPORTANTE
/////////////////////////////////////////
//FOR-OF LOOP   introduced in ES6
/////////////////////////////////////////
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

//Getting index with for-of loop
for (const [i, el] of menu.entries()) {
  // console.log(`${i + 1}: ${el}`);
}

/////////////////////////////////////////
//CONDING CHALLENGE #2
/////////////////////////////////////////

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1.
// let number = 0;
// for (const player of game.scored) {
//   number++;
//   console.log(`Goal ${number}: ${player}`);
// }

// for (const [i, player] of game.scored.entries())
//   console.log(`Goal ${i + 1}: ${player}`);

//2.
// let average = 0;
// let count = 0;
// for (const odd of Object.values(game.odds)) {
//   average += odd;
//   count++;
// }

// console.log(average / count);

// let average = 0;
// for (const odd of Object.values(game.odds)) {
//   average += odd;
// }

// console.log(average / Object.values(game.odds).length);

// //3.
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

/////////////////////////////////////////
//CONDING CHALLENGE #3
/////////////////////////////////////////

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// //1.
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// //2.
// gameEvents.delete(64);
// console.log(gameEvents);

// //3.
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// const time = [...gameEvents.keys()].pop();
// // console.log(time);

// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// //4.
// // for (const [key, value] of gameEvents) {
// //   key <= 45
// //     ? console.log(`[FIRST HALF] ${key}: ${value}`)
// //     : console.log(`[SECOND HALF] ${key}: ${value}`);
// // }

// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half}HALF] ${min}: ${event}`);
// }

/////////////////////////////////////////
//WORKING WITH STRINGS
/////////////////////////////////////////

// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// console.log(airline.length);
// console.log('B737'.length);

// console.log(airline.indexOf('r'));
// console.log(airline.lastIndexOf('r'));
// console.log(airline.indexOf('Portugal'));
// console.log(airline.indexOf('portugal'));

// //Slice --> .slice(indexBeginParameter)
// console.log(airline.slice(4));

// //Slice --> .slice(indexBeginParameter, indexEndParameter)
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// //Slice -> extract from the end
// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   //B and E are middle seats
//   const s = seat.slice(-1);
//   s === 'B' || s === 'E'
//     ? console.log(`${s} is the middle seat 🤦‍♂️`)
//     : console.log(`${s} is not the middle seat, LUCKY! 😜`);
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());
// console.log('jonas'.toUpperCase());

// //Fix capitalization y name
// const passenger = 'jOnAs'; //Jonas
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);

// console.log(passengerCorrect);

// //Using a function:
// const correctCase = function (name) {
//   return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
// };

// console.log(correctCase('jOnAs'));

// //Comparing emails
// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n';

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim();
// // console.log(trimmedEmail);

// const normalizedEmail = loginEmail.toLowerCase().trim();

// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// //Replacing
// const priceGB = '288,97£';
// const priceUS = priceGB.replace('£', '$').replace(',', '.');

// console.log(priceUS);

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';

// // console.log(announcement.replace('door', 'gate'));
// // console.log(announcement.replaceAll('door', 'gate'));

// //Regular Expression (/????/g) the g means global
// console.log(announcement.replace(/door/g, 'gate'));

// //Booleans (includes, startsWith, endsWith)
// const plane = 'Airbus A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.includes('Boeing'));
// console.log(plane.startsWith('Air'));

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the NEW Airbus Damily');
// }

// //Practice exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();

//   if (baggage.includes('knife') || baggage.includes('gun'))
//     console.log('You are not allowed on board');
//   else console.log('Welcome aboard! 😎');
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// //Split
// console.log('a+very+nice+string'.split('+'));
// console.log('Lia Cano'.split(' '));

// const [firstName, lastName] = 'Lia Cano'.split(' ');

// const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');

// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];

//   for (const word of names) {
//     // namesUpper.push(word[0].toUpperCase() + word.slice(1));
//     namesUpper.push(word.replace(word[0], word[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith Davis');
// capitalizeName('lia cano forcadell');

// //Padding a string: adding a number of characters to the string until the string has a certain desired lenght
// const message = 'Go to gate 23!';
// //padStart(totalCharactersString, characterToAdd)
// console.log(message.padStart(25, '+'));
// console.log('Lia'.padStart(25, '+').padEnd(30, '+'));

// const maskCreditCard = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };
// console.log(maskCreditCard(15489563));
// console.log(maskCreditCard(4256878547964512));
// console.log(maskCreditCard('65856526325456985236'));

// //Repeat method
// const message2 = 'Bad weather... All Departures Delayed... ';

// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(3);
// planesInLine(12);

// /////////////////////////////////////////
// //CONDING CHALLENGE #4
// /////////////////////////////////////////

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;

//   const rows = text.split('\n');
//   // console.log(rows);
//   // let count = 0;

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.trim().toLowerCase().split('_');
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;

//     // const repeatCheckmark = '✔';
//     // count++;
//     // console.log(output.padEnd(20, ' ') + repeatCheckmark.repeat(count));
//     console.log(`${output.padEnd(20)}${'✔'.repeat(i + 1)}`);
//   }
// });

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

/////////////////////////////////////////
//CONDING CHALLENGE EXTRA
/////////////////////////////////////////

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '⭕' : ' '}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(55);
  console.log(output);
}
