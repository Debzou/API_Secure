// Libray for Web service
const express = require('express');
const app = express();
const routes = require('./routes');

// Libray for Env
require('dotenv').config()

// Libray for Mongo database
const mongoose = require('mongoose');

// Libray for Secure API with cors
const cors = require('cors');

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
    console.log(`waiting on localhost:${process.env.PORT_API}`);  
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
    console.log('Connect to the database');
});


