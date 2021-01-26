//Express initialization
const express = require('express');
const DB = require('./library/database-adaptor');
const config = require('./resources/config')

const app = express();

//Connect to DB
DB.init();

//Init middleware
app.use(express.json());

//Define Routes
app.use('/', require('./routes/route'));

//Port assignment
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => console.log('Server started on: ' + PORT));

