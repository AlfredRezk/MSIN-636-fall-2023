require("colors");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const connectDB = require("./db");
const flash = require('connect-flash');
const app = express();

const productsRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// Configurations
dotenv.config();
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "production";
// Template configuration 
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    runtimeOptions: { allowProtoPropertiesByDefault: true },
  })
);
app.set("view engine", "hbs");

// Configure the session store
var store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'mySessions'
});

// Middlewares
if (MODE === "development") app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: store,
  resave: false,
  saveUninitialized: false 
}))

app.use(flash());

app.use((req, res, next)=>{
  req.user = req.session.user;
  res.locals.isAuth = req.session.isLoggedIn;
  // User role
  res.locals.isAdmin = req.session?.user?.role==='admin';
  res.locals.cart = req.session?.user?.cart?.products.qty || '0';
  res.locals.errorMessage = req.flash('error')
  res.locals.successMessage = req.flash('success')
  next()
})

app.use("/", productsRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

process.on('unhandledRejection', (error)=>{
  console.log(error)
})
app.listen(PORT, () => {
  console.log(`Server running on ${MODE} mode at port ${PORT}`.green.underline);
 connectDB();
});
