'use strict';

const express = require('express');

// * creates the app... allows us to use express!
// WE ARE CREATING AN EXPRESS APPLICATION OF COURSE
const app = express();

// It will listen for the vairiable and look for an environment in like heroku or... grab 3000
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/calcifer'
// // This is MONGODB_URI is so heroku can do its thing to create a db... it will recognize it! When we heroku deploy
// mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log('app.listen now listening for request!')
  debug(`listening on ${PORT}`); // this is our custome message that we created to tell us what's happening...
});
