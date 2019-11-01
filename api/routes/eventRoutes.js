const router = require('express').Router();
const { 
 addEvent, 
 getEventByVisitId, 
 findEventByUserIdAndSearchString
} = require("../controllers/eventController.js");

// add middleware to check content-type is application/json
router.post('/visit', addEvent);

router.get('/visit', (req, res) => {
 console.log(req.query)
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