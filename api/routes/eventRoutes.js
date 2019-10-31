const router = require('express').Router();
const { 
 addEvent, 
 getEventByVisitId, 
 findEventByUserIdAndSearchString
} = require("../controllers/eventController.js");

router.post('/', addEvent);
router.get('/', (req, res) => {
 if (req.query.visitId) {
  getEventByVisitId(req.query.visitId, res)
 } else if (req.query.searchString && req.query.userId) {
  findEventByUserIdAndSearchString(req.query.searchString, req.query.userId, res)
 }
});
module.exports = router;