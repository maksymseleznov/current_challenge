const router = require('express').Router();
const { 
 addEvent, 
 getEventByVisitId, 
 findEventByUserIdAndSearchString
} = require("../controllers/eventController.js");

// add middleware to check content-type is application/json
router.post('/visit', addEvent);

router.get('/visit', async (req, res) => {
 const { visitId, searchString, userId } = req.query;
 let event;

 // check if querying with visitId
 if (visitId) {
  event = await getEventByVisitId(visitId, res);
  return res.json(event);
  // check if querying using searchString and userId
 } else if (searchString && userId) {
  event = await findEventByUserIdAndSearchString(searchString, userId, res);
  return res.json(event);
 } else {
  // return Error string if not using visitId or userId/searchString
  return res.send('Please enter correct fields in query string');
 }
});

module.exports = router;