// Require express and create an instance of it
import express from 'express';
import fs from 'fs';
import mysql from 'mysql2';
import * as mime from 'mime-types';
import cors from 'cors';
import cookieSession from 'cookie-session';
import db from './config/db.config.js';


//Import pages
import { HomePage } from './templates/home/home.js';
import { NotFound } from './templates/404/404.js';
import { PFoE } from './templates/f.o.e/FoE.js';
import { login } from './templates/login/login.js';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_POOL, DB_DIALECT } from './config/db.config.js';


const app = express(
  require('./routes/auth.routes.js'),
  require('./routes/user.routes.js'),
);
app.use(cors);
db.sequelize.sync();

const devMode = true;


// DB initialization
const connection = mysql.createConnection ({
  host : DB_HOST,
  port : DB_PORT,
  user : DB_USER,
  password : DB_PASSWORD,
  database : DB_DATABASE, 
  pool : DB_POOL,
  dialect : DB_DIALECT,
});

connection.connect((err) => {
  if(err) throw err;
  console.log("Connected to database")
})

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "pwnerio-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);


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
