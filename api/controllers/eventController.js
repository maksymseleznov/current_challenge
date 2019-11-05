const Event = require('../models/eventModel.js');
const uuid = require('uuid/v4');
// add an event
const addEvent = async (req, res) => {
 const { userId, name } = req.body;
console.log('content-type', req.headers['content-type']);
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
 
 // save event
 const event = await newEvent.save();

 // return visitId from saved event
 if (event && event.visitId) {
   return res.json({ visitId: event.visitId });
 } 
  return res.send('Error saving event');
};

// get userId and name by visitId
const getEventByVisitId = async (visitId) => {
 const event = await Event.find({ visitId }, 'userId name visitId');
 return event;
};


// get event info (userId, name, visitId) by userId and searchString
// limit to 5 most recent events
const findEventByUserIdAndSearchString = async (searchString, userId) => {
  let userInfo = await Event.find({ userId }, 'userId name visitId', { limit: 5, sort: {'created_at': -1} });
  
  // if user has an event saved, filter to match search string 
  if (userInfo && userInfo.length > 1) {
    userInfo = userInfo.filter(event => {
      const eventNameLowerCase = event.name.toLowerCase();
      return eventNameLowerCase.includes(searchString.toLowerCase());
    });
  }
  return userInfo;
};

module.exports = { 
 addEvent, 
 getEventByVisitId, 
 findEventByUserIdAndSearchString 
};
