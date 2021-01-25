//Express initialization
const express = require('express');
const DB = require('./config/db');

const app = express();
DB.init();

//Define Routes
app.use('/', require('./routes/route'));

//Port assignment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on: ' + PORT));

