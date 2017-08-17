'use strict';
// global variables
let potentialPronouns;
let potentialFormOfToBe;
let potentialCapitalizedWords;
let potentialAdjective;
let potentialNouns;
let potentialPrepositions;
let potentialAdverbs;
let wordPatternArray = [];
let statementPatternObject = {};

// function fires all function on this page...
function analyzeFirstStatmentFileFunction(){
  console.log(' ');
  console.log('analyzeFirstStatmentFileFunction PAGE !!!!!!!!FIRE FIRE FIRE FIRE FIRE!!!!!!!!!');
  console.log(' ');

  // Breaks the first statment into an Array of each words
  function segmentFirstStatement(){
    console.log('segmentFirstStatement FIRE!!!')

    segmentedFirstStatement = firstStatement.split(' ');
    if (segmentedFirstStatement.length > 0){
      console.log('segmentedFirstStatement = ' + segmentedFirstStatement);
    } else {
      console.log('ERROR');
    }
  }

  // POPULATES THE WORD PATTERN ARRAY with segmentedFirstStatement
  function wordPatternArrayPopulated(){
    console.log('Populating WordPatterArray with Statement FUNCTION FIRE!!!');
    for (let i = 0; i < segmentedFirstStatement.length; i++) {
      wordPatternArray.push(segmentedFirstStatement[i]);
    }
    console.log('wordPatternArray = ' + wordPatternArray);
  }


  // Searches that Array for pronouns
  function searchFirstStatementForPronouns(){
    console.log('ProNOUN SEARCH FIRE!!!!!!!!!!!!')
    potentialPronouns = [];

    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if (pronounsArray.indexOf(segmentedFirstStatement[i].toLowerCase()) !== -1){
        console.log('there is a potential pronoun')
        potentialPronouns.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT a pronoun!')
      }
    }
    console.log(potentialPronouns);
  }

  // Searches segmentedFirstStatement for verbs of the form of to Be.
  function searchForFormsOfToBe(){
    console.log('FORM-OF-TO-BE SEARCH FIRE!!!!!!!!!!!!')
    potentialFormOfToBe = [];

    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if (formOfToBeArray.indexOf(segmentedFirstStatement[i].toLowerCase()) !== -1){
        console.log('there is a potential FORM-OF-TO-BE VERB!')
        potentialFormOfToBe.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT a FORM-OF-TO-BE!')
      }
    }
    console.log(potentialFormOfToBe);
  }

  // Searches the first statement for words with capital letters...
  function searchForCapitalizedWords(){
    console.log('Capizized WORD SEARCH FIRE!!!!!!!!!!!!')
    potentialCapitalizedWords = [];

    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if ( segmentedFirstStatement[i][0] === segmentedFirstStatement[i][0].toUpperCase() ){
        console.log('there is a potential Capizized WORD!')
        potentialCapitalizedWords.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT a Capizized WORD!')
      }
    }
    console.log(potentialCapitalizedWords);
  }

  // searches the statement for adjectives
  function searchForAdjectives(){
    console.log('Adjective Search FIRE!!!!!!!!!!!!');
    potentialAdjective = [];
    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if ( adjectiveArray.indexOf(segmentedFirstStatement[i].toLowerCase()) !== -1 ){
        console.log('there is a potential ADJECTIVE!')
        potentialAdjective.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT an ADJECTIVE!')
      }
    }
    console.log(potentialAdjective);
  }

  // searches the statement for nouns
  function searchForNouns(){
    console.log('NOUNS Search FIRE!!!!!!!!!!!!');
    potentialNouns = [];
    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if ( nounArray.indexOf(segmentedFirstStatement[i].toLowerCase()) !== -1 ){
        console.log('there is a potential NOUN!')
        potentialNouns.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT a NOUN!')
      }
    }
    console.log(potentialNouns);
  }

  function searchForPrepositions(){
    console.log('PREPOSITIONS Search FIRE!!!!!!!!!!!!');
    potentialPrepositions = [];
    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if ( prepositionalPhraseArray.indexOf(segmentedFirstStatement[i].toLowerCase()) !== -1 ){
        console.log('there is a potential NOUN!')
        potentialPrepositions.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT a PREPOSITION!')
      }
    }
    console.log(potentialPrepositions);
  }

  function searchForAdverbs(){
    console.log('PREPOSITIONS Search FIRE!!!!!!!!!!!!');
    potentialAdverbs = [];
    for (let i = 0; i < segmentedFirstStatement.length; i++){
      if ( adverbsArray.indexOf(segmentedFirstStatement[i].toLowerCase()) !== -1 ){
        console.log('there is a potential ADVERB!')
        potentialAdverbs.push(segmentedFirstStatement[i]);
      } else {
        console.log(segmentedFirstStatement[i] + ' is NOT an ADVERB!')
      }
    }
    console.log(potentialAdverbs);
  }

  // Analyzes the statment for recognized words.
  function determineStatementPattern(){
    console.log('determineStatementPattern FUNCTION FIRE!!!');

    for (let i = 0; i < wordPatternArray.length; i++) {
      if ( potentialPronouns.indexOf(wordPatternArray[i]) !== -1 ) {
        wordPatternArray[i] = 'Pronoun';

      // let potentialAdjective;
      } else if( potentialFormOfToBe.indexOf(wordPatternArray[i]) !== -1 ) {
          wordPatternArray[i] = 'To-Be-Verb';
      } else if( potentialCapitalizedWords.indexOf(wordPatternArray[i]) !== -1 ) {
          wordPatternArray[i] = 'Name';
      } else if( potentialNouns.indexOf(wordPatternArray[i]) !== -1 ) {
          wordPatternArray[i] = 'Noun';
      } else if( potentialPrepositions.indexOf(wordPatternArray[i]) !== -1 ) {
          wordPatternArray[i] = 'Preposition';
      } else if( potentialAdjective.indexOf(wordPatternArray[i]) !== -1 ) {
          wordPatternArray[i] = 'Adjective';
      } else if( potentialAdverbs.indexOf(wordPatternArray[i]) !== -1 ) {
          wordPatternArray[i] = 'Adverb';
      } else {
          wordPatternArray[i] = 'Unrecognized';
      }
    }
  console.log(wordPatternArray);
  }

// Creates a Pattern-Statment Object === not sure why it is un-ordered
// May be un-usable because its out of order... I'll think about it
  function createStatementPatternObject(keys, values){
    if (keys == null) return {};
    for (var i = 0, l = keys.length; i < l; i++) {
    if (values) {
      statementPatternObject[keys[i]] = values[i];
    } else {
      statementPatternObject[keys[i][0]] = keys[i][1];
    }
  }
  console.log(segmentedFirstStatement);
  console.log('wordPatternArray = ' + wordPatternArray);
  console.log(statementPatternObject);
  }

  // FUNCTION CALLS FOR ALL FUNCTION IS SEQUENTIAL ORDER ON THIS PAGE
  segmentFirstStatement();
  wordPatternArrayPopulated()
  searchFirstStatementForPronouns();
  searchForFormsOfToBe();
  searchForAdjectives();
  searchForNouns();
  searchForPrepositions();
  searchForAdverbs();
  searchForCapitalizedWords();
  determineStatementPattern();
  createStatementPatternObject(segmentedFirstStatement, wordPatternArray);
}
