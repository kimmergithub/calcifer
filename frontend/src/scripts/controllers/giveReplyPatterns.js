'use strict';

// This function will look through the pattern and decided if the pattern occurence is high enough to search for a recorded reply.
function chooseRepliesByPatternOccurenceAndReplyLikelyHood(){
  console.log('')
  console.log('')
  console.log('chooseRepliesByPatternOccurenceAndReplyLikelyHood')
  console.log('')
  console.log(theQueriedReply)
  choosePatternedReply();
  $('#calicers-speach-text').html(calcifersReply + '.');
  $('#response-accuracy-feedback-div').show();


}

function choosePatternedReply(){
  let randomReplyInteger = Math.floor(Math.random() * (theQueriedReply[0].replies.length + 1));
  calcifersReply = theQueriedReply[0].replies[randomReplyInteger]
}
