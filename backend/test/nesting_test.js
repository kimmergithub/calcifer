// YOU CALL CERTAIN THINGS WITH === ('appname:filename')
const expect = require('chai').expect;
const request = require('superagent');
// this is the const list example
const Author = require('../model/authors-schema');
const EntryRequire = require('../route/entry-router');
// this is a note thing... I don't understand yet.
// const Note = require('../public/scripts/models/note')

// THIS BLOCK OF DATA MAY NOT BE REQUIRED FOR OUR SERVER BUILD OUT!
const mocha = require('mocha');
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Describe our tests
describe('Nesting records', function(){

    beforeEach(function(done){
        // Drop the collection
        mongoose.connection.collections.authors.drop(function(){
            done();
        });
    });

    // Create tests
    it('Creates an author with sub-documents', function(done){

        var pat = new Author({
            name: 'Patrick Rothfuss',
            books: [{title: 'Name of the Wind', pages: 400}]
        });

        pat.save().then(function(){
            Author.findOne({name: 'Patrick Rothfuss'}).then(function(record){
                assert(record.books.length === 1);
                done();
            });
        });

    });

    it('Adds a book to an author', function(done){

        var pat = new Author({
            name: 'Patrick Rothfuss',
            books: [{title: 'Name of the Wind', pages: 400}]
        });

        pat.save().then(function(){
            Author.findOne({name: 'Patrick Rothfuss'}).then(function(record){
                // add a book to the books collection
                record.books.push({title: "Wise Man's Fear", pages: 500});
                record.save().then(function(){
                    Author.findOne({name: 'Patrick Rothfuss'}).then(function(record){
                        assert(record.books.length === 2);
                        done();
                    });
                });
            });
        });

    });

});
