require("colors");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const connectDB = require("./db");
const app = express();
const productsRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");

// Configurations
dotenv.config();
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "production";

// Connect to DB
connectDB();
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    runtimeOptions: { allowProtoPropertiesByDefault: true },
  })
);
app.set("view engine", "hbs");

// Middlewares
if (MODE === "development") app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", productsRoutes);
app.use("/admin", adminRoutes);
app.listen(
  PORT,
  console.log(`Server running on ${MODE} mode at port ${PORT}`.green.underline)
);
