'use strict';       //activates strict mode (makes it easier to write secure (avoid accidental bugs) javascript code)
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


//Review Functions

const calcAge = function (birthYear) {
    return 2037- birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if(retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years.`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired 🎉🥳`);
        return -1;
    }

 //   return `${firstName} retires in ${retirement} years.`;
}
console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));


//Resumen FUNCTIONS
//Function declaration: functions that can be used before its declared 

//Function expression, a function value stored in a variable (called anonymous functions)

//Arrow function, great for quick oneline functions, but they have no this keyword

//CODING CHALLENGE 1


