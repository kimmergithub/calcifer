'use strict';

// required Schema's
// const Word = require('../../backend/model/word-schema.js');


// GLOBAL variables
let unrecognizedTerms;
let termCorrectionCounter = 0;
let nameToLearn = '';
let newWordType = '';
let isWordInDatabase;
let unrecognizedWord = '';
let renderSwitch = false;



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

  function searchDatabaseForUnrecognizedWords(callback, callbackTwo){
    unrecognizedWord = unrecognizedTerms[termCorrectionCounter];
    $.ajax({
      type: 'GET',
      url: 'api/words/' + unrecognizedWord,
      success: function(wordData){
        itWORKED = wordData;
        wordCheck = wordData;
        console.log('success', wordData);
        console.log('WORD IS IN DATABASE = ' + wordData);
        isWordInDatabase = wordData;
      }
    }).then(callback).then(callbackTwo)
  }

  function resetPatternFunction(){
    if (isWordInDatabase.length > 0) {
      wordPatternArray[segmentedFirstStatement.indexOf(unrecognizedWord)] = isWordInDatabase[0].type;
      console.log(wordPatternArray);
      //NOTE POTENTIAL PROBLEM!!! === will need to reset this counter somewhere.
      termCorrectionCounter++;
      searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
    } else {
      console.log(unrecognizedWord + ' is not in the database!');
      renderLearningTools();
    }
  }

  function renderUnrecognizedTermArrayAndButtons(){
    if (wordPatternArray.indexOf('Unrecognized') === -1) {
      hideLearningTools();
      alert('ALL TERMS ACCOUNTED FOR!!!')
    } else {
      if (renderSwitch === false){
        searchDatabaseForUnrecognizedWords(resetPatternFunction, renderUnrecognizedTermArrayAndButtons);
      } else {
        return;
      }
    }
  }

  function renderLearningTools(){
    reRenderStatement();
    $('#unrecognized-term-text').html(unrecognizedTerms[termCorrectionCounter]);
    $('#unrecognized-term-text').show();
    $('.unrecognized-term-button').show();
    console.log('RENDER RENDER RENDER!!!')
    renderSwitch = true;
  }

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
