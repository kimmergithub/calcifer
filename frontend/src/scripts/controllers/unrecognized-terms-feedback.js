'use strict';

// required Schema's
// const Word = require('../../backend/model/word-schema.js');

// GLOBAL variables
let unrecognizedTerms;
let unrecognizedTermsPatternMarket;
let termCorrectionCounter = 0;
let nameToLearn = '';
let newWordType = '';
let isWordInDatabase;
let unrecognizedWord = '';
let renderSwitch = false;
let isPatternInDatabase;
let likelyPattern;
let patternBaseSort;
let allTermsCounted = false;
let finalPattern = '';
let putObject = {};
let putPatternArray;
let putPatternString;

function unrecognizedTermsFeedback(){

  // This renders the statement made to calcifer
  function reRenderStatement(){
    $('#calicers-speach-text').html('You said: "' + firstStatement + '"');
  }

  //for pattern recognition later...
  function createStartingPattern(){
    // this array creation may be completely unnecessary...
    for (let i = 0; i < wordPatternArray.length; i++){
      startingPatternArray.push(wordPatternArray[i]);
    }
    startPatternString = startingPatternArray.join();
  }

  // This renders the undrecognized term
  function buildUnrecognizedTermsArray(){
    unrecognizedTerms = [];
    unrecognizedTermsPatternMarket = [];
    for (let i = 0; i < wordPatternArray.length; i++) {
      if (wordPatternArray[i] === 'Unrecognized') {
        unrecognizedTerms.push(segmentedFirstStatement[i]);
      }
    }
    createStartingPattern();
  }

  function searchDatabaseForUnrecognizedWords(callback, callbackTwo){
    unrecognizedWord = unrecognizedTerms[termCorrectionCounter];
    console.log('QUERY FOR WORD!!!')
    $.ajax({
      type: 'GET',
      url: 'api/words/' + unrecognizedWord,
      success: function(wordData){
        itWORKED = wordData;
        wordCheck = wordData;
        console.log('success', wordData);
        console.log('WORD IS IN DATABASE = ' + wordData);
        isWordInDatabase = wordData;
        console.log('WORD QUERY FINISHED !!!')
      }
    }).then(callback).then(callbackTwo)
  }

  function resetPatternFunction(){
    if (isWordInDatabase.length > 0) {
      wordPatternArray[segmentedFirstStatement.indexOf(unrecognizedWord)] = isWordInDatabase[0].type;
      console.log(wordPatternArray);
      //NOTE POTENTIAL PROBLEM!!! === will need to reset this counter somewhere.
      termCorrectionCounter++;
      console.log('termCorrectionCounter = ' + termCorrectionCounter)
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    } else {
      console.log(unrecognizedWord + ' is not in the database!');
      queryDatabaseForPatternsExisting();
      // Do not lose thise renderLearningTools lol
      // renderLearningTools();
    }
  }


  function queryDatabaseForPatternsExisting(){
    console.log('queryDatabaseForPatternsExisting');
    console.log('QUERY PATTERN FIRE FIRE FIRE FIRE FIRE FIRE FIRE!!!!!!!!!');

    function queryDatabaseForPatterns(callback){
      console.log(startPatternString);
      $.ajax({
        type: 'GET',
        url: 'api/PatternRecognition/' + startPatternString,
        success: function(pattern){
          itWORKED = pattern;
          wordCheck = pattern;
          console.log('success', pattern);
          isPatternInDatabase = pattern;
        }
      }).then(callback);

    }
    queryDatabaseForPatterns(renderLearningTools);
  }

  function buildPutObject(){
    putPatternArray = wordPatternArray;
    putPatternString = wordPatternArray.join();
    putObject =
    {
      startingPatternString: startPatternString,
      endingPattern: [
          {
              endingPatternString: putPatternString,
              patternOccurence: 1,
              endingPattern: putPatternArray
          }
      ],
      startingPattern: [
          startingPatternArray
      ]
    }
  }
az  
  function putUniqueEndingPatternAndIncriment(){
    buildPutObject()
    $.ajax({
      url: '/PatternRecognition/:startingPatternString',
      type: 'PUT',
      data: putObject,
      success: function(data) {
        console.log('success', wordData);
        console.log('WORD IS IN DATABASE = ' + wordData);
        console.log('WORD QUERY FINISHED !!!');
      }
    });
  }

  function renderUnrecognizedTermArrayAndButtons(){
    if (wordPatternArray.indexOf('Unrecognized') === -1) {
      hideLearningTools();
      console.log('ALL TERMS ACCOUNTED FOR!!!');
      allTermsCounted = true;
      if ( (pushPatternFlag !== true)  && (isPatternInDatabase.length > 0) && (isPatternInDatabase[0].endingPattern[0].endingPattern !== wordPatternArray) ){
        console.log('Placeholding')
        // need to put new pattern and incriment
        putUniqueEndingPatternAndIncriment();
      } else if (isPatternInDatabase.length === 0){
        pushPatternsIntoNewWords();
      }
    } else {
      if (renderSwitch === false){
        searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
      } else {
        console.log('in esle return');
        return;
      }
    }
  }


  function renderLearningTools(){
    // we are here and this is good!
    if ( (isPatternInDatabase.length > 0) && (isPatternInDatabase[0].samplesize > 29) && (renderSwitch !== true) ) {
      console.log('PATTERN EXIST WITH SUFFICIENT SAMPLE SIZE');
      searchLargestPatternOccurence();
      // Query DB for that sequence replies
      // if reply === render reply
      // if no reply === generate new reply...
      renderSwitch = true;

      //Temporary reply Render === flag because trouble
      if (allTermsCounted === true){
        findPossibleCalciferReplies();
        calciferChoosesReply();
      }

    } else if ( (isPatternInDatabase.length > 0) && (isPatternInDatabase[0].samplesize < 29) && (allTermsCounted === true) ) {
        findPossibleCalciferReplies();
        calciferChoosesReply();
      } else{
      reRenderStatement();
      $('#unrecognized-term-text').html(unrecognizedTerms[termCorrectionCounter]);
      $('#unrecognized-term-text').show();
      $('.unrecognized-term-button').show();
      console.log('RENDER RENDER RENDER!!!')
      renderSwitch = true;
    }
  }

  function searchLargestPatternOccurence(){
    console.log('SORTING FOR LIKELY PATTERN!!!')
    likelyPattern = isPatternInDatabase[0].endingPattern[0].endingPattern;
    patternBaseSort = isPatternInDatabase[0].endingPattern[0]
    // for (var i = 0; i < isPatternInDatabase.length; i++){
      for (var j = 0; j < isPatternInDatabase[0].endingPattern.length; j++){
        if ( (likelyPattern !== isPatternInDatabase[0].endingPattern[j].endingPattern) && ( patternBaseSort.patternOccurence < isPatternInDatabase[0].endingPattern[j].patternOccurence ) ){
          likelyPattern = isPatternInDatabase[0].endingPattern[j].endingPattern;
          patternBaseSort = isPatternInDatabase[0].endingPattern[j]
        }
      finalPattern = likelyPattern;
    }
    console.log('likely pattern frequency = ' + patternBaseSort.patternOccurence);
    console.log('likely pattern = ' + likelyPattern);
    console.log('ASSIGNING LIKELY PATTERN');
    // wordPatternArray = likelyPattern;
  }

  // function renderLearningTools(){
  //   reRenderStatement();
  //   $('#unrecognized-term-text').html(unrecognizedTerms[termCorrectionCounter]);
  //   $('#unrecognized-term-text').show();
  //   $('.unrecognized-term-button').show();
  //   console.log('RENDER RENDER RENDER!!!')
  //   renderSwitch = true;
  // }

  function hideLearningTools(){
    $('#unrecognized-term-text').hide();
    $('.unrecognized-term-button').hide();
  }

  function learnName(){
    $('#add-name-to-db').click(function(event){
      event.preventDefault();
      console.log('name button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-name-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  function learnNoun(){
    $('#add-noun-to-db').click(function(event){
      event.preventDefault();
      console.log('Noun button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-noun-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  function learnPronoun(){
    $('#add-pronoun-to-db').click(function(event){
      event.preventDefault();
      console.log('Pronoun button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-pronoun-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  function learnVerb(){
    $('#add-verb-to-db').click(function(event){
      event.preventDefault();
      console.log('Verb button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-verb-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  function learnAdverb(){
    $('#add-adverb-to-db').click(function(event){
      event.preventDefault();
      console.log('Adverb button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-adverb-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  function learnAdjective(){
    $('#add-adjective-to-db').click(function(event){
      event.preventDefault();
      console.log('Adjective button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-adjective-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  function learnPreposition(){
    $('#add-preposition-to-db').click(function(event){
      event.preventDefault();
      console.log('Preposition button clicked');
      nameToLearn = $('#unrecognized-term-text').html();
      console.log('nameToLearn = ' + nameToLearn);
      newWordType = $('#add-preposition-to-db').html();
      // from name-learning.js
      unrecognizedNameLearning();
      hideLearningTools()
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    });
  };

  buildUnrecognizedTermsArray();
  searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
  // renderUnrecognizedTermArrayAndButtons();
  learnName();
  learnNoun();
  learnPronoun();
  learnVerb();
  learnAdverb();
  learnAdjective();
  learnPreposition();

}
