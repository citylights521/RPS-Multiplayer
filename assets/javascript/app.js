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

//button for adding new trains. This function gathers the user input and sends it to Firebase.
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
  // alert("Trains successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time").val("");
  $("#frequency").val("");

  event.preventDefault();
});



//This function retrieves the added trains information from Firebase.
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into variables.
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