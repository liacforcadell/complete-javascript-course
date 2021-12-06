'use strict';

//Usually in a new project we select everithing that we are going to need and we store them into variables, so we can reuse them.

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

//Use querySelectorAll when we have multiple elements whith the same class name that we need to select
const btnsOpenModal = document.querySelectorAll('.show-modal');
//console.log(btnsOpenModal);

// //MANIPULATING CLASSES WITH JAVASCRIPT
// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', function () {
//     //console.log(btnsOpenModal[i].textContent);
//     //IMPORTANTE
//     //classList.remove (removes a class from html element) You can also remove multiple classes, just passing them as various parameters. Example: classList.remove('hidden', 'card');
//     //With classList.remove we do not use the . to specify the name of the class
//     //The . is only for the selector
//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
//   });
// }

//OPENING MODAL WINDOW
//ATENCION la funcion debe estar antes que la llamada
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

//HIDING MODAL WINDOW
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//IMPORTANTE
//Al llamar a la funcion addEventListener le pasamos como segundo parametro el nombre de una funcion que nosotros creamos, pero NO LLAMAMOS A ESA FUNCION! Javascript va a llamar a la funcion cuando el evento pase
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//NOTA
//KEYBOARD EVENT (ESC)
//these are global events and they do not happen for one specific element
//We usually list global events on the whole document

//Document.addEventListener() -> we are listening for events everywhere.
//There are 3 types of events for the keyboard
//1. ('keydown') -> fired as soon as we press down the key
//2. ('keypress') -> fired continuosly as we keep our finger on a certain key
//3. ('keyup') -> happens when we lift our fingers off the keyboard

// //EXAMPLE: IT HAPPENS FOR ALL KEYS
// document.addEventListener('keydown', function () {
//   console.log('A key was pressed');
// });

//IMPORTANTE
//To access information about the key that was pressed.
//When an event happens, javascript generates an object that contains all the information about the event itself, and we can access that info in the eventHandler function

//NOTA we only want to close the modal with escape when the modal is visible
document.addEventListener('keydown', function (e) {
  //console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
