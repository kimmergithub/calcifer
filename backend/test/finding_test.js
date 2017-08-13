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

// Describe our tests
describe('Finding records', function(){
  var exampleEntry;
  // Add a character to the db before each tests
  // Because there's nothing there do to dropping the table before each test!
  beforeEach(function(done){
    exampleEntry = new Entry({
      entry: 'this is a test response',
      weight: 50
    });
    exampleEntry.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Finds a record from the database', function(done){
    Entry.findOne({entry: 'this is a test response'}).then(function(result){
      assert(result.entry === 'this is a test response');
      done();
    });
  });

  it('Finds a record by unique id', function(done){
          // this _id: is automatically assigned and it knows to look for the id of the new entry created because of the variable declaration before hand i.e: exampleEntry._id
    Entry.findOne({_id: exampleEntry._id}).then(function(result){
      // re return the _id as a STRING! becuase the id's are objects in MONGO, and they aren't technically going to be the same unless we stringify them! === Just when we use assert === mongo unstands to string this when it uses the find methods.
      assert(result._id.toString() === exampleEntry._id.toString());
      done();
    });
  });

});
