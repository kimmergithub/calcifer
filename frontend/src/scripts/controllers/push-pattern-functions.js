'use strict';

let newPattern = {};
let startingPatternArray = [];
let startPatternString = '';
let endPatternString = '';
let pushPatternFlag = false;

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
    console.log(newPattern);
  }

  function postNewPattern(){
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
  }

  // function queryThenPost(){
  //   queryDatabaseForPatterns()
  // }
  //
  // function checkQueryForExistingPattern(){
  //
  // }

  pushPatternFlag = true;
  createStartingEndingPatternStrings();
  createStartingPatternObject();
  // postNewPattern();
}
