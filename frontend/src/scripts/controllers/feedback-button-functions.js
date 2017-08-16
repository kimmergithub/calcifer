'use strict';

$('#clever').click(function (event) {
  event.preventDefault();
  console.log('clever button click');
});

$('#logical').click(function (event) {
  event.preventDefault();
  console.log('logical button click');
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
});
