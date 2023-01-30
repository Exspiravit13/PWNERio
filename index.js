// Require express and create an instance of it
import express from 'express';
import fs from 'fs';


// Import Pages
import { HomePage } from './templates/home/home.js';
import { NotFound } from './templates/404/404.js';
import { P848 } from './templates/848/848.js';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DIALECT } from './config/db.config.js';
import { secret } from './config/auth.config.js';

// Import Packages
import mysql from 'mysql2';
import * as mime from 'mime-types';
import Sequelize  from 'sequelize';
import cors from 'cors';
import cookieSession from 'cookie-session';

const app = express();
app.use(cors);

const devMode = true;

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "pwnerio-session",
    secret: `${secret}`, // should use as secret environment variable
    httpOnly: true
  })
);

const handleRouteError = (req, res, e) => {
  res.status(500).send((devMode) ? e.toString() : "Server error, please try again later.");
};

const sequelize = new Sequelize ( `${DB_DATABASE}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host : DB_HOST,
  dialect : `${DB_DIALECT}`
})

try {
  await sequelize.authenticate();
  console.log(`Databse: ${DB_DATABASE}.`);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


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

app.get('/848', async (req, res) => {
  try{
    const page = P848();
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
