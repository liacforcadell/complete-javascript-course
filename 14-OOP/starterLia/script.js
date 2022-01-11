'use strict';

// IMPORTANTE
// OOP IN JS
// Prototypes -> ( similar to class)
// Prototypes contains methods and properties that all the objects that are linked to that prototype can access and use. (CALLED PROTOTYPAL INHERITANCE)
// PROTOTYPAL INHERITANCE -> basically an instance inheriting from a class.
// Objects (similar to instances) are linked to a prototype object.

// SECCION
// 3 ways of implementing prototypal inheritance in JS
// 1. Cronstructor functions
// 2. ES6 Classes
// 3. Object.create()

// SECCION
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// CONVENTION: in constructor functions, the name of the function always starts with a Capiltal Letter.
// we can use a function expression or a function declaration, but not an arrow function.
const Person = function (firstName, birthYear) {
  // CONVENTION: property and parameter with the same name
  // Instance properties:
  this.firstName = firstName;
  this.birthYear = birthYear;

  // BAD_PRACTICE: creating a method inside a constructor function
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const lia = new Person('Lia', 1992);
console.log(lia);

// The new operator:
// 1. An {} empty object is created.
// 2. function is called, this keyword is {} the new empty object
// 3. The {} is linked with __proto__ to the constructor function's prototype property (in ex. Person.prototype)
// 4. function automatically returns object {}, not always empty
// Obs: this works with function constructors and ES6 classes.

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda);
// console.log(jack);

// console.log(lia instanceof Person);

// SECCION
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// PROTOTYPES
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// // Adding a method:
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// lia.calcAge();

// console.log(lia.__proto__);
// console.log(lia.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(lia));
// console.log(Person.prototype.isPrototypeOf(Person));
// // PrototypeOfLinkedObjects

// // Setting properties in the prototype:
// Person.prototype.species = 'Homo Sapiens';
// console.log(lia.species, matilda.species);

// console.log(lia.hasOwnProperty('firstName'));
// console.log(lia.hasOwnProperty('species'));

// SECCION
//////////////////////////////////////////////////
// PROTOTYPAL INHERITANCE AND THE PROTOTYPE CHAIN
//////////////////////////////////////////////////
// Every object in java has a prototype. Since Person.prototype is also an object, it has its own prototype.

// Prototype Chain: series of links between objects, linked through prototypes.

// Object(lia) -> __proto__ -> Person.prototype ->  __proto__ -> Object.prototype __proto__ -> null

// Constructor function
//  [Object()] -> Built-in constructor function for objects. It is used when we write an object literal -> {}

// SECCION
//////////////////////////////////////////////////
// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
//////////////////////////////////////////////////
// console.log(lia.__proto__);
// console.log(lia.__proto__.__proto__); // Prototype property of object -> Object.prototype
// console.log(lia.__proto__.__proto__.__proto__); // null
// console.log(Person.prototype.constructor);
// console.dir(Person.prototype.constructor);

// const arr = [3, 3, 5, 5, 8, 7, 7];
// // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// Adding a new custom method to Array: this will ensure that all the arrays inherit this new method
// BAD_PRACTICE extending the prototype of a built-in object is generally not a good idea.
//Reasons: next version of js might add a method with the same name as out custom method.
// When working on a team is a bad idea
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.log(h1);
// console.dir(x => x + 1); // Functions are also Objects, they have prorotypes

// // SECCION
// //////////////////////////////////////////////////
// // CHALLENGE #1
// //////////////////////////////////////////////////

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const car1 = new Car('BMW', 120);

// //Implementing methods
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// console.log(car1);

// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car1.break();
// car1.break();
// car1.break();
// console.log(car1);

// SECCION
//////////////////////////////////////////////////
// ES6 CLASSES - CORRECT -> SINTAX LOOKS BETTER
//////////////////////////////////////////////////
// Class Expression
// const PersonCl = class {};
// Class Declaration
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   // Adding methods -> the methods added to the class outside of the constructor will be on the prototype of the object, not on the objects themselves. This are called instance methods.

//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }
// }

