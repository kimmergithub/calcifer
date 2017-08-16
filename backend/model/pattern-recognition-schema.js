'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const endingPatternAndPointsSchema = new Schema({
  endingPattern: { type: Array, require: true },
  endingPatternString: { type: String, require: true },
  patternOccurence: { type: Number, require: true }
})

const patternRecognitionSchema = new Schema({
  startingPattern: { type: Array, require: true },
  startingPatternString: { type: String, require: true },
  endingPattern: [endingPatternAndPointsSchema],
  samplesize: { type: Number, require: true }
});

module.exports = mongoose.model('PatternRecognition', patternRecognitionSchema);

// { Type: Number, require: true, default: 0}
