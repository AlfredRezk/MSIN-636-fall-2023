require("colors");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();

// Configurations
dotenv.config();
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "production";

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Middlewares
if (MODE === "development") 
    app.use(morgan("dev"));
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("pages/home", {docTitle:'Home Page'});
});
app.get('/products', (req, res)=>{
  res.render('pages/products', {docTitle: 'Products'})
})

app.listen(
  PORT,
  console.log(`Server running on ${MODE} mode at port ${PORT}`.green.underline)
);
