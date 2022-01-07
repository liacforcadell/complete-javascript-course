'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//SECCION
// Selecting Elements in the DOM:
// QuerySelector and QuerySelectorAll are the most used ones.
// console.log(document.documentElement); //Entire document
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); //Returns NodeList
// console.log(allSections);

// document.getElementById('section--1'); //do not use #
// const allButtons = document.getElementsByTagName('button'); //Returns HTMLCollections, it updates automatilly if the html elements that are inside the collection changes. This automatic update doesnt ocurr with a NodeList (querySelectorAll).
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));
// Returns an HTMLCollection that uodates itself.

//SECCION
// Creating and inserting elements.
// .insertAdjacentHTML()

//Creating element in HTML:
//
// Argument -> (string of the tag name) Ex: 'div'
const message = document.createElement('div'); //-> this creates a DOM element. This element is not yet in the DOM itself.

// Add a class:
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//SECCION
// ADDING ELEMENT AS THE FIRST CHILD: .prepend()
// Adding message to the header .prepend():
// header.prepend(message);
//--> prepend(): add the element as the first child of the element that calls the method. In this case it will add as the first child of header.

// ADDING ELEMENT AS THE LAST CHILD: .append()
header.append(message);
//When we use .prepend() and append() with the same element ( in this case message), it will only be inserted once. In this case, the append() will just move the DOM element inserted before with prepend().

// INSERTING MULTIPLE COPIES OF THE SAME ELEMENT (multiple messages) -> cloneNode(true);
// header.append(message.cloneNode(true));

// INSERTING ELEMENTS AS A SIBLING ->
// header.before(message);
// header.after(message);

// SECCION
// DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //Before method remove() existed we needed to do this:
    // message.parentElement.removeChild(message);
  });

// IMPORTANTE
// STYLES
// Setting style on an element
// ATENCION
// this sets the styles as inline styles (not recommended)
message.style.backgroundColor = '#37383d';
//Obs: .style.propertyName = string
// PropertyName need to use CamelCase.
message.style.width = 'calc(100% + 6rem)';

// Reading styles: only works for styles that we set ourselves with the .style.namePoperty
console.log(message.style.color); // Doesnt work
console.log(message.style.backgroundColor); //WORKS!

//getComputedStyle() -> we can get all the styles that are in the CSS of an element, even when we didn't define them in the CSS stylesheet
// console.log(getComputedStyle(message)); //ALL properties of one element
console.log(getComputedStyle(message).color); //Getting color
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//CSS CUSTOM PROPERTIES (CSS VARIABLES)
document.documentElement.style.setProperty('--color-primary', 'orangered'); // -> changes this style --> :root {--color-primary: #5ec576;}

// ATRIBUTES of html element
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
//Setting attributes:
logo.alt = 'Beautiful minimalist logo';

//Non-standard
console.log(logo.designer); //-> doesn't work
console.log(logo.getAttribute('designer')); //-> works
logo.setAttribute('company', 'Bankist');

//IMPORTANTE URLS
console.log(logo.src); //shows the ABSOLUTE URL
console.log(logo.getAttribute('src')); //shows the RELATIVE URL
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// <!-- data atribute: needs to start with data- -->
// reads atribute -> data-version-number="3.0"
console.log(logo.dataset.versionNumber); //-> transform version-number in camerCase

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c'); //removes it if its present and adds it if it is not present
logo.classList.contains('c');

//ERROR DO NOT USE!!! -> it overrides all existing classes and it only allows to add one class.
// logo.className = 'jonas';

// SECCION
///////////////////////////////////////
// Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // *** OLD WAY
  // Getting coordinates of the element that we will scroll to:
  // const s1coords = section1.getBoundingClientRect();
  // // The coordinates are relative to the viewport
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset); // view the position of scrolling
  // // Height and width of the viewport
  // console.log(
  //   'Height/Width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // SCROLLING (arguments -> left and top) + it is important to add the current scroll position to the top position because otherwise the scroll will not work correctly if we are not on the top of the page.
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // SCROLLING with animation: we need to specify an object with left, top and behavior properties.

  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // *** MODERN WAY IMPORTANTE -> only works in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});
