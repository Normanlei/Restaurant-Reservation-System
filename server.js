// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// =============================================================
var reservations = [];
var waitlist = [];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reservation", function (req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});
app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
// Displays all characters
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});
// Displays a single character, or returns false
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
})
// Create New Characters - takes in JSON input
app.post("/api/reservations", function (req, res) {
  var newReservation = req.body;
  var index = -1;
  for (var i = 0; i < reservations.length; i++) {
    if (reservations[i].code === newReservation.code) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    reservations[index] = newReservation;
  } else {
    reservations.push(newReservation);
  }
  res.json(newReservation);
});

app.post("/api/waitlist", function (req, res) {
  var newReservation = req.body;
  var index = -1;
  for (var i = 0; i < waitlist.length; i++) {
    if (waitlist[i].code === newReservation.code) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    waitlist[index] = newReservation;
  } else {
    waitlist.push(newReservation);
  }
  res.json(newReservation);

});

app.delete("/api/reservations", function (req, res) {
  var deleteReservation = req.body;
  for (var i = 0; i < reservations.length; i++) {
    if (reservations[i].code === deleteReservation.code) {
      reservations.splice(i, 1);
      break;
    }
  }
  res.json(deleteReservation);
});

app.delete("/api/waitlist", function (req, res) {
  var deletewaitlist = req.body;
  for (var i = 0; i < waitlist.length; i++) {
    if (waitlist[i].code === deletewaitlist.code) {
      waitlist.splice(i, 1);
      break;
    }
  }
  res.json(deletewaitlist);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});