const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const Sequlize =require('sequelize')
const path = require('path');

const recordRoutes = require('./api/router/record');
const diaryRoutes = require('./api/router/diary');
const userRoutes = require('./api/router/user');

//Database
const db = require ('./config/database');
//Test DB
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
app.use((req, res, next) =>{
 res.header('Access-Control-Allow-Origin','*');
 res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Conten-Type, Accept, Authorization"
 );
 if(req.method === 'OPTIONS'){
     req.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET');
     return res.status(200).json({});
 }
 next();
});

// Router which should handle router
app.use('/user',userRoutes);
app.use('/record',recordRoutes);
app.use('/diary',diaryRoutes);
   
app.use((req, res, next) =>{
const error = new Error('Not fount');
error.status=404;
next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500 );
    res.json({
        error:{
            message: error.message
            
        }
    })
    });
module.exports = app;