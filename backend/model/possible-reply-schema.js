'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replyRecognitionSchema = new Schema({
  QueryReplyString: { type: String, require: true },
  replyString: { type: String, require: true },
  endingPattern: { type: Array, require: true },
  replyCleverness: { type: Number, require: true },
  samplesize: { type: Number, require: true}
});

module.exports = mongoose.model('ReplyRecognition', replyRecognitionSchema);
