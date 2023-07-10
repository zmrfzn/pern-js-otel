const logger = require("./app/logger");


const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

// var corsOptions = {
//   origin: "*"
// };
// app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

console.info(`log path => ${path.resolve(__dirname, '/../../build')}`)

//set custom headers | CORS control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, traceparent"
  );
  res.setHeader("Access-Control-Allow-Methods","*")
  let origin = req.get("origin");
    res.header("Access-Control-Allow-Origin", origin);
  // if (CORSwhitelist.indexOf(origin) >= 0) {
  // }
  return next();
});

const db = require("./database");
db.sequelize
  .sync()
  .then(() => {
    logger.info("Synced & Connected to the database!");
  })
  .catch((err) => {
    logger.error("Cannot connect to the database!", err.message);
    console.error("Cannot connect to the database!", err.message);
    process.exit();
  });

// simple route
app.get("/health", (req, res) => {
  res.json({ message: "Welcome to tutorial application." });
});

require("./app/routes/turorial.routes")(app);
const weather = require("./app/routes/weather.routes");
app.use("/api/weather",weather);
const otelRouter = require('./app/routes/otel.routes'); 
app.use('/api/traces',otelRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
try {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });
  
} catch (error) {
  console.error(error);
}