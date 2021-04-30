// Web service
const express = require('express');
const app = express();
const routes = require('./routes');

// Env
require('dotenv').config()

// Mongo database
const mongoose = require('mongoose');

// redis database
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();


// Parser 
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(routes);

// Session
app.use(session({
    secret: process.env.SECRET_SESSION,
    store: new redisStore({host: process.env.REDIS_IP, port: process.env.REDIS_PORT, client: client, ttl: 86400}),
    saveUninitialized: false,
    resave: false
})); 

// Listen port 3001
// API
app.listen(process.env.PORT_API,(err)=>{
    if (err)
        throw err;    
    console.log(`waiting on localhost:${process.env.PORT_API}`);  
});


// MongoDB
const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect(process.env.URL_MONGO, options ,(err)=> {
    if (err)
        throw err;
    console.log('Connect to the database');
});

