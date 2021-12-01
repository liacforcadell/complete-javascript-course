// let js = 'amazing';
// console.log(40 + 8 + 23 - 10);

// let firstName = 'Jonas';
// console.log(firstName);


// //Para saber el tipo de dato:
// // console.log(typeof true)
// // console.log(typeof 23)
// // console.log(typeof "Lia Cano")

// console.log(typeof firstName);
// firstName = 25;

// console.log(firstName);
// console.log(typeof firstName);

// let year;

// console.log(year);
// console.log(typeof year);

// year = 1991;
// console.log(year);
// console.log(typeof year);


// console.log(typeof null); //ERROR en Javascript!! muestra el tipo de dato como object cuando null no es objeto, el tipo debe ser un null

// //TRES DIFERENTES FORMAS DE DECLARAR UNA VARIABLE EN JAVASCRIPT (las variables en javascript se deben declarar con let o const, no es buena idea no declararlos por algun motivo)
// //cont y let se agregaron en Javascript 6 (modern javascript)
// //var es la forma mas vieja (old javascript)

// //LET = Variable cambia
// let age = 30;
// age = 31;

// //Definir dos variables al mismo tiempo
// let nombre, apellido;

// //CONST = Const are inmmutable
// //Const no se pueden declarar vacios, siempre se debe agregar el valor
// const birthYear = 1992;

// //VAR = DEBE EVITAR USARSE (OLD JAVASCRIPT)
// var job = "programmer"
// job = "teacher"

// //OPERATORS
// // + - * / Operadores normales

// //Exponenciacion, Ejemplo: 10 * 10
// const numero = 10;
// console.log(numero ** 2);

// const primerNombre = "Lia";
// const primerApellido = "Cano";

// console.log(primerNombre + " " + primerApellido);

// //Asignment operator
// let x = 10 + 5;
// x += 10; //significa x = x + 10;
// x++; //significa x = x + 1;
// console.log(x);

//Comparison operators
// >, <, >=, <=

//Operator Precedence (se puede ver buscando en google mdn operator precedence)

// const now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;
// console.log(now - 1991 > now - 2018);

// const averageAge = (ageJonas + ageSarah) / 2;
// console.log(averageAge);


// //STRINGS AND TEMPLETE LITERALS
// const firstName = "Jonas";
// const job = "teacher";
// const birthYear = 1991;
// const year = 2037;

// //Escribir asi es molesto, para evitar esto se usan los template literals
// const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + " years old " + job + "!";

// console.log(jonas);

// //Template Literals ``(se encuentra encima del tab)
// const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;

// console.log(jonasNew);

// console.log(`Just a regular string....`)

// //Multiple lines (OLD CUMBERSOME WAY)
// console.log('String with \n\
// multiple \n\
// lines');

// //Multiple lines (BEST WAY)
// console.log(`String with
// multiple
// lines`);


// //IF ELSE STATEMENTS
// const age = 15;

// //If Else control structure
// if (age >= 18) {
//     console.log(`Sarah can start driving license 😁`);
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`Sarah is too young. Wait another ${yearsLeft} years.`);
// }
// //Obs:Adding emoji: windows + .

// const birthyear = 1991;
// let century;
// if(birthyear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }
// console.log(century);


// //CHALLENGE 1

// const markWeight = 78;
// const markHeight = 1.69;
// const johnWeight = 92;
// const johnHeight = 1.95;

// const BMIMark = markWeight / markHeight ** 2;
// const BMIJohn = johnWeight / johnHeight ** 2;
// console.log(BMIMark, BMIJohn);

// const MarkHigherBMI = (BMIMark > BMIJohn);
// console.log(MarkHigherBMI);

// //CHALLENGE 2

// if (BMIMark > BMIJohn) {
//     console.log(`Mark's BMI (${BMIMark}) is higher than Johns(${BMIJohn}).`);
// } else {
//     console.log(`John's BMI(${BMIJohn}) is higher than Marks(${BMIMark}).`);
// }


//Type Conversion and Coercion
//We can only convert to a number, string or boolean

// //TYPE CONVERSION (manually)
// const inputYear = '1991';
// console.log(Number(inputYear), inputYear); //Esta funcion Number() convierte string a number, pero la constante original no se convierte!
// console.log(inputYear + 18);
// //Necesitamos una forma de convertir inputyear a number para realizar la operacion

// //Esta es la forma de hacerlo:
// console.log(Number(inputYear) + 18);

// console.log(Number("Jonas")); //Result: Nan (Not a number, means an invalid number)

// console.log(typeof NaN); //Is still a number, but an invalid one.

// //Converting numbers to strings
// console.log(String(23), 23);


// //TYPE COERCION (javascript converts behind the scenes)
// console.log('I am ' + 23 + ' years old.');


// //Behavios of + vs - * / (they behave differently)
// //Strings converting to numbers:
// console.log('23' - '10' - 3);
// console.log('23' * '2');
// console.log('23' / '2');


// //Number converting to string and concatinating:
// console.log('23' + '10' + 3);

// //Game
// let n = '1' + 1; //11 in String
// n = n - 1;      //10 in number
// console.log(n); //10 in number

// let x = 2 + 3 + 4 + '5';    //95 in String

// let y = '10' - '4' - '3' - 2 + '5'; //15 in String


