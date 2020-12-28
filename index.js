const express = require('express');
//var expressLayouts = require('express-ejs-layouts');
const app = express();
const cors = require("cors")

const port = 8000;
app.use(cors());


const db = require('./config/mongoose');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport_jwt_strategy')

app.use(passport.initialize());
app.use(express.urlencoded());


mongoose.Promise = global.Promise;


app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error:err`);

    } else {
        console.log(`server is running:${port}`);
    }
});

module.exports = app;