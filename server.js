// Libray for Web service
const express = require('express');
const app = express();
const routes = require('./routes');

// Library for redis (session)
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

// Libray for Env
require('dotenv').config()

// Libray for Mongo database
const mongoose = require('mongoose');

// Libray for Secure API with cors
const cors = require('cors');

// Redis session
const RedisStore = connectRedis(session)

//Configure redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_URL_DOCKER,
    port: process.env.REDIS_PORT
})

redisClient.on('error', (err) => {
    console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', () => {
    console.log('Connected to redis successfully');
});

//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: Number(process.env.TIME_SESSION) // session max age in miliseconds (86400000ms = 1 day)
    }
}));

// Parser (JSON)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(routes);

// Add cors for the security
app.use(cors({
    origin:[`http://localhost:${process.env.PORT}`],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

// API Listens port (.ENV)
app.listen(process.env.PORT_API,(err)=>{
    if (err)
        throw err;    
    console.log(`API is waiting on localhost:${process.env.PORT_API}`);  
});

// MongoDB options
const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

// Connect to Mongodb with option define before
mongoose.connect(process.env.URL_MONGO, options ,(err)=> {
    if (err)
        throw err;
    console.log('Connected to Mongodb successfully');
});


