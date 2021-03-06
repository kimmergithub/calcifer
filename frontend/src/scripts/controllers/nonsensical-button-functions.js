'use strict';

let newReplyText;
let newReplyObject = {};
let theQueriedReply = '';
let replyFetch;
let replyExistsFlag = false;
let queryReplyWordArrayJoin;
let queriedReplyEndingPattern;
let beggingEndingPatternString = '';

function queryBeginningEndingPattern(callback){
    beggingEndingPatternString = startingPatternArray.join().replace(/,/g, '') + wordPatternArray.join().replace(/,/g, '');
    $.ajax({
      type: 'GET',
      url: 'api/PatternRecognitionBeginEnd/' + beggingEndingPatternString, // something needs be changed at the end ... something here about the endPatternString is off.
      success: function(patternStringData){
        theQueriedReply = patternStringData;

        console.log('success', patternStringData);
      }
    }).then(callback);

}

function nonsensicalButtonFunctions(){

  function buildNewReplyObject(){
    console.log('building new reply object');
    if (finalPattern.length > 0) {
      newReplyObject =
      {
        QueryReplyString: newReplyText.replace(/\s/g, ''),
        replyString: newReplyText,
        endingPattern: finalPattern,
        replyCleverness: 0,
        samplesize: 0
      }
    } else {
      newReplyObject =
      {
        QueryReplyString: newReplyText.replace(/\s/g, ''),
        replyString: newReplyText,
        endingPattern: wordPatternArray,
        replyCleverness: 0,
        samplesize: 0
      }
    }
    replyFetch = newReplyText.replace(/\s/g, '');
  }


// QUERY THE DATA BASE FOR replies
  function queryReplies(searchData, postNewReply){

    if (isPatternInDatabase.length > 0){
      buildNewReplyObject()
      $.ajax({
        type: 'GET',
        url: 'api/PatternReply/' + replyFetch,
        success: function(wordData){
          theQueriedReply = wordData;

          console.log('success', wordData);
        }
      }).then(searchData).then(postNewReply);
    }

  }

  // -- QUERY BEGINGING ENDING PATTERN === // callback is going to be pushing the reply again...
// going to save this so I can refactor it later === module app.

  // function queryBeginningEndingPattern(callback){
  //     beggingEndingPatternString = startingPatternArray.join().replace(/,/g, '') + wordPatternArray.join().replace(/,/g, '');
  //     $.ajax({
  //       type: 'GET',
  //       url: 'api/PatternRecognitionBeginEnd/' + beggingEndingPatternString, // something needs be changed at the end ... something here about the endPatternString is off.
  //       success: function(patternStringData){
  //         theQueriedReply = patternStringData;
  //
  //         console.log('success', patternStringData);
  //       }
  //     }).then(callback);
  //
  // }

  // object to put!   I"M HERE
  function rebuildputBeginningEndingObject(){
    beginningENDstring =
        {
          beggingEndingPairsString: beggingEndingPatternString,
          patternOccurence: 1,
          replies: newReplyText
        }
  }

  // -- Function PUT 'Push' reply into another slot...
  function putBeginningEndingPattern(){

    rebuildputBeginningEndingObject();

    $.ajax({
      url: 'api/PatternRecognitionBeginEnd/' + beggingEndingPatternString,
      type: 'PUT',
      data: beginningENDstring,
      success: function(data) {
        console.log('PUT success', data);
      }
    });

  }

// Search the database for a similar reply.
//       Need to query the database first

  function searchForExistingReplyies(){
    console.log('SEARCHING FOR EXISTING REPLIES');
    console.log(theQueriedReply);
    // if theQueriedReply[0].QueryReplyString === something then exists
    // plus pattern

    if ( (isPatternInDatabase.length > 0) && (theQueriedReply.length !== 0) ){

      for (var j = 0; j < isPatternInDatabase[0].endingPattern.length; j++){
        if ( (theQueriedReply[0].QueryReplyString === replyFetch) && (theQueriedReply[0].endingPattern.join() === wordPatternArray.join()) ){
          console.log('REPLY EXISTS');
          replyExistsFlag = true;
        } else{
          console.log('REPLY DOES NOT EXISTS!!! ')
        }
      }

    } else{
      console.log('isPatternInDatabase.length === 0');
    }
  }

  function postNewReply(){
    console.log('post new reply to memory');
    console.log(newReplyObject);
    if (replyExistsFlag !== true){

      $.ajax({
        type: 'POST',
        url: 'api/PatternReply',
        data: newReplyObject,
        success: function(data){
          console.log('POSTING success', data);
        },
        error: function(){
          alert('error posting new name word!')
        }
      });

    } else{
      console.log('Should PUT INC Reply');
      // querying database for reply...
      queryBeginningEndingPattern(putBeginningEndingPattern);
    }
  }

  // Function - checks query for same reply and pushes it.

  $('#reply-send-statement').click(function (event) {
    event.preventDefault();
    console.log('TEACH BUTTON CLICKED');
    newReplyText = $('#reply-text-box-input').val();
    console.log(newReplyText);
    //functions
    buildNewReplyObject();
    queryReplies(searchForExistingReplyies, postNewReply)
    $('#you-said').hide();
    $('#add-a-reply').hide();
    $('#calicers-speach-text').html('Thanks for teaching me, it takes 30 times for me to really learn the pattern!');
    $('#back-calcifer-button').show();

  });
}
