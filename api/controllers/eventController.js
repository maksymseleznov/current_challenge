const Event = require('../models/eventModel.js');
const uuid = require('uuid/v4');
// const JSON = require('circular-json');
// add an event
const addEvent = (req, res) => {
  let data = Object.keys(req.body)[0];
  data = data.replace(/\\|\//g,''); // remove all slashes from object
  data = JSON.parse(JSON.stringify(data)); // stringify and then parse
  data = JSON.parse(data); // must parse twice otherwise remains a string

 const { userId, name } = data;

 // using npm module to randomly generate a string
 let visitId = uuid();
 // removing all dashes (-) from string
 visitId = visitId.replace(/-/gi, '');

 // create new event instance with userId, name and generated visitId
 const newEvent = new Event({ 
  userId, 
  name,
  visitId
 });
 
 newEvent.save((err) => {
  if (err) {
  const error = err.errors && err.errors.name
   res.json({ Error: JSON.stringify(error) });
   return;
  }
  res.json({ visitId });
  return;
 });
};

// retrieve event by visit id
const getEventByVisitId = (visitId, res) => {
 Event.find({ visitId }, 'userId name visitId', (err, data) => {
  if (err) {
   res.json({ Error: err });
   return;
  } else {
   res.json(data);
   return;
  }
 });
};


// get events by userId and search string
const findEventByUserIdAndSearchString = (searchString, userId, res) => {
 Event.find({ userId }, 'userId name visitId', { limit: 5, sort: {'created_at': -1} }, (err, data) => {
  if (err) {
   res.json(err);
   return;
  } else {
    const newData = data.filter(event => {
      // lowercase searchterm and venue name to deal with capitilization differences
      const venueName = event.name.toLowerCase()
      const searchTerm = searchString.toLowerCase()
      return venueName.includes(searchTerm)
   });
   res.json(newData);
   return;
  }
 })
};

module.exports = { 
 addEvent, 
 getEventByVisitId, 
 findEventByUserIdAndSearchString 
};
