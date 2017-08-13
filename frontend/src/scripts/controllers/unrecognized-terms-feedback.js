'use strict';

// required Schema's
const Word = require('../../backend/model/word-schema.js');


// GLOBAL variables
let unrecognizedTerms;
let termCorrectionCounter = 0;



function unrecognizedTermsFeedback(){

  // This renders the statement made to calcifer
  function reRenderStatement(){
    $('#calicers-speach-text').html('You said: "' + firstStatement + '"');
  }

  // This renders the undrecognized term
  function buildUnrecognizedTermsArray(){
    unrecognizedTerms = [];
    for (let i = 0; i < wordPatternArray.length; i++) {
      if (wordPatternArray[i] === 'Unrecognized') {
        unrecognizedTerms.push(segmentedFirstStatement[i]);
      }
    }
  }

  function renderUnrecognizedTermArrayAndButtons(){
    $('#unrecognized-term-text').html(unrecognizedTerms[termCorrectionCounter]);
    $('#unrecognized-term-text').show();
    $('.unrecognized-term-button').show();
  }

  function learnName(){
    $('#add-name-to-db').click(function(event){
      event.preventDefault();
      console.log('name button clicked');
      let nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);

      // const newName = new Word({
      //   name: [{
      //     name: nameToLearn,
      //     patternOrigination: 'placeHolder',
      //     probabilityOfPatternRecognition: 'placeHolder'
      //    }]
      // })

      getWords();
    });
  }

  reRenderStatement();
  buildUnrecognizedTermsArray();
  renderUnrecognizedTermArrayAndButtons();
  learnName();

}
