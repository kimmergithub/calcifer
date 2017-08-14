'use strict';

// REMINDER TO FIX THE API CONNECTION IN LOCALHOST SET UP
// let testPrompt = prompt('I\'m scripted!')

let itWORKED;

$('#load-calcifers-brain').click(function (event) {
  event.preventDefault();
  console.log('FETCHING CALCIFER BRAIN!');
  console.log('TEST TEST TEST TEST');

  $.ajax({
    type: 'GET',
    url: 'api/ninjas',
    success: function(data){
      itWORKED = data;
      console.log('success', data);
    }
  })
});
