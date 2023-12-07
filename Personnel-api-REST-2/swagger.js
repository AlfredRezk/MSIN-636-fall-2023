require('dotenv').config({path:'./config/app.env'})
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
const swaggerAutogen = require('swagger-autogen')();
const {title, version, description, author, license} = require('./package.json')

const doc = {
    info:{
        title, description, version, license, 
        contact:{name: author, email: 'john@gmail.com'}
    },
    host: `${HOST}:${PORT}`,
    schemes:['http', 'https'],
    security:[{'JWT':true}]
}
const routes = ['./index.js']
const outputFile = './swagger.json'
swaggerAutogen(outputFile, routes, doc)