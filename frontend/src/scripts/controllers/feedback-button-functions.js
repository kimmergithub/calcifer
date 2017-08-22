'use strict';

let innappropriateIndicationObject = {};

$('#clever').click(function (event) {
  event.preventDefault();
  console.log('clever button click');

  beginningENDstring =
      {
        beggingEndingPairsString: beggingEndingPatternString,
        patternOccurence: 1,
        replies: calcifersReply
      }

  $.ajax({
    url: 'api/PatternRecognitionBeginEnd/' + beggingEndingPatternString,
    type: 'PUT',
    data: beginningENDstring,
    success: function(data) {
      console.log('PUT success', data);
    }
  }).then(function(){
    location.reload()
  });

});

$('#logical').click(function (event) {
  event.preventDefault();
  console.log('logical button click');
  location.reload();
});

$('#nonsensical').click(function (event) {
  event.preventDefault();
  console.log('nonsensisical button click');
  $('#response-accuracy-feedback-div').hide();
  $('#you-said').html('You said: "' + firstStatement + '"');
  $('#you-said').show();
  $('#calicers-speach-text').html('Calcifer said: "' + calcifersReply + '"');
  $('#add-a-reply').show();
  nonsensicalButtonFunctions();
  // hide everything
  // bring up an input field
  // add new reply option
  // post pattern & reply || put reply in pattern.
  //

});

$('#innappropriate').click(function (event) {
  event.preventDefault();
  console.log('innappropriate button click');
  alert('We\'ll Review Calcifer\'s Response!');

  newReplyText = newReplyText + 'innappropriate';

  innappropriateIndicationObject =
    {
      beggingEndingPairsString: beggingEndingPatternString,
      replies: calcifersReply
    }

  $.ajax({
    type: 'POST',
    url: 'api/innappropriate',
    data: innappropriateIndicationObject,
    success: function(data){
      console.log('POSTING success', data);
    },
    error: function(){
      alert('error posting new name word!')
    }
  }).then(function(){
    location.reload()
  });

});
