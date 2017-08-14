'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word: { type: String, require: true },
  type: { type: String, require: true },
  patternOrigination: { type: String, require: true },
  probabilityOfPatternRecognition: { type: Number, require: true }
});

module.exports = mongoose.model('Word', wordSchema);
