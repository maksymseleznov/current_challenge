const Event = require('../models/eventModel.js');
const uuid = require('uuid/v4');

// add an event
const addEvent = async (req, res) => {
 const { userId, name } = req.query;
 // using npm module to randomly generate a string
 let visitId = uuid();
 // removing all dashes (-) from string
 visitId = visitId.replace(/-/gi, '');
 const newEvent = new Event({ 
  userId, 
  name,
  visitId
 });
 
 newEvent.save((error) => {
  if (error) {
   res.send({ Error: err });
   return;
  }
  res.send({ visitId: `${visitId}`});
  return;
 });
};

// retrieve event by visit id
const getEventByVisitId = (visitId, res) => {
 Event.find({ visitId }, (err, data) => {
  if (err) {
   res.send({ Error: err });
   return;
  } else {
   res.json(data);
   return;
  }
 });
};


// get events by userId and search string
const findEventByUserIdAndSearchString = (searchString, userId, res) => {
 Event.find({ userId }, null, { limit: 5, sort: {'created_at': -1} }, async (err, data) => {
  if (err) {
   res.json(err);
   return;
  } else {
    const newData = await data.filter(event => {
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
