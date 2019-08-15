document.addEventListener("DOMContentLoaded", function() {
  var checkStringButton = document.getElementById("addString");
  checkStringButton.addEventListener("click", addStringToArray, false);

  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearArray, false);
}, false);


function addStringToArray() {

/*
  var newArray = new Array();

  chrome.storage.sync.get(["key"], function(result) {

    console.log("Loaded array as " + result.key); //check what is grabbed first

    if (result.key == null || undefined) { //if the current clipboard history is empty
      newArray.push(readFromClipboard());
    } else { //has stuff already, add new string
      newArray = result.key;
      newArray.push(readFromClipboard());
    }
  });

  chrome.storage.sync.set({key: newArray}, function() {
    console.log("New array is " + newArray);
  });
}
*/

  chrome.storage.sync.get({list:[]},
    function(data) {
      console.log(data.list); //printing what was "got" for debugging
      update(data.list); //call helper function to append new value to array
     }
  );

  function update(clipboardContents) {
    clipboardContents.push(readFromClipboard()); //call helper function that simply grabs text
    chrome.storage.sync.set({list:clipboardContents}, function() { //update storage!
        console.log(readFromClipboard() + " added to list with new values"); //debugging
    });
  }
}



function readFromClipboard() {
  var userClipboard = document.getElementById("userInput").value;

  return userClipboard;
}

function clearArray() {
  emptyArray = [];
  chrome.storage.sync.set({list:emptyArray}, function() { //update storage
      console.log("list cleared!"); //debugging
  });


  //below is for debugging
  chrome.storage.sync.get({list:[]},
    function(data) {
      console.log(data.list); //printing what was "got"
     }
  );
}
