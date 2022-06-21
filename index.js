// Require express and create an instance of it
import express from 'express';
import fs from 'fs';
import { HomePage } from './templates/home/home.js';

const app = express();
const devMode = true;


// on the request to root (localhost:8000/)
app.get('/', async (req, res) => {
  try{
    const result = await HomePage.render();
    res.status(200).send(result);
  }catch(e){
    res.status(500).send((devMode) ? e.toString() : "Server error, please try again later.");
  }
});

// On localhost:8000/welcome
app.get('/welcome', function (req, res) {
    res.send('Welcome to PWNER.io');
});


/* Catch every request with prefix /static so we can serve the static stuff */
app.get('/static/*', (req, res) => {
  fs.readFile(`.${req.url}`, (err, data) => {
    if(err){
      res.status(404).send("Not found");
      return;
    }
    res.status(200).send(data.toString());
  });
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("404.html");
});

// start the server in the port 8000 !
app.listen(8000,function () {
    console.log('HTTPS server running on port 8000.');
});
