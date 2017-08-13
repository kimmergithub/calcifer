'use strict';

function getWords(){
  $.ajax({
    type: 'GET',
    url: 'api/words',
    success: function(wordData){
      itWORKED = wordData;
      console.log('success', wordData);
      console.log('wordData.length = ' + wordData.length);
    }
  })
};
