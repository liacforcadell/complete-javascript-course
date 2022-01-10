'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Implementing Smooth Scrolling

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation -> with Event Delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// BUILDING A TABBED COMPONENT

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause:
  if (!clicked) return;

  // Remove all class active:
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );

  // Adding active only to the tab clicked:
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (link !== el) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// NOT_PRETTY:
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// CORRECT BIND METHOD
// Passing an "argument" into handler (only one, and we pass the this keyword, not really an argument). If we want to pass multiple arguments, we can pass an array or an object.
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
const stickyNav = function (entries) {
  // Getting the first element of entries
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //all viewport
  threshold: 0, //0% visible
  rootMargin: `-${navHeight}px`, //90 pixels will be applied to our target, height of navigation. Navigation appears 90 pixels before the threshold is reached
  // IMPORTANTE
  // It is a good idea not to hardcode the rootMargin, to help with responsivenes in websites
});
headerObserver.observe(header);

// Revealing Elements on Scroll
// 1. Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  //Unobserve when it is no longer necessary:
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // We add it here to make the page visible to people who disable javascript in their browsers
  // section.classList.add('section--hidden');
});

///////////////////////////////////////////////////
// Lazy Loading Images
const imgTagets = document.querySelectorAll('img[data-src]'); //Selectuing all images that have the property of data-src
//console.log(imgTagets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace the src with data-src
  entry.target.src = entry.target.dataset.src;
  // BAD_PRACTICE
  // entry.target.classList.remove('lazy-img'); -> this will remove the blur of the image before it is loaded completely. This can cause that in a slow network, we see a pixeled image.
  // CORRECT
  // wait for the event load of the image, it will happen when the good quality image is complete loaded in the page
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  // Unobserving images
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTagets.forEach(img => imageObserver.observe(img));

////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // Just to see what we are doing:
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // FUNCTIONS

  // Creating dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    //Selectuing the dot that has the property of data-slide={numberSlide}
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // All slides
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  // Next Slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;
    // -100%, 0%, 100%, 200%
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Initialize sliders
  const initSliders = function () {
    // First Time: 0%, 100%, 200%, 300%
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  initSliders();

  // Event Handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard Events -> slider
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//SECCION
// Selecting Elements in the DOM:
// QuerySelector and QuerySelectorAll are the most used ones.
// console.log(document.documentElement); //Entire document
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
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
// const message = document.createElement('div'); //-> this creates a DOM element. This element is not yet in the DOM itself.

// Add a class:
// message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
// message.innerHTML =
// 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//SECCION
// ADDING ELEMENT AS THE FIRST CHILD: .prepend()
// Adding message to the header .prepend():
// header.prepend(message);
//--> prepend(): add the element as the first child of the element that calls the method. In this case it will add as the first child of header.

// ADDING ELEMENT AS THE LAST CHILD: .append()
// header.append(message);
//When we use .prepend() and append() with the same element ( in this case message), it will only be inserted once. In this case, the append() will just move the DOM element inserted before with prepend().

// INSERTING MULTIPLE COPIES OF THE SAME ELEMENT (multiple messages) -> cloneNode(true);
// header.append(message.cloneNode(true));

// INSERTING ELEMENTS AS A SIBLING ->
// header.before(message);
// header.after(message);

// SECCION
// DELETE ELEMENTS
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//Before method remove() existed we needed to do this:
// message.parentElement.removeChild(message);
// });

// IMPORTANTE
// STYLES
// Setting style on an element
// ATENCION
// this sets the styles as inline styles (not recommended)
// message.style.backgroundColor = '#37383d';
//Obs: .style.propertyName = string
// PropertyName need to use CamelCase.
// message.style.width = 'calc(100% + 6rem)';

// Reading styles: only works for styles that we set ourselves with the .style.namePoperty
// console.log(message.style.color); // Doesnt work
// console.log(message.style.backgroundColor); //WORKS!

//getComputedStyle() -> we can get all the styles that are in the CSS of an element, even when we didn't define them in the CSS stylesheet
// console.log(getComputedStyle(message)); //ALL properties of one element
// console.log(getComputedStyle(message).color); //Getting color
// console.log(getComputedStyle(message).height);

// message.style.height =
// Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//CSS CUSTOM PROPERTIES (CSS VARIABLES)
// document.documentElement.style.setProperty('--color-primary', 'orangered'); // -> changes this style --> :root {--color-primary: #5ec576;}

// ATRIBUTES of html element
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);
// //Setting attributes:
// logo.alt = 'Beautiful minimalist logo';

// //Non-standard
// console.log(logo.designer); //-> doesn't work
// console.log(logo.getAttribute('designer')); //-> works
// logo.setAttribute('company', 'Bankist');

// //IMPORTANTE URLS
// console.log(logo.src); //shows the ABSOLUTE URL
// console.log(logo.getAttribute('src')); //shows the RELATIVE URL
// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// Data attributes
// <!-- data atribute: needs to start with data- -->
// reads atribute -> data-version-number="3.0"
// console.log(logo.dataset.versionNumber); //-> transform version-number in camerCase

// Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c'); //removes it if its present and adds it if it is not present
// logo.classList.contains('c');

// BAD_PRACTICE DO NOT USE!!! -> it overrides all existing classes and it only allows to add one class.
// logo.className = 'jonas';

// SECCION
///////////////////////////////////////
// Implementing Smooth Scrolling

// btnScrollTo.addEventListener('click', function (e) {
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
// section1.scrollIntoView({ behavior: 'smooth' });
// });

//SECCION
// TYPES OF EVENTS AND EVENT HANDLERS:

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading');
// });

// https://developer.mozilla.org/en-US/docs/Web/Events

// Another way of listening to events:
// *** OLD WAY (not used anymore):
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading');
// };

// addEventListener vs Old Way (onEvent):
// - addEventListener lets you add multiple events listeners to the same event.
//Example - second event listener:
// h1.addEventListener('mouseenter', function (e) {
//   alert('Sencond Event Listener does not overwrite the first one');
// });

// - We can remove an event handler in case we don't need it anymore.
// Example:

// Export event in his own function and removes the event after it happens. This way, we can only listen to the event once.
// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading');
//   // h1.removeEventListener('mouseenter', alertH1);
//   // We can also remove event after a certain time has passed:
//   setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// };

// h1.addEventListener('mouseenter', alertH1);

//BAD_PRACTICE DO NOT USE!!
// a third way of handling events is using an html atribute.

// SECCION
// EVENT PROPAGATION: BUBBLING AND CAPTURING
// 1. The event is generated at the root of the document, at the top of the DOM tree.
// 2. The event travels to the target throght the DOM tree (Capturing Phase), it passes throught every single parent element of the target element.
// 3. Target Phase begins when the event reaches the target element.
// 4. The event then travels all the way to the document root again, through all the parents -> Bubbling Phase. This makes it as if the event also happened in each of the parent elements.
// https://javascript.info/bubbling-and-capturing

// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// // console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // e.target -> it is where the event happened (where the click happened), not the element where the event Handler was attached
//   console.log('LINK', e.target, e.currentTarget);
//   // Current target is the same as the this keyword
//   console.log(e.currentTarget === this);

//   // Stopping the event propagation -> generally not used, not a good idea
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// ERROR
// Catch events during the Capturing Phase -> this is not really useful. To do this we add a third parameter in the addEventListener function.
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);
//   },
//   true //Now it will listen to capturing events instead of bubbling events.
// );

// SECCION
// EVENT DELEGATION: Implementing Page Navigation
///////////////////////////////////////
// Page Navigation
//  IMPORTANTE
/* Easy solution to scrolling in CSS: */
/* html {
  scroll-behavior: smooth;
} */

// BAD_PRACTICE THIS WAY IS NOT EFFICIENT:
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// IT IS BETTER TO USE EVENTS DELEGATION:
// In this case, we put the event listener in a common parent of all the elements that we are interested in. When a user click in the links, the event generates and bubbles up, we also know where the event originated.

// Another great use of event delegation: when we are working with elements that are not yet on the page in runtime (when the page loads), but are added later, since it is not possible to add event handlers to elements that do not exist.

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();

//   // Matching strategy
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// SECCION
// DOM TRAVERSING: walking throught the DOM
/////////////////////////////////////////////
// We can select an element based on another element.
// Sometimes we need to select elements relative to a certain other element, for ex: direct child or parent. Other time we need it because we dont know the structure of the DOM at runtime.

// const h1 = document.querySelector('h1');

// // *** Going donwwards: child (there is no limit to how downwards it will go)
// console.log(h1.querySelectorAll('.highlight'));
// // ONLY DIRECT CHILD:
// console.log(h1.childNodes); //Not very used
// console.log(h1.children); // HTMLCollection -> it is updated
// // Only first element child
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// *** Going Upwards: parents
// Only for direct parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// //Closest parent .... no matter how far up in the DOM tree
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Selects the element itself
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// *** Going sideways: siblings (we can only access direct siblings)
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// // For nodes:
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// All the siblings:
// Move to the parent and then read all the children from there:
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// SECCION
// BUILDING A TABBED COMPONENT
/////////////////////////////////////////////
// console.log(tabs);
// console.log(tabsContainer);
// console.log(tabsContent);

//BAD_PRACTICE -> this way is not efficient for hundred of tabs.
// tabs.forEach(tab => tab.addEventListener('click', () => console.log('TAB')));

// // CORRECT
// // USING EVENT DELEGATION:
// tabsContainer.addEventListener('click', function (e) {
//   // Matching: we use closest() because we need the element operations tab even when we click on the children of the tab (span)
//   const clicked = e.target.closest('.operations__tab');
//   console.log(clicked);

//   // Guard clause:
//   if (!clicked) return; //Fixes that when we click in the container, we get an error

//   // ACTIVE TAB
//   // Remove class active from all tabs:
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   // Adding active only to the tab clicked:
//   clicked.classList.add('operations__tab--active');

