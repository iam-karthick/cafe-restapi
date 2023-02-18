const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./src/config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

  next();
});
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyCafes application. Take cafes quickly. Organize and keep track of all your cafes."});
});
require('./src/app/routes/api.routes.js')(app);
// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port ",8080);
});
