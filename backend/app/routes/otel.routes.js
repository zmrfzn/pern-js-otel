const express = require("express");
const otelRouter = express.Router();
const path = require('path');
const logger = require("./../logger");

// const COLLECTOR_URL = "http://localhost:4318/v1/traces";
const COLLECTOR_URL = "COLLECTOR_ENDPOINT_HERE";

otelRouter.post("/", (req,res) => {
    console.log(req.originalUrl);
    var axios = require("axios");

    var config = {
      method: "post",
      url: COLLECTOR_URL,
      headers: {
        "Content-Type": "application/json"
      },
      data: req.body
    };

    axios(config)
    .then(function (response) {
        logger.info(
            `${req.method} ${req.originalUrl} : sending Telemetry data}`
          );
      res.send(response.data);
    })
    .catch(function (error) {
      logger.error(
        `${req.method} ${req.originalUrl}- ${JSON.stringify(
          req.params
        )} - Error sending telemetry data`
      );
      res
        .status(500)
        .send(error);
    });

    // res.send("ok");
})

module.exports = otelRouter;