// const jessica = new PersonCl('Jessica', 1996);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.__proto__ === PersonCl.prototype);

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey ${this.firstName}`);
// // };
// jessica.greet();

// 1. Classes are NOT HOISTED, even classes declarations. That means that we cannot use them before they are declared. Function declarations are indeed hoisted, but the same thing does not apply to classes declarations.
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode

// SECCION
//////////////////////////////////////////////////
// GETTERS AND SETTERS -> can be very useful for data validation
//////////////////////////////////////////////////

// const account = {
//   owner: 'Jonas',
//   movements: [200, 450, 150, 300],
//   // Assing a getter
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   // Assing a setter -> need exactly ONE PARAMETER
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };
// ATENCION
// Using the getter method -> we do not call the method to use it. We just use it like a property
// console.log(account.latest);

// // Using the setter method ->
// account.latest = 50;
// console.log(account.movements);

// class PersonClass {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }
//   // Adding getter
//   get age() {
//     return 2037 - this.birthYear;
//   }
//   // USING SETTER FOR VALIDATION -> we need to use it with the same name as the property we want to validate. This means that each time this.fullName = fullName of the constructor is executed, the setter will be executed.
//   // IMPORTANTE -> agregar _ a la propiedad que se quiere validar, o sino da un error fullstack. _ es una CONVENCION.
//   // Esto crea una propiedad llamada _fullName
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a fullname`);
//   }
//   // Porque la propiedad de llama _fullname, no podemos hacer esto: LiaCano.fullName;
//   // Para solicionar eso, debemos agregar un getter
//   get fullName() {
//     return this._fullName;
//   }
// }

// const liaCano = new PersonClass('Lia Cano', 1996);

// console.log(liaCano.age);
// console.log(liaCano.fullName);

// const walter = new PersonClass('Walter White', 1965);
// console.log(walter.fullName);

// SECCION
//////////////////////////////////////////////////
// STATIC METHODS
//////////////////////////////////////////////////
// Array.from() -> its not in the array prototype proterty, it is attached to the Array constructor. Therefore, all the arrays do not inherit this method, because it is not on their prototype.
// Obs: in this case we say that the from method is in the array's namespace.
// Example:
// Array.from() CORRECT
// [5,2,6].from() ERROR

// Static methods They are not available on the instances.

// Another example of a static method: Number.parseFloat(12);

// IMPLEMENTING STATIC METHODS:
const PersonStatic = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonStatic.hey = function () {
  console.log('Hey there! 😎');
  console.log(this); //-> entire constuctor function
};

const liaStatic = new PersonStatic('Lia Fiorella', 1992);

PersonStatic.hey();

// ERROR
// liaStatic.hey(); -> this doesn't work because the hey method is not in the prototype of the liaStatic object.

class PersonClassStatic {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Instance methods:
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullname`);
  }
  get fullName() {
    return this._fullName;
  }

  // Creating a static method:
  static hey() {
    console.log('Hey there! 😎');
    console.log(this);
  }
}

const taylor = new PersonClassStatic('Taylor Swift', 1989);
console.log(taylor);
// taylor.hey(); -> DOES NOT WORK

// SECCION
//////////////////////////////////////////////////
// OBJECT.CREATE() -> there is still the idea of prototypal inheritance, but there are not prototype properties involved and also no contructor functions or new operator.
// With this, we can set the prototype of objects manually to any object that we want.
// Least used way of implementing prototypal inheritance
//////////////////////////////////////////////////
//
// create an object that we want to be the prototype of all the person objects and add all the methods we want the person object to inherit
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  //Adding properties (not a constructor, because we are not using the new operator to call this):
  init(firstName, birthyear) {
    this.firstName = firstName;
    this.birthYear = birthyear;
  },
};

//Object.create(prototype) -> returns a brand new Object that is linked to the prototype that we passed
const steven = Object.create(PersonProto);
console.log(steven);

//BAD_PRACTICE:
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sara = Object.create(PersonProto);
// Adding properties:
sara.init('Sara', 1969);
console.log(sara);
sara.calcAge();

// SECCION
/////////////////////////////////////////////////
// CHALLENGE #2
/////////////////////////////////////////////////

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }
  breake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const car1 = new Car('Ford', 120);

console.log(car1);
console.log(car1.speedUS);
car1.accelerate();
car1.breake();
console.log(car1);

// ATENDER -> GETTER NO SE LLAMA CON ()
console.log(car1.speedUS);

// USANDO SETTER
car1.speedUS = 50;
console.log(car1);

// SECCION
/////////////////////////////////////////////////
// INHERITANCE BETWEEN CLASSES: CONSTRUCTOR FUNCTIONS
/////////////////////////////////////////////////
const Persona = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Persona.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Child class: we pass the same arguments of Persona and some aditional ones.
const Student = function (firstName, birthYear, course) {
  //BAD_PRACTICE :
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  //CORRECT:
  Persona.call(this, firstName, birthYear);
  this.course = course;
};

// IMPORTANTE: se debe crear esta conexion antes de agregar cualquier metodo a student.prototype
// Linking prototypes:
Student.prototype = Object.create(Persona.prototype); //-> returns an empty object
Student.prototype.constructor = Student; //-> arreglar el constructor despues de que object.create le haya puesto a Persona como contructor de student

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor);

// Ambos dan true porque ambos prototypes estan unidos.
console.log(mike instanceof Student);
console.log(mike instanceof Persona);
console.log(mike instanceof Object);

// SECCION
/////////////////////////////////////////////////
// CHALLENGE #3
/////////////////////////////////////////////////
