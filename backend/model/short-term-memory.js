// 'use strict';
//
// //THIS IS CALCIFER'S SHORT TERM MEMORY ===
// // I may find a use for this... storing data that calcifer doesn't need long term is a possibility.
// Person.all = [];
//
// let currentPersonName;
// let currentPersonGender;
// let currentPersonAge;
//
// function Person(name, gender, age){
//   this.name = name;
//   this.gender = gender;
//   this.age = age;
//   Person.all.push(this);
// }
//
// function emptyStorage () {
//   if (localStorage.length === 0) {
// // Create local storage items
// // IN this case === a javascript object for calcifer...
// // this is to recognize names in the short term...
//     new Person(currentPersonName, currentPersonGender, currentPersonAge);
//   } else {
//     //pullstorage function
//     retrieveFromStorage();
//   }
// }
//
// function moveToStorage () {
//   var allStore = JSON.stringify(Person.all);
//   localStorage.setItem('data', allStore);
// }
//
// function retrieveFromStorage () {
//   var allStore = localStorage.getItem('data');
//   Product.all = JSON.parse(allStore);
// }
