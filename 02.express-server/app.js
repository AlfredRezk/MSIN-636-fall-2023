const colors = require("colors");
const express = require("express");
const morgan = require("morgan");

const notesRoutes = require('./routes/notes');

// create application instance

const app = express();

let PORT = 8080;

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.static('public'))

app.use(notesRoutes);


app.listen(PORT, console.log(`Server running on port ${PORT}`.green.underline));
