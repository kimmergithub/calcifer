'use strict';

const express = require('express');
// express Router replaces the .app... now we are using router.
const router = express.Router();
const Entry = require('../model/responses-data');
const Word = require('../model/word-schema');
const PatternRecognition = require('../model/pattern-recognition-schema');
const ReplyRecognition = require('../model/possible-reply-schema');
const BeggingEndingPair = require('../model/beginning-end-pattern-matches');

// NOTE: FRONT END
// to access these APIs on the front end you'll have to create an event handles and build an API sting form the data input that will do what you want it to do and use certain functions like fetch and etc...

// get a list of ninjas from the db
// the order of req and res is VERY important!  we need to make a request before asking for a response
// THIS GET REQUEST IS GOING TO BE THE KEY TO CALCIFER
// URL params are NOT the same as route params!!!
router.get('/ninjas', function(req, res, next){
  // probably will be using req.query to query data!
  // Quering the database efficiently is the key! to crushing calcifer.

  // THIS WORKS!!!
  // res.send({type: 'GET'}).then(function(){
  //
  // THIS WORKS!!! === SO KNOW YOU JUST HAVE TO BUILD SOMETHING THAT CAN TAKE IN GENERAL VARIABLES AROUND THE STATS OF THIS!
  Entry.find({'weight': 80}).then(function(entry){
    res.send(entry);
    console.log(entry);
  })
});


router.get('/words', function(req, res, next){
  Word.find({}).then(function(words){
    res.send(words);
    console.log(words);
  })
});

router.get('/words/:word', function(req, res, next){
    Word.find({word: req.params.word}).then(function(words){
      res.send(words);
      console.log(words);
  })
});

// Need to do an ajax post which will hit this post route which will use the schema...
router.post('/words', function(req, res, next){
  console.log('req.body = ' + req.body);
  console.log('res.body = ' + res.body);
  Word.create(req.body).then(function(words){
    res.send(words);
    console.log(words);
  }).catch(next);
});

//GETTING PATTERNS
router.get('/PatternRecognition/:startingPatternString', function(req, res, next){
    PatternRecognition.find({startingPatternString: req.params.startingPatternString}).then(function(pattern){
      res.send(pattern);
      console.log(pattern);
  })
});

//PUTTING PATTERN
router.put('/PatternRecognition/:startingPatternString', function(req, res, next){
  PatternRecognition.findOneAndUpdate({startingPatternString: req.params.startingPatternString}, {$push: {endingPattern: req.body.endingPattern[0]}, $inc: {samplesize: 1}}, {new: true}).then(function(pattern){
    res.send(pattern);
    console.log(pattern);
  }).catch(function(error){
    console.log(error);
  })
});

// get PatternRecognitionBeginEnd
router.get('/PatternRecognitionBeginEnd/:beggingEndingPairsString', function(req, res, next){
    console.log(req.params);
    console.log('hitting this!')
    Word.find({beggingEndingPairsString: req.params.beggingEndingPairsString}).then(function(words){
      res.send(words);
      console.log(words);
  })
});
//
//PUTTING PATTERN  INC. BeginngingENDpairs
router.put('/PatternRecognitionBeginEnd/:beggingEndingPairsString', function(req, res, next){

  console.log(req.params);

  BeggingEndingPair.findOneAndUpdate({beggingEndingPairsString: req.params.beggingEndingPairsString}, { $inc: {patternOccurence: 1} }, {new: true}).then(function(pattern){
    res.send(pattern);
    console.log(pattern);
  }).catch(function(error){
    console.log(error);
  })
});

//POSTING PATTERN
router.post('/PatternRecognition', function(req, res, next){
  console.log('req.body = ' + req.body);
  console.log('res.body = ' + res.body);
  PatternRecognition.create(req.body).then(function(pattern){
    res.send(pattern);
    console.log(pattern);
  }).catch(next);

  // });
});

//Posting BeginngingENDpairs
router.post('/PatternRecognitionBeginEnd', function(req, res, next){

  BeggingEndingPair.create(req.body).then(function(pattern){
    res.send(pattern);
    console.log(pattern);
  }).catch(next);
});


//GET replies
router.get('/PatternReply/:QueryReplyString', function(req, res, next){
    ReplyRecognition.find({QueryReplyString: req.params.QueryReplyString}).then(function(pattern){
      res.send(pattern);
      console.log(pattern);
  })
});

//POST REPLY
router.post('/PatternReply', function(req, res, next){
  console.log('req.body = ' + req.body);
  console.log('res.body = ' + res.body);
  ReplyRecognition.create(req.body).then(function(pattern){
    res.send(pattern);
    console.log(pattern);
  }).catch(next);
});

// Have manipulate this to push data into that array!
router.put('/words/:id', function(req, res, next){
  // this is going to update! the entry! by the targeted id and params... with the req.body! == change with req.body... target with id.
  // , {$push: req.body}
  console.log(req.body);
  console.log('b');
  console.log('b');
  console.log(Object.values(req.body)[0][0]);
  console.log('b');
  console.log('b');
  console.log(req.body.name[0]);

  Word.findByIdAndUpdate({_id: req.params.id}, { $pushAll: req.body } , {new: true}).then(function(word){
    console.log('word', word)
    res.send(word)
    Word.findOne({_id: req.params.id}).then(function(words){
      // BECAUSE we get the old ninja back! we are going to fire another then function which finds the entry by its id again, but this time it will be the new entry! and then we'll return it!
      res.send(words);
    })
  });
});

// GET WE CAN TEST IN THE browser === THESE WE WILL TEST IN POSTMAN!!!
// STEPS ===
// === Go to postman!
// === Go to the url localhost:(designated #)/api/ninjas  === (or what have you)
// === DROP DOWN === POST!!!
// === Go to body
// === √ raw (for raw data)
// === drop-down JSON for json data
// add a new ninja
router.post('/ninjas', function(req, res, next){
  // the NEXT method is what fires in the event of an error!
  // now that we have our body-parser on server.js we can do the req.body
  // if we do the post man! we will get this console.log in the terminal!
  // This will create a new ENTRY instance and save it!!! The create() is a mangoose method.
  Entry.create(req.body).then(function(entry){
    res.send(entry);
    // catch is for the middleware for errors!  if the validation fails it tells the user what went wrong!
  }).catch(next);
});

// NOTE ON MIDDLEWARE === middleware will parse the data in between the req and res and attach it to the req.object?  app.use(body-parser)?...  ORDER IS HIGHLY IMPORTANT!!!
// BODY PARSER GOES BEFORE THE HANDLER!

// update ninja in db


// I WAS TOLD MY DATA SCTURCTURE MAY NOT BE MONGODB THE BEST! === base level structure may be better...
router.put('/ninjas/:id', function(req, res, next){
  // this is going to update! the entry! by the targeted id and params... with the req.body! == change with req.body... target with id.
  Entry.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Entry.findOne({_id: req.params.id}).then(function(entry){
      // BECAUSE we get the old ninja back! we are going to fire another then function which finds the entry by its id again, but this time it will be the new entry! and then we'll return it!
      res.send(entry);
    })
  });
});
// delete ninja from the db
// we are going to be looking for id === to delete a specific entry... from our database!
// :id matches params.id
router.delete('/ninjas/:id', function(req, res, next){
  // this says find the entry by id of the request parameters === i.e. the id the user entered.
  Entry.findByIdAndRemove({_id: req.params.id}).then(function(entry){
    res.send(entry);
  })
});

// this is how the other files now to use this!
module.exports = router;
