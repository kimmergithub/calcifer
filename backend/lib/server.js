'use strict';
const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('calcifer:server');
const cors = require('cors');
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongo = require('mongodb');
const assert = require('assert');
// It will listen for the vairiable and look for an environment in like heroku or... grab 3000
const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb://localhost/calcifer';

// ES6 Global Promise Library instead of Mongoose Promise
mongoose.Promise = global.Promise;
// // This is MONGODB_URI is so heroku can do its thing to create a db... it will recognize it! When we heroku deploy
mongoose.connect(MONGODB_URI);


// * creates the app... allows us to use express!
// WE ARE CREATING AN EXPRESS APPLICATION OF COURSE
const app = express();

// this is for if the user request something that is a static file...
// it'll look in the public folder for this... we will have to change this to a folder we actually have in the front end.
// This is how you pull your static files from '/' static file calls
app.use(express.static('../../calcifer/frontend'));
app.use(express.static('../../calcifer/frontend/src'));

// This order before the app.use() middleware below is IMPORTANT!!!
// we want to accept json data to we .json the bodyParser...
// MAKE SURE YOU CALL THAT MOTHER FUCKING JSON!!!
app.use(bodyParser.json());

// this makes it so we can use our routes === and gives them the /api before each /ninja or designated path. This is middleware!
app.use('/api', require('../route/api'));

// ERROR handling middleware goes here!!!
app.use(function(err, req, res, next){
  console.log(err);
  // sending an error message back to the user
  // will attach a 422 status code to the error message and send it to the front end/ user.
  res.status(422).send({error: err.message})
})

// app.use(morgan('dev')); // logging util
// app.use(cors());  // enable crosite origin resoruce scripting


app.listen(PORT, () => {
  console.log('app.listen now listening for request! ' + PORT);
  debug(`listening on ${PORT}`); // this is our custome message that we created to tell us what's happening...
});

// original GET? === get index.html
app.get('/', function(req, res, next){
    res.sendFile('index.html', {root: '../frontend/src'});
  })


// // go to your localhost after starting the server! you should see a console.log in your terminal! The res.end should make it so the browser stops spinning.  The browser call is an auto GET request!


// es6 promise
// mongoose.Promise = global.Promise;

// this points to the mongo data base === the mongo database is tells you the default is at 27017 on our local machine when we start the server in our terminal.
// what follows the 27017 is the name of the db.
// THIS MAY BE NOT THE BEST CORSE OF ACTION BUT IS HERE AS A BACKUP
// mongoose.connect('mongodb://localhost:27017/calcifer');

// ///// CONNECT TO SERVER WITHOUT TEST REQUIREMENTS:
// mongoose.connect(MONGODB_URI);
// mongoose.connection.once('open', function(){
//   console.log('The Connection HAS BEEN MADE!!! Now make fireworks!');
//   done();
// }).on('error', function(error){
//   console.log('connection error: ' + error);
// })
//
// CONNECT THE SERVER BEFORE ANYTESTS!
// before tells mocha to wait until this connection has been made before running any test, becuase its in server.js it'll see this before first!
// ======================================================
// !!!!!! COMMENT THIS BACK IN BEFORE RUNNING TEST!!!!!!!


// before(function(done){
//   // This is MONGODB_URI is so heroku can do its thing to create a db... it will recognize it! When we heroku deploy
//   mongoose.connect(MONGODB_URI);
//   // this will tell us in the TERMINAL console.log'ing that our server is connected!
//   mongoose.connection.once('open', function(){
//     console.log('The Connection HAS BEEN MADE!!! Now make fireworks!');
//     done();
//   }).on('error', function(error){
//     console.log('connection error: ' + error);
//   })
// })
// // DROP THE TEST COLLECTIONS BEFORE EVERY TEST!!!
// beforeEach(function(done){
//   // Drop the collection:
//   mongoose.connection.collections.entries.drop(function(){
//     done();
//   });
//
// })



// TESTING SERVER connection
// mongo.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
//
//   db.close();
// });


// router.get('/', function(req, res, next) {
//         res.render('index');
// });
//
// router.get('/get-data', function(req, res, next) {
//     console.log('getting data!')
//     var resultArray = [];
//     mongo.connect(url, function(err, db){
//       assert.equal(null, err);
//       var cursor = db.collection('test insert').find();
//       cursor.forEach(funciton(doc, err){
//         assert.equal(null, err);
//         resultArray.push(doc);
//       }, function (){
//         db.close();
//         res.render('index')
//       });
//   });
// });

// router.post('/insert', function(req, res, next) {
//   console.log('posting data!')
//   let newResponse = {
//     entry : req.body.entry
//   }
//   // THIS IS WHAT ACTUALLY INSERTS THE DATA INTO THE DATABASE!
//   mongo.connect(url, function(err, db){
//     assert.equal(null, err);
//     db.collection('test insert').insertOne(newResponse, function(err, res) {
//       assert.equal(null, err);
//       console.log('inserted NewResponse!!!!!!!')
//       db.close();
//     })
//   })
//
//   res.redirect('/')
// });

// router.post('/update', function(req, res, next) {
//
// });
//
// router.post('/delete', function(req, res, next) {
//
// });


// app.use(express.static('./public'))
//
// app.get('/discover', (req, res) => {
//   let q = req.query
//   request
//   .get('https://api.themoviedb.org/3/discover/movie')
//   .query({
//     'language': 'en-US',
//     'region': 'US',
//     'sort_by': 'popularity.desc',
//     'include_adult': 'false',
//     'include_video': 'false',
//
//     'page':`${q.page}`,
//
//     'vote_average.gte': `${q.vote_average}`,
//     'with_genres': `${q.with_genres}`,
//     'with_runtime.gte': `${q.with_runtime}`,
//     'api_key': `${process.env.theMoviedb_Token}`
//   })
//   .end((err, response) => {
//     if(err) console.log(err)
//     res.json(response.body)
//   })
// })
//
// app.listen(PORT, function() {
//   console.log(`Listening on port: "${PORT}"`);
// });
