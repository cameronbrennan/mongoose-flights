const Flight = require("../models/flight");

module.exports = {
  index,
  show,
  new: newFlight,
  create,
};

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render("flights", {
      title: "All Flights",
      flights,
    });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flights) {
    res.render("flights/show", {
      title: "Flight Information",
      flight: flights,
    });
  });
}

function newFlight(req, res) {
  res.render("flights/new", { title: "Add Flight" });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) {
      return res.render("flights/new", {
        title: "Please re-enter a flight number between 10 and 9999",
      });
    }
    res.redirect("/flights");
  });
}
