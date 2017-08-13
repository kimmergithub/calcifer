'use strict';

let firstStatement = '';
let possibleCalciferFirstResponseArray = [];
let calcifersReply = '';
let greetingCounter = 0;
let segmentedFirstStatement;

// (function(module) {
$('#response-accuracy-feedback-div').hide();
$('.unrecognized-term-button').hide();
$('#unrecognized-term-text').hide();

$('#send-statement').click(function (event) {
  event.preventDefault();
  firstStatement = $('#text-box-input').val();
  $('#califers-text-input-box').hide();
  // $('#calcifer-titled').hide();
  analyzeFirstStatmentFileFunction();

  if ( wordPatternArray.indexOf('Unrecognized') !== -1 ){
    alert('You have an UNRECOGNIZED TERMS: Please teach Calcifer what they mean!');
    //PAGE function === found on unrecognized-terms-feedback.js page
    unrecognizedTermsFeedback()
  } else{

    findPersonName();
    findPossibleCalciferReplies();
    calciferChoosesReply();
  }

  //Console logs FOR BUTTON;
  console.log('send-statement! has been clicked!');
  console.log('firstStatement = ' + firstStatement);
})

// PAGE CONSOLE LOGS AUTO FIRE
console.log('Game.js Page FIRED!')

function findPossibleCalciferReplies() {
  console.log('findPossibleCalciferReplies FUNCTION FIRED!!!')
  let possibleReplyCounter = 0;

  if ( currentPersonName === undefined ) {
    console.log('currentPersonName = ' + currentPersonName);
    possibleCalciferFirstResponseArray = [];

    for (let i = 0; i < harryPotterSplit.length; i++){
      if ( (harryPotterSplit[i].length > (firstStatement.length - 10)) && (harryPotterSplit[i].length < (firstStatement.length + 10)) ) {
        possibleReplyCounter++
        possibleCalciferFirstResponseArray.push(harryPotterSplit[i]);
      }
    }
  } else if (greetingCounter < 1) {
    // there is a name === so this calls local storage to look for the name... or create a log with it.
    // lookForLocalStorage();
    console.log('currentPersonName = ' + currentPersonName);
    possibleCalciferFirstResponseArray.push('Hello ' + currentPersonName + '.');
    greetingCounter = 1;
  } else {
    possibleCalciferFirstResponseArray.push('I know it is... we\'ve been over this... it would appear that my memory is better than yours.');
  }
  console.log(possibleReplyCounter + ' possible replies.');
  console.log('all possible replies = ' + possibleCalciferFirstResponseArray)
}

function calciferChoosesReply() {
  if (possibleCalciferFirstResponseArray.length > 1) {
    let randomReplyInteger = Math.floor(Math.random() * (possibleCalciferFirstResponseArray.length + 1) );
    calcifersReply = possibleCalciferFirstResponseArray[randomReplyInteger];
    $('#calicers-speach-text').html(calcifersReply + '.');
    $('#response-accuracy-feedback-div').show();

    // FUNCTION CONSOLE logs
    console.log('calciferChoosesReply FUNCITON FIRE!!!');
    console.log('randomReplyInteger = ' + randomReplyInteger);
    console.log('calcifersReply is = ' + calcifersReply);
  } else {
    calcifersReply = possibleCalciferFirstResponseArray[0];
    // temporary edit
    // $('#califers-response').html('Calcifer: \"' + calcifersReply + '.');
    $('#calicers-speach-text').html(calcifersReply + '.');
    //
    $('#response-accuracy-feedback-div').show();
  }
}

function findPersonName(callback, callback2) {
  // moving this to the analyzeFirstStatment Function in analyze-first-interaction.js
  // segmentedFirstStatement = firstStatement.split(' ');
  console.log('Looking for a name')
  for (var i = 0; i < segmentedFirstStatement.length; i++) {
    if ( (segmentedFirstStatement[i] === 'my') && (segmentedFirstStatement[(i + 1)] === 'name') && (segmentedFirstStatement[(i + 2)] === 'is') ) {

      // quick console.log to determine what is happening...
      console.log( segmentedFirstStatement[i] + ' ' + segmentedFirstStatement[(i + 1)] + ' ' + segmentedFirstStatement[(i + 2)] )

      currentPersonName = segmentedFirstStatement[(i + 3)];
    } else {
      console.log(segmentedFirstStatement);
      console.log('NO NAME FOUND!')
    }
  }
  console.log('currentPersonName = ' + currentPersonName)
}

// THIS IS CALCIFERS SHORT TERM MEMRORY === THIS WILL BE MODULIZED LATER
// SET INTO DEFFERENT FILES!!!
'use strict';

//THIS IS CALCIFER'S SHORT TERM MEMORY ===
// I may find a use for this... storing data that calcifer doesn't need long term is a possibility.
Person.all = [];

let currentPersonName;
let currentPersonGender;
let currentPersonAge;

function Person(name, gender, age){
  this.name = name;
  this.gender = gender;
  this.age = age;
  Person.all.push(this);
}

function lookForLocalStorage () {
  if (localStorage.length === 0) {
// Create local storage items
// IN this case === a javascript object for calcifer...
// this is to recognize names in the short term...
    new Person(currentPersonName, currentPersonGender, currentPersonAge);
  } else {
    //pullstorage function
    retrieveFromStorage();
  }
}

function moveToStorage () {
  var records = JSON.stringify(Person.all);
  localStorage.setItem('data', records);
}

function retrieveFromStorage () {
  var records = localStorage.getItem('data');
  Person.all = JSON.parse(records);
}

// THIS WILL BE SHOWN LATER
// $('#response-accuracy-feedback-div').show();
