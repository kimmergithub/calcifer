'use strict';

let wordCheck;
let newNameWord;

function unrecognizedNameLearning(){

  function createNewNameWordObject(){
    console.log('CREATING new Name Word!');
    newNameWord =
        {
          word: nameToLearn,
          type: newWordType,
          patternOrigination: "Pattern placeholder",
          probabilityOfPatternRecognition: 0
        }
    console.log(newNameWord);
  }

  function postNewWord(){
    console.log('Hello from POSTWORDS FUNCTION');
    console.log(newNameWord)
    $.ajax({
      type: 'POST',
      url: 'api/words',
      data: newNameWord,
      success: function(data){
        console.log('POSTING success', data);
      },
      error: function(){
        alert('error posting new name word!')
      }
    });
  }

  // function putNewWord(){
  //   console.log('Hello from PUTNEW-WORD FUNCTION');
  //   console.log(newNameWord)
  //   $.ajax({
  //     type: 'PUT',
  //     url: 'api/words/5991d1f90771423a46babdb3',
  //     data: newNameWord,
  //     success: function(data){
  //       console.log('success', data);
  //     },
  //     error: function(){
  //       alert('error PUTTING new name word!')
  //     }
  //   });
  // }

  createNewNameWordObject();
  postNewWord();
  // getWords(isThereWords);
}
