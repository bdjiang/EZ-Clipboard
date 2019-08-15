document.addEventListener("DOMContentLoaded", function() {
  var checkStringButton = document.getElementById("addString");
  checkStringButton.addEventListener("click", addStringToArray, false);

  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearArray, false);

  document.getElementById("userInput").addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      addStringToArray();
    }
  });

  populateText();
}, false);


function populateText() {
  chrome.storage.sync.get({list:[]},
    function(data) {
      console.log(data.list); //printing what was "got" for debugging
      for(var i= 0; i < data.list.length; i++) {
        document.getElementById("masterBoard").innerHTML += data.list[i]; //update user facing
        document.getElementById("masterBoard").innerHTML += "<br>";
      }
    }
  );
}

function addStringToArray() {

  chrome.storage.sync.get({list:[]},
    function(data) {
      console.log(data.list); //printing what was "got" for debugging
      update(data.list); //call helper function to append new value to array
    }
  );

}

function update(clipboardContents) {
  clipboardContents.push(readFromClipboard()); //call helper function that simply grabs text
  document.getElementById("masterBoard").innerHTML += readFromClipboard(); //update user facing
  document.getElementById("masterBoard").innerHTML += "<br>";
  chrome.storage.sync.set({list:clipboardContents}, function() { //update storage!
    console.log(readFromClipboard() + " added to list with new values"); //debugging
  });
}


function readFromClipboard() {
  var userClipboard = document.getElementById("userInput").value;

  return userClipboard;
}


function clearArray() {
  emptyArray = [];
  chrome.storage.sync.set({list:emptyArray}, function() { //update storage
    document.getElementById("masterBoard").innerHTML = ""; //update user facing element
    console.log("list cleared!"); //debugging
  });


  //below is for debugging
  chrome.storage.sync.get({list:[]},
    function(data) {
      console.log(data.list); //printing what was "got"
     }
  );
}
