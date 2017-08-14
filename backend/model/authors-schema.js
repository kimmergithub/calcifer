'use strict';

const mongoose = require('mongoose');
// this is a best practise
const Schema = mongoose.Schema;


// This is showing how you can nest schema!!!  So you attach things to things
const bookSchema = new Schema({
  // Working with nested data...
  title: { type: String, require: true },
  pages: { type: Number, require: true}
})

const authorSchema = new Schema({
  // Working with nested data...
  name: { type: String, require: true },
  age: { type: Number, require: true},
  books: [bookSchema]
})

// Loose coupling vs tight ===> using the .prototype vs placing the method inside the contructor which would classical inheritance.

module.exports = mongoose.model('Author', authorSchema);
