// Require express and create an instance of it
const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = (`path`);


// on the request to root (localhost:8000/)
app.get('/', function (req, res) {
  fs.readFile('./templates/home.html', 'utf8', (err, data) => {
    if(err){
      res.status(500).send(err.toString());
      return;
    }
    res.send(data)
  })
});

// On localhost:8000/welcome
app.get('/welcome', function (req, res) {
    res.send('Welcome to PWNER.io');
});


// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("404.html");
});

// start the server in the port 8000 !
app.listen(8000,function () {
    console.log('HTTPS server running on port 8000.');
});
