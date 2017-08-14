// YOU CALL CERTAIN THINGS WITH === ('appname:filename')
const expect = require('chai').expect;
const request = require('superagent');
// this is the const list example

// THIS IMPORT VARIABLE IS HOW IT KNOWS WHICH SCHEME IF YOU HAVE MULTIPLE SCHEME IN USE!!!
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
describe('Deleting records', function(){
  var exampleEntry;
  // Add a character to the db before each tests
  // this.timeout(15000);
  beforeEach(function(done){
    exampleEntry = new Entry({
      entry: 'this is a test response',
      weight: 50
    })
    exampleEntry.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Deletes a record from the database', function(done){

    Entry.findOneAndRemove({entry: 'this is a test response'}).then(function(){
      Entry.findOne({entry: 'this is a test response'}).then(function(result){
        // search for record and hope it doesn't exist because we've removed it!
        assert(result === null);
        done();
      });
    });
  });

});
