const path = require('path');
const pathToENV = path.join(__dirname, '/../.env');
require('dotenv').config({ path: pathToENV });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const router = require('./api/routes/eventRoutes.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/visit', router);

app.listen(port, () => {
 console.log(`Server is listening on port: ${port}`);
})