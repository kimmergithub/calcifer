'use strict';

let newPattern = {};
let startingPatternArray = [];
let startPatternString = '';
let endPatternString = '';
let pushPatternFlag = false;
let beginningENDstring = '';

function pushPatternsIntoNewWords() {
  console.log('PUSHING PATTERNS INTO NEW WORDS!!!');
  console.log(statementPatternObject);
  console.log(wordPatternArray);
  console.log('STARTING PATTERN = ' + startingPatternArray);
  console.log('ENDING PATTERN = ' + wordPatternArray)

  function createStartingEndingPatternStrings() {
    startPatternString = startingPatternArray.join();
    endPatternString = wordPatternArray.join();
  }

  function createStartingPatternObject(){
    console.log('CREATING new Name Word!');
    newPattern =
        {
          startingPattern: startingPatternArray,
          startingPatternString: startPatternString,
          endingPattern:
            {
              endingPattern: wordPatternArray,
              endingPatternString: endPatternString,
              patternOccurence: 1
            },
          samplesize: 0
        }

    beginningENDstring =
        {
          beggingEndingPairsString: startingPatternArray + endPatternString,
          patternOccurence: 1,
        }
    console.log(newPattern);
  }

  function postNewPattern(){
      if (allTermsCounted === true ){

        console.log('POSTING PATTERN!!!');
        console.log(newPattern)
        $.ajax({
          type: 'POST',
          url: 'api/PatternRecognition',
          data: newPattern,
          success: function(data){
            console.log('POSTING success', data);
          },
          error: function(){
            alert('error posting new name word!')
          }
        });

        $.ajax({
          type: 'POST',
          url: 'api/PatternRecognitionBeginEnd',
          data: beginningENDstring,
          success: function(data){
            console.log('POSTING beginningENDstring success', data);
          },
          error: function(){
            alert('error posting new name word!')
          }
        });

        pushPatternFlag = true;
      } else{
        console.log('NOT POSTING YET... ')

      }

  }


  createStartingEndingPatternStrings();
  createStartingPatternObject();
  postNewPattern();
}
