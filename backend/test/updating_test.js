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
describe('Updating records', function(){
  let exampleEntry;
  // Add a character to the db before each tests
  // These before's are HOOKS!  before running test... do this!
  beforeEach(function(done){
    exampleEntry = new Entry({
      entry: 'this is a test response',
      weight: 50
    });
    exampleEntry.save().then(function(){
      done();
    });
  });

  // Create tests 2 test
  // test 1
  // the "it" block is the test!  The "before" block is the hook!
  it('Updates the name of a record', function(done){
      Entry.findOneAndUpdate({entry: 'this is a test response'}, {entry: 'Test entry change'}).then(function(){
          Entry.findOne({_id: exampleEntry._id}).then(function(result){
              assert(result.entry === 'Test entry change');
              done();
          });
      });
  });

// test 2
 it('Adds 1 to the weight of every record', function(done){
   //update{} is saying update all === using the inc operator and add 1 to the weight of all records in the collection
    Entry.update({}, { $inc: { weight: 1 } }).then(function(){
        Entry.findOne({entry: 'this is a test response'}).then(function(record){
            assert(record.weight === 51);
            done();
        });
    });
 });


});
