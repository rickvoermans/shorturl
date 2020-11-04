require('dotenv').config({path: __dirname + '/src/env/.env'});

const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const errorHandler = require('./src/middleware/error-handler');
const notFound = require('./src/middleware/not-found'); 
const urlRoutes = require('./src/routes/shorturl.routes');
const mongoConnection = require('./src/env/mongo.db');

// Variables from dotenv:
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

// Homepage react-app:
app.use('/home', express.static('src/templates/'));

// Middlewares:
app.use(express.json())
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({
    origin: 'localhost:3000'
}));

// Initialize routes:
app.use('/urls', urlRoutes)
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the url shortener!'
    });
});

app.use(notFound);
app.use(errorHandler);

// Start API:
app.listen(port, () => {
    console.log(`App listening on ${port}, visit http://${hostname}:${port}/home`);
});