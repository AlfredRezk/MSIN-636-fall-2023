// Start Express server 
const express = require('express');
const cors = require('cors')

const app = express()
// Import modules
require('colors')
require('dotenv').config({path:'./config/app.env'})
require('express-async-errors')

// Configurations
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || 'production';
const HOST = process.env.HOST || '127.0.0.1';

// connect to DB
require('./config/db')() 


// Parse json data
app.use(express.json());
// Enable cors 
app.use(cors())
// logger
app.use(require('./middlewares/logger'))


// Routes
app.use('/api', require('./routes'))


// Express Error Handler 
app.use(require('./middlewares/errorHandler'))
// Run the server 
app.listen(PORT, console.log(`Server running on ${MODE} at http://${HOST}:${PORT}`.green.underline))