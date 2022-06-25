// Import packages
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Require express and create an instance of it
import express from 'express';
import fs from 'fs';



import { About } from '../templates/about/about.js';
import { HomePage } from './templates/home/home.js';
import { NotFound } from './templates/404/404.js';
import * as mime from 'mime-types';

import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE,} from 'process.env';

const app = express();
const devMode = true;

dotenv.config();


const con = mysql.createConnection({
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database");
});


// on the request to root (localhost:8000/)
app.get('/', async (req, res) => {
  try{
    const home = HomePage();
    const result = await home.render(req);
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