//   // ACTIVATE CONTENT AREA
//   //Class content: operations__content--1
//   // const contentNumber = clicked.dataset.tab;
//   // console.log(contentNumber);

//   // Remove all active
//   tabsContent.forEach(cont =>
//     cont.classList.remove('operations__content--active')
//   );
//   // Show only correct content
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

// SECCION
// PASSING ARGUMENTS TO EVENT HANDLERS
/////////////////////////////////////////////

///////////////////////////////////////
// Menu fade animation
// mouseover event is similar to mouseenter event, the difference is that mouseenter does not bubble.
//  Opposites (undo what opposite does):
// 1. mouseover -> mouseout
// 2. mouseenter -> mouseleave

// nav.addEventListener('mouseover', function (e) {
//   // Matching (closest is not necesary here because there are not child elements that we can click)
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     // Select sibling elements:

//     // const allLinks = link.closest('.nav__links').children;
//     // BEST_PRACTICE -> use closest and querySelector to make the solution more robuste. If we add parents and children to the html later, the js will still work.

//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (link !== el) el.style.opacity = '0.5';
//     });
//     logo.style.opacity = '0.5';
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (link !== el) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// SECCION BAD_PRACTICE
// IMPLEMENTING A STICKY NAVIGATION,
// THE SCROLL EVENT
/////////////////////////////////////////////////////

// BAD_PRACTICE
// -> Scroll Event: it is not efficient and should be avoided.
// ERROR SCROLL EVENT -> BAD PERFORMANCE!!
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function (e) {
//   //console.log(e);
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// SECCION
// IMPLEMENTING A STICKY NAVIGATION,
// THE INTERSECTION OBSERVER API -> allows our code to observe changes to the way that a certain target element intersects another element or the way in intersects the viewport.
/////////////////////////////////////////////////////

// Sticky Navigation
// -> Arguments of intersection observer API: (callback function, object of options)
// const obsCallback = function (entries, observer) {
//   //Arguments:
//   //entries: is the threshold
//   //observer: observer object itself
//   entries.forEach(entry => console.log(entry));
//   //nav.classList.add('sticky');
// };
// const obsOptions = {
//   //Root property: element we want out target (section1) to intercept.
//   root: null, // viewport
//   // threshold: percentage of intersection at which the obeserver callback will be called
//   // threshold: 0.1, //we can have multiple (array)
//   threshold: [0, 0.2],
//   //threshold: 0 = means that out callback will trigger each time the target element moves completely out of the view and a soon as it enters the view
//   // threshold: 1 = the callback will be called only when 100% of the target is visible in the viewport. With the example of section 1 it will be imposible because the section is bigger than the viewport
// };

// // 1. Creating a new intersection observer()
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // 2. Observe a certain target:
// observer.observe(section1);

// SECCION
// LIFECYCLE DOM EVENTS -> right from the moment that the page is first access until they leave the page.
/////////////////////////////////////////////
// 1. DOM CONTENT LOADED -> fired by the document as soon as the HTML is completely parsed (means html downloaded and converted to the DOM tree), also all scripts must be downloaded and excecuted before this event can happen.
// This event does not wait for images and other external resources to load, just HTML and JS.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

/////////////////////////////////////////////
// 2. LOAD EVENT -> fired by the window as soon as the html is parsed and all images and external resources are also loaded. When the complete page has finished loading.

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

/////////////////////////////////////////////
// 3. BEFORE UNLOAD -> event created inmediatly before a user is about to leave the page. Ex: after clicking the close tab in the browser.
// window.addEventListener('beforeunload', function (e) {
//   // Used by some pages to ask the user if they are sure they want to leave the page. Sometime to make it work in some browsers we need to prevent default.
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

// SECCION
// EFFICIENT SCRIPT LOADING -> defer and async
// 1. Regular -> <script src="script.js"></script>
// 2. Async -> <script async src="script.js"></script> Only modern browser support it
// 3. Defer -> <script defer src="script.js"></script> Only modern browser support it

// WE can write the script tag at the document Head or at the end of the body.

// BAD_PRACTICE
// NEVER PUT THE REGULAR SCRIPT TAG AT THE HEAD, when we use the regular script tag,
// CORRECT: we need to put it at the end of the body.

// ASYNC -> the html is parsed at the same time that the script is loaded. The problem is that the html stops loading for the scripts execution. It is still better than putting the regular script in the head.
// Usually, the DOMContentLoaded event waits for all scripts to be excecuted before happening, but not in this case. The event will happen as soon as the html completes parsing.
// Script not guaranteed to execute in order.
// Can be used for script libraries that your code will not need to interact with, because we dont care about the order or execution of the scripts in that case. Ex: analitycs software, adscript, etc.

// CORRECT DEFER -> BEST SOLUTION!! -> the html is parsed at the same time that the script is loaded and the script is executed at the end, after all the HTML is parsed. This way, the HTML parsing is NEVER interrupted.
// Scripts are executed in order that are written in the code.
