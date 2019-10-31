require('dotenv').config();
const mongoose = require('mongoose');
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGO_URL, mongooseOptions)

const eventSchema = mongoose.Schema({
 userId: {
  type: String,
  required: 'Please enter the user Id',
 },
 name: {
  type: String,
  required: 'Please enter the name of the location'
 },
 created_at: {
  type: Date,
  default: Date.now
 },
 visitId: {
  type: String,
  required: 'Please enter the visitor id',
  unique: true
 }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;