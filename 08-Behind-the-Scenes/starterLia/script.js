'use strict';
//Vocabulary:
//Low-level: manually manages resources like memory or CPU (for example the language C, you need to ask the computer for memory to create a new variable)

//IMPORTANTE
//Javascript
//High-level: we do not have to manage resources at all, a high-level language manages the resources on their own. The only downside is that programs will never be as fast or optimized as for example C programs.
//Garbage colletion: it helps with memory management. It is an algorithm that automatically removes all unused objects from the computer memory.
//Interpeted or justin-in-time compiled language: the computers processor only understands 0 and 1 (machine code), the javascript code that we write needs to be converted o interpreted a machine code (compiling). It is necesary in every programming language
//Multi-paradigm: an approach and mindset of structuring code, which will direct your coding style and techique.
//Examples paradigms:
// 1. Procedural Programming
// 2. Object-oriented programming (OPP)
// 3. Functional programming (FP)
//Prototype-based object-oriented: almost everything in javascript is an object, except for primitive values like numbers and strings. ARRAYS ARE OBJECTS
//First-class functions: it means that functions are treated like regular variables. We can pass functions into other functions and we can even return functions from functions. This is what allows the Functional programming
//Dynamic: it means that is a dinamically-typed language. No data type definitiosn, type becames known at runtime. The type of variables can easily change as we reassingn variables.
//Single-threaded: it runs in one single thread, so it can do only one thing at a time. Thar means that it needs a -> Concurrency model: how the javascript engine handles multiple tasks happening at the same time.
//None-blocking event loop: this helps javascript with long running tasks, so it doesnt block the single thread. This takes long running tasks, executes them in the background, and puts them back in the main thread once finished.

//INFORMACION
//JAVASCRIPT ENGINE: a program that executes javascript code. Example: Google's V8
//V8 -> powers google chrome and node.js
//node.js-> helps build server-side apps in javascript, outside any browser

//***Components of a Javascript Engine:
// 1. Call Stack: it's where our code is actually executed using something called execution context

// 2. Heap: unstructured memory pool which stores all the objects our application needs.

//IMPORTANTE
//COMPILATION VS INTERPRETATION

//1. Compilation: the entire source code is converted into machine code at one, and written into a binary file that can be executed by a computer.
//STEPS: Source code -> Compilation -> Protable file in machine code -> execution (it can happen way after the compilation) -> program running

//2. Interpretation: there is a interpreter that runs throught the source code and executes it line by line. The code is read and executed all at the same time. The convertion of source-code into machine code happens right before it is executed, and not ahead of time. An interpreted language is much slower than a compiled language.
//STEPS: Source-code -> execution line by line -> Porgram running

//Javascript USED to be an interpreted language. MODERN JAVASCRIPT uses a mix between compilation and interpretation called: Just-in-time (JIT) Compilation. This JIT compilation converts all the source code to machine code before execution (like with the compilation), but it doesnt have a portable file to execute. The execution happens inmediatly after the compilation.

//JAVASCRIPT RUNTIME
//The most common one is the browser
//PARTES OF JS RUNTIME:
//1- The heart of the JS runtime is the JS engine
//2- We also need access to the WEB API's: DOM, Timers, Fetch Api, ... etc. These are functionalities provided to the engine, accesible on window object. These are not part of JS.
//3- Callback Queue: data-structure that contains all the callback functions ready to be executed. Example: onClick, timer, data, ...

//INFORMACION
//Execution context:
//1. Variable enviroment
//2. Scope chain
//3. this keyword

//THREE Types of scope
//1. Global scope
//2. Function scope
//3. Block Scope (ES6) -> only let and const variables are block-scoped. IT DOENST APPLY TO var varibles beacuse var is old JS. Functions are also block scoped (only strict mode)

// //NOTA
// //Practica scoping

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;
//   console.log(firstName);

//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var milennial = true;
//       //You can have and declare repeated variable names with no problem, when they are in different scopes
//       const firstName = 'Steven';
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//       output = 'NEW OUTPUT!';
//     }
//     //var doesn't care about block-scope
//     console.log(milennial);
//     //Functions are block-scoped in strict-mode. Example:
//     //add(2, 3);
//     console.log(output);
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Lia';

// calcAge(1991);

//INFORMACION
//HOISTING IN JS: makes some variables accessible/usable in the code before they are actually declared.
//Before the execution, code is scanned for variable declarations, and for each one, a new property is created in the variable enviorement object.

//IMPORTANTE regla:
//Types of functions:
//We cannot use functions expressions or arrow functions before we declare them in the code. But we can use function declarations before writing them in the code.

//Exercise hoisting variables
//console.log(me);
//console.log(job);
//console.log(year);

// var me = 'Lia';
// let job = 'programmer';
// const year = 1991;

//IMPORTANTE
//Exercise hoisting functions
//Gets result when it is called before declaration
// console.log(addDeclaration(2, 3));

// //Doesn't get result when it is called before declaration
// //console.log(addExpression(2, 3));
// //console.log(addArrow(2, 3));

// //Declaring functions
// function addDeclaration(a, b) {
//   return a + b;
// }

