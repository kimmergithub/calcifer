'use strict';

// button that launches all these functions
$('#back-calcifer-button').click(function(){
  console.log(' ');
  console.log('reboot!');
  console.log(' ');

  backToCalcifer();
});


// this function takes you back to the opening
function backToCalcifer (){
  console.log('BACK TO THE HOME!')

// The back to calcifer button handler...

// this function resets all global variables
  function clearAllGlobalVariables() {
    console.log('CLEARING ALL GLOBAL VARIABLES');

    // All GLOBAL VARIABLES that need to be cleared for functionality purposes.
    potentialPronouns = undefined;
    potentialFormOfToBe = undefined;
    potentialCapitalizedWords = undefined;
    potentialAdjective = undefined;
    potentialNouns = undefined;
    potentialPrepositions = undefined;
    potentialAdverbs = undefined;
    wordPatternArray = [];
    statementPatternObject = {};
    firstStatement = '';
    possibleCalciferFirstResponseArray = [];
    calcifersReply = '';
    greetingCounter = 0;
    segmentedFirstStatement = undefined;
    itWORKED = undefined;
    wordCheck = undefined;
    newNameWord = undefined;
    newReplyText = undefined;
    newReplyObject = {};
    newPattern = {};
    startingPatternArray = [];
    startPatternString = '';
    endPatternString = '';
    pushPatternFlag = false;
    beginningENDstring = '';
    unrecognizedTerms = undefined;
    unrecognizedTermsPatternMarket = undefined;
    termCorrectionCounter = 0;
    nameToLearn = '';
    newWordType = '';
    isWordInDatabase = undefined;
    unrecognizedWord = '';
    renderSwitch = false;
    isPatternInDatabase = undefined;
    likelyPattern = undefined;
    patternBaseSort = undefined;
    allTermsCounted = false;
    finalPattern = '';
    putObject = {};
    putPatternArray = undefined;
    putPatternString = undefined;
    putAndIncFlag = false;
    // this variable may cause a problem?
    endingPatternExistsFlag = false;
    theQueriedReply = '';

    // END OF CLEAR ALL VARIABLE FUNCTION
  }

  function hideBackToCalciferButton(){
    $('#back-calcifer-button').hide()
  }

// functions sets veiw to original state
  function renderBeginningPage(){
    console.log('setting page back to original VIEW state');

    $('#calicers-speach-text').html('Hello, my name is Calcifer.');
    $('#califers-text-input-box').show();

  }


  clearAllGlobalVariables();
  hideBackToCalciferButton();
  renderBeginningPage()
}
