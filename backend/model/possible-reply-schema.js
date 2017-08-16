'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const correlatedReplySchema = new Schema({
  reply: { type: String, require: true },
  replyCleverness: { type: Number, require: true }
})

const replyRecognitionSchema = new Schema({
  endingPattern: { type: Array, require: true },
  replies: [ correlatedReplySchema ],
  samplesize: { type: Number, require: true}
});

module.exports = mongoose.model('ReplyRecognition', replyRecognitionSchema);
