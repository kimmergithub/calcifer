'use strict';

// YOU CALL CERTAIN THINGS WITH === ('appname:filename')
const expect = require('chai').expect;
const request = require('superagent');
// this is the const list example
const Entry = require('../model/responses-data');
const EntryRequire = require('../route/entry-router');
// this is a note thing... I don't understand yet.
// const Note = require('../public/scripts/models/note')

// THIS BLOCK OF DATA MAY NOT BE REQUIRED FOR OUR SERVER BUILD OUT!
const mocha = require('mocha');
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;

// this runs the server === npm start === make sure you are not running two servers.
// error PORT :::3000
require('../lib/server');

const url = `http://localhost:${PORT}`;

let tempEntry;
let exampleEntry;

// const exampleEntry = {
//   entry: 'this is a test response'
// }


//      THIS IS THE MARIO TEST

// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(done){

    const exampleEntry = new Entry({
      entry: 'this is a test response',
      weight: 50
    });

    exampleEntry.save().then(function(){
      assert(!exampleEntry.isNew);
      done();
    });

  });

});



//            THIS WAS WHAT I HAD BEFORE


// describe('Response Route', function(){
//   describe('POST: /api/responses-data/responses-dataID', function(){
//     describe('with a valid responses-data id and response', () => {
//       before( done => {
//           //console search
//         new Entry(exampleEntry).save()
//           //console search
//
//         .then( entry => {
//           this.tempEntry = entry;
//           done();
//         })
//         .catch(done);
//       });
//
//       after( done => {
//         Promise.all([
//           Entry.remove({})
//         ])
//         .then( () => done())
//         .catch(done);
//       });
//
//       it('should return an Entry', done => {
//         request.post(`${url}//api/responses/${this.tempEntry._id}`)
//         .send(exampleEntry)
//         .end((err, res) => {
//           console.log('This is our RES.BODY hawa console = ' + res);
//           if (err) return done(err);
//           // THIS IS OUR TEST...
//           expect(res.body.entry).to.equal(exampleEntry.Entry);
//           expect(res.body.entryID).to.equal(this.tempEntry._id.toString());
//           done();
//         });
//       });
//     });
//   });
// });
//
// // Describe test
// describe('Saving records', function(){
//
//   // create tests
//   // it describes one single test
//   it('Saving to the database', function(done){
//     // what we expect is:
//     // this test should be an easy pass
//     let responseTest = new Entry({
//       entry: 'Hello my name is Kimmer'
//     });
//     // this is where you can increase the time of test allowable -- but ites rare that this is the problem... my problem is its just no saving to the database.
//     // this.timeout(15000);
//     // automatically saving to the database === how we test!
//     responseTest.save().then(function(){
//       // // returns true if its saved... false if its in the database! we want false!!!
//       assert(!responseTest.isNew);
//       // how mocha nows the test is done
//       done();
//     });
//
//   });
//
// });
