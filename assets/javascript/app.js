//JavaScript

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcvFYLnDxb_jg-DkKElQSh2KIGNDbagbA",
  authDomain: "fir-project-772f9.firebaseapp.com",
  databaseURL: "https://fir-project-772f9.firebaseio.com",
  projectId: "fir-project-772f9",
  storageBucket: "fir-project-772f9.appspot.com",
  messagingSenderId: "790740042122"
};
firebase.initializeApp(config);

var database = firebase.database();

//button for adding new trains
$("#submit-btn").on("click", function (event) {


  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    location: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // Uploads train data to Firebase
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(trainName.name);
  console.log(trainDestination.location);
  console.log(trainTime.time);
  console.log(trainFrequency.frequency);
  alert("Trains successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time").val("");
  $("#frequency").val("");


  event.preventDefault();
});






//Retrieve train information from Firebase
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().location;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);



//Assumptions
var tFrequency = trainFrequency;


// Converts time from unix time back to wall clock (military) time
var firstTimeConverted = moment(trainTime, "X");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minutes Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);



  // Calculate the next train time
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
  console.log("ARRIVAL TIME: " + nextTrain);



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


//taken from provided code:
// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// Assumptions
// var tFrequency = 3;

// // Time is 3:30 AM
// var firstTime = "03:30";

// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));