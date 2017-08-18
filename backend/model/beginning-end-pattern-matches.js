'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beggingEndingPairs = new Schema({
  beggingEndingPairsString: { type: String, require: true },
  patternOccurence: { type: Number, require: true }
})

module.exports = mongoose.model('beggingEndingPair', beggingEndingPairs);
