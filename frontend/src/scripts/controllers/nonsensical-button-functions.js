'use strict';

let newReplyText;
let newReplyObject = {};

function nonsensicalButtonFunctions(){

  function buildNewReplyObject(){
    console.log('building new reply object');
    if (finalPattern.length > 0) {
      newReplyObject =
      {
        endingPattern: finalPattern,
        replies:
          {
            reply: newReplyText,
            replyCleverness: 0
          },
        samplesize: 0
      }
    } else {
      newReplyObject =
      {
        endingPattern: wordPatternArray,
        replies:
          {
            reply: newReplyText,
            replyCleverness: 0
          },
        samplesize: 0
      }
    }
  }

  function postNewReply(){
    console.log('post new reply to memory');
    console.log(newReplyObject);
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
  }

  $('#reply-send-statement').click(function (event) {
    event.preventDefault();
    console.log('TEACH BUTTON CLICKED');
    newReplyText = $('#reply-text-box-input').val();
    console.log(newReplyText);
    //functions
    buildNewReplyObject();
    postNewReply();
    $('#you-said').hide();
    $('#add-a-reply').hide();
    $('#calicers-speach-text').html('Thanks for teaching me, it takes 30 times for me to really learn the pattern!');
    $('#back-calcifer-button').show();

  });
}

$('#back-calcifer-button').click(function(){
  console.log('reboot!');
});
