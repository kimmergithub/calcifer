'use strict';

const mongoose = require('mongoose');
// this is a best practise
const Schema = mongoose.Schema;

// Create SCHEME AND model
// We will do this for every SCHEMA ever moving forward
const entrySchema = new Schema({
  // Name must be a string and a name is required!
  // YOU CAN GOOGLE THESE MONGOOSE SCHEMA TYPES
  entry: { type: String, require: true },
  weight: { type: Number, require: false}
})

// This is showing how you can nest schema!!!  So you attach things to things

module.exports = mongoose.model('Entries', entrySchema);