// const addExpression = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// //Example
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;
// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

//ATENCION ERROR
//BEST PRACTICES
//1. DON'T USE VAR
//2. DECLARE VARIABLES AT THE TOP OF EACH SCOPE
//3. ALWAYS DECLARE ALL YOUR FUNCTIONS FIRST, AND USE THEM AFTER THE DECLARATION (EVEN FUNCTION DECLARATIONS)
//4. NEVER USE A ARROW FUNCTION AS A METHOD

//NOTA
//Window object is the global object of JS in the browser. We can access it by writing window in the console.
//console.log(window);

//Obs: var creates a propery in the window object. var en let don't create a property in the window object

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

//INFORMACION
//THIS KEYWORD

//Some different ways to call a function
//  1. As a method (function attached to an object)
//Example:
// const jonas = {
//   name: 'Jonas',
//   year: 1989,
//   calcAge: function () {
//     //this.year = jonas.year
//     return 2037 - this.year;
//   },
// };

// jonas.calcAge();

//  2. Simple function call
//In strict-mode -> this = undifined. In non-strict mode this is window object (can be problematic)

//  3. Arrow functions:
// this = this keyword of the parent function (lexical this keyword)
//IMPORTANTE
//Arrow functions DO NOT GET THEIR OWN THIS KEYWORD

//  4. Event Listener:
//this: DOM element that the hadler is attached to.

// //Excersice: this keyword
// console.log(this); //Window object

// //  2. Simple function call (Example)
// const calcAge1 = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); //undifined in strict-mode
//   console.log(this); //window object in sloppy-mode
// };

// calcAge1(1991);

// //  3. Arrow functions:
// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); //In this case -> window (uses this keyword of the parent scope, does not get its own this keyword)
// };

// calcAgeArrow(1980);

// //  1. As a method (function attached to an object)
// //Example:
// const lia = {
//   year: 1989,
//   calcAge: function () {
//     //this.year = lia.year
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };

// lia.calcAge();

// const matilda = {
//   year: 2017,
// };

// //METHOD BORROWING ->
// matilda.calcAge = lia.calcAge;

// matilda.calcAge();

// const f = lia.calcAge;
// //console.log(f);
// //f();  this is undifined

//Regular Functions vs Arrow Functions
// var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(2037 - this.year);
//   },
//   //Arrow function: this will always be undifined
//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// jonas.greet();

//EXAMPLE ERROR: this in function inside a method
// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(2037 - this.year);

//     const isMillenial = function () {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial(); //ATENCION: simple function calls has undefined this
//   },
// };

// jonas.calcAge();

// //INFORMACION: 2 soluciones al ERROR anterior

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(2037 - this.year);

//     //1. PRE ES6
//     //     const self = this; //SOLUCION
//     //     const isMillenial = function () {
//     //       console.log(self);
//     //       console.log(self.year >= 1981 && self.year <= 1996);
//     //     };

//     //2. MODERN SOLUTION (using an arrow function)
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };

//     isMillenial();
//   },
// };

// jonas.calcAge();

// //INFORMACION
// //Arguments keyword: only available in regular functions
// //Obs: Useful when we need a function to accept more parameters that we actually specified. Not really used anymore in modern javascript
// const addExpression = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpression(2, 5);
// //More parameters than especified:
// addExpression(2, 5, 8, 12);

//When we have more than one line in the expression, we need to explicitly return.
// const addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

//addArrow(2, 5);

//INFORMACION
//Primitive vs Objects (Primitive vs Reference Types)

//Primitives:
//Examples: number, String, Boolean, Undefined, Null, Symbol, BigInt
// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

//Objects:
//Examples: object literal, arrays, functions, many more...
// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log(`Friend:`, friend);
// console.log(`Me:`, me);

//IMPORTANTE
//Solo los valores primitivos const son inmutables, los valores const de referencia si se pueden cambiar.
//NO SE PUEDE COPIAR UN OBJECTO (normalmente)
//***Cuando pensas que estas copiando un objeto, en realidad solo estas creando una nueva variable que apunta al mismo objecto

// //Example:
// let lastName = 'Williams';
// let oldLastName = lastName;
// lastName = 'Davis';

// console.log(lastName, oldLastName);

// const jessica = {
//   firstname: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
// };

// const marriedJessica = jessica;

// marriedJessica.lastName = 'Davis';

// console.log(`Before marriage: `, jessica);
// console.log(`After marriage: `, marriedJessica);

//IMPORTANTE
//HOW TO REALLY COPY OBJECTS:
//Using function object.assign() -> it merges two objects and returns a completely new object

const jessica2 = {
  firstname: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

console.log(`Before marriage: `, jessica2);
console.log(`After marriage: `, jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log(`Before marriage: `, jessica2);
console.log(`After marriage: `, jessicaCopy);

//ERROR Obs: this only works fot the first level. It doesn't work in the inner object if we have an object inside an object. Only creates a shallow copy

//IMPORTANTE A DEEP CLONE IS NOT EASY TO ACHIEVE, we use an external library: Lo-Dash
