const http = require("http");
const routes = require('./routes')
const colors = require('colors');

const PORT = 8080;

const server = http.createServer(routes);

server.listen(PORT, console.log(`server is running on port ${PORT}`.green.inverse));
