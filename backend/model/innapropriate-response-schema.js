'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const innappropriateResponse = new Schema({
  beggingEndingPairsString: { type: String, require: true },
  response: { type: String, require: true }
})

module.exports = mongoose.model('innappropriate', innappropriateResponse);
