const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./api/routes/eventRoutes.js');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up routes
app.use('/', router);

app.listen(port, () => {
 console.log(`Server is listening on port: ${port}`);
});