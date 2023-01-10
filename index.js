// Require express and create an instance of it
import express from 'express';
import fs from 'fs';
import { HomePage } from './templates/home/home.js';
import { NotFound } from './templates/404/404.js';
import * as mime from 'mime-types';
import { PFoE } from './templates/f.o.e/FoE.js';
import { login } from './templates/login/login.js'
 

const app = express();
const devMode = true;

const handleRouteError = (req, res, e) => {
  res.status(500).send((devMode) ? e.toString() : "Server error, please try again later.");
};

// on the request to root (localhost:8000/)
app.get('/', async (req, res) => {
  try{
    const page = HomePage();
    const result = await page.render(req);
    res.status(200).send(result);
  }catch(e){
    handleRouteError(req, res, e);
  }
});

app.get('/f.o.e', async (req, res) => {
  try{
    const page = PFoE();
    const result = await page.render(req);
    res.status(200).send(result);
  }catch(e){
    handleRouteError(req, res, e);
  }
});

app.get('/login', async (req, res) => {
  try{
    const page = login();
    const result = await page.render(req);
    res.status(200).send(result);
  }catch(e){
    handleRouteError(req, res, e);
  }
});

// On localhost:8000/welcome
app.get('/welcome', function (req, res) {
    res.send('Welcome to PWNER.io');
});


/* Catch every request with prefix /static so we can serve the static stuff */
app.get('/static/*', async (req, res) => {
  fs.readFile(`.${req.url}`, async (err, data) => {
    if(err){
      try{
        const page = NotFound();
        const result = await page.render(req);
        res.status(200).send(result);
      }catch(e){
        res.status(500).send((devMode) ? e.toString() : "Server error, please try again later.");
      }
      return;
    }

    const mimeType = mime.lookup(req.url);
    if(mimeType){
      res.setHeader('Content-Type', mimeType);
    }
    res.status(200).send(data);
  });
});

// Change the 404 message modifing the middleware
app.use(async function(req, res, next) {
  try{
    const page = NotFound();
    const result = await page.render(req);
    res.status(200).send(result);
  }catch(e){
    res.status(500).send((devMode) ? e.toString() : "Server error, please try again later.");
  }
});

// start the server in the port 8000 !
app.listen(8000,function () {
    console.log('HTTPS server running on port 8000.');
});
