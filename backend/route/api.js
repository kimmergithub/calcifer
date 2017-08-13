'use strict';

const express = require('express');
// express Router replaces the .app... now we are using router.
const router = express.Router();
const Entry = require('../model/responses-data');

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

  // });
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
