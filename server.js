// ------------------------------------ Modules ------------------------------------ //

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// ------------------------------- Instanced Modules ------------------------------- //

const app = express();

// ------------------------- State Configuration Variables ------------------------- //

const routes = require('./routes');
const PORT = process.env.PORT || 4000;

// ----------------------------------- Middleware ---------------------------------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log('HELLO FROM SERVER.JS 1: ', process.env);

app.use(
   session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { sameSite: 'none', secure: true, httpOnly: false },
   })
);

const corsOptions = {
   origin: 'http:localhost:4000',
   methods: ['GET', 'PUT', 'POST', 'HEAD', 'DELETE', 'OPTIONS'],
   headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
   credentials: true,
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('http:localhost:4000', cors());

// ------------------------------------- Routes ------------------------------------ //

app.get('/', (req, res) => {
   res.send('<h1> Henlo </h1>');
});

app.use('/auth', routes.auth);

// --------------------------------- Server Listener ------------------------------ //

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});
