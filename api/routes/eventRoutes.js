const router = require('express').Router();
const { 
 addEvent, 
 getEventByVisitId, 
 findEventByUserIdAndSearchString
} = require("../controllers/eventController.js");

router.post('/', addEvent);

router.get('/', (req, res) => {
 const { visitId, searchString, userId } = req.query;
 if (visitId) {
  getEventByVisitId(visitId, res);
 } else if (searchString && userId) {
  findEventByUserIdAndSearchString(searchString, userId, res)
 } else {
  res.send('Please enter correct fields in query string');
 }
});

module.exports = router;