//TRUTHY AND FALSY VALUES
//5 Falsy values: 0, "", undefined, null, NaN
//Falsy values: are values that are not exactly false, but will become false if we try converting them into a boolean
// //Truthy values: are values that will convert to true if we try converting them to boolean. Ej: any number that is not 0 or any string that is not empty "".
// //Falsys
// console.log(Boolean(0));
// console.log(Boolean(undefined));
// console.log(Boolean(""));
// console.log(Boolean(null));
// console.log(Boolean(NaN));

// //Truthys
// console.log(Boolean("Jonas"));
// console.log(Boolean({})); //Empty object
// console.log(Boolean(5));

// //Type coercion to Boolean
// const money = 100;
// if(money) {
//     console.log("Don't spend it all ;)");
// } else {
//     console.log("You should get a job!")
// }

// let height;

// if(height) {
//     console.log("YAY! Height is defined!");
// } else {
//     console.log("Height is UNDEFINED.");
// }


//EQUALITY OPERATORS
//== vs ===
//Triple equal is a strict equality operator (it does not perform type coercion, it only returns true when both values are exactly the same)

// //Example == (loose equality operator) vs === (strict equality operator)
// const x = "5";
// const y = 5;

// //NO USAR ESTE EN JAVASCRIPT!!!!!
// if(x == y)
// console.log("1. Son iguales, performs type coercion");

// //SOLO USAR EL ESTRICTO!!!!
// if(x === y)
// console.log("2. Son diferentes, doesnt perform type coercion");

// const age = 18;

// if(age === 18)
// console.log("You just became an adult :D");


// //GENERAL RULE: avoid the loose equality operator as much as posible. DO NOT USE IT!!!!


// // const favorite = prompt("What's your favorite number?"); //para preguntarle al usuario?

// // console.log(favorite);
// // console.log(typeof favorite);

// // if (favorite == 23)
// // console.log("Cool! 23 is an amazing number (==)");


// //ELSE IF BLOCK
// const favorite = Number(prompt("What's your favorite number?")); //se usa la funcion Number

// if (favorite === 23) {
// console.log("Cool! 23 is an amazing number (===)");
// } else if (favorite === 7) {
//     console.log('7 is also a cool number');
// } else if (favorite === 9) {
//     console.log('9 is also a cool number');
// } else {
//     console.log("Number is not 23 or 7 or 9")
// }

// //DIFFERENT OPERATOR (it also has a loose and a strict version) ALWAYS USE THE STRICT VERSION

// if (favorite !== 23)
//     console.log("Why not the 23?");

// //BOOLEAN LOGIC (LOGICAL OPERATORS)
// //NOT !
// //AND &&
// //OR  ||

// const hasDriversLicense = true; //A
// const hasGoodVision = true; //B

// console.log(hasDriversLicense && hasGoodVision);

// console.log(hasDriversLicense || hasGoodVision);

// console.log(!hasDriversLicense || hasGoodVision);

// if(hasDriversLicense && hasGoodVision) {
//     console.log("Sarah is able to drive")
// } else {
//     console.log("Someone else should drive")
// }

// const isTired = true; //C
// console.log(hasDriversLicense && hasGoodVision && isTired);

// if(hasDriversLicense && hasGoodVision && !isTired) {
//     console.log("Sarah is able to drive")
// } else {
//     console.log("Someone else should drive")
// }


// //CHALLENGE 3
// const averageDolphins = (96 + 108 + 89) / 3;
// const averageKoalas = (88 + 91 + 110) / 3;

// if (averageDolphins > averageKoalas && averageDolphins >= 100) {
//     console.log("Dolphins are the winners!! 🏆"); 
// } else if (averageDolphins < averageKoalas && averageKoalas >= 100) {
//     console.log("Koalas are the winners!! 🏆");
// } else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100){
//     console.log("There is a tie");
// } else {
//     console.log("No one won");
// }

// //SWITCH STATEMENT
// const day = 'monday';

// switch(day) {
//     case 'monday':  // day === 'monday'
//         console.log('Plan course structure');
//         console.log('Go to coding meetup');
//         break;
//     case 'tuesday': 
//         console.log('Prepare theory videos');
//         break;
//     case 'wednesday':   //TRUCO:
//     case 'thursday':    //corre el mismo codigo para valores diferentes
//         console.log('Write code examples');
//         break;
//     case 'friday': 
//         console.log('Record videos');
//         break;
//     case 'saturday':
//     case 'sunday':
//         console.log('Enjoy the weekend');
//     break;
//     default:
//         console.log("Not a valid day!")
// }

// if(day === 'monday') {
//     console.log('Plan course structure');
//     console.log('Go to coding meetup');
// } else if (day === 'tuesday') {
//     console.log('Prepare theory videos');
// } else if (day === 'wednesday' || day === 'thursday') {
//     console.log('Write code examples');
// } else if (day === 'friday') {
//     console.log('Record videos');
// } else if (day === 'saturday' || day === 'sunday') {
//     console.log('Enjoy the weekend');
// } else {
//     console.log("Not a valid day!")
// }

//STATEMENT AND EXPRESSION
//Expression: produces a value
//Statement: does not produce a value on itself, they are full sentences that translate the actions that we want the program to perform

// //In template literals we can only use expressions

// console.log(`I'm ${2037 - 1991} years old.`)

// //CONDITIONAL TERNARY OPERATOR (is an expression)
// //that means that we can have coditionals with this inside an template literal
// //Condition ? true : false;
// const age = 23;

// age >= 18 ? console.log("I like to drink wine") : 
// console.log("I like to drink water");

// const drink = age >= 18 ? "wine" : "water";
// console.log(drink);

// console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`)


// //CHALLENGE 4

// const bill = 430;

// const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;

// console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);

