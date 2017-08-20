'use strict';

let newReplyText;
let newReplyObject = {};
let theQueriedReply = '';
let replyFetch;
let replyExistsFlag = false;
let queryReplyWordArrayJoin;
let queriedReplyEndingPattern;

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
    }
  }

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
