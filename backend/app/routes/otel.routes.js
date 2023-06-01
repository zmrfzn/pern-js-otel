const express = require("express");
const otelRouter = express.Router();
const path = require('path');
const logger = require("./../logger");

const OTEL_CONFIG = {
    NR_LICENSE : "f5644626eef13f26d27746c6e381555ef9f9NRAL",
    NR_ENDPOINT: "https://otlp.nr-data.net:4318/v1/traces"
}

otelRouter.post("/", (req,res) => {
    console.log(req.originalUrl);
    var axios = require("axios");

    var config = {
      method: "post",
      url: `${OTEL_CONFIG.NR_ENDPOINT}`,
      headers: {
        "Content-Type": "application/json",
        "api-key" : OTEL_CONFIG.NR_LICENSE
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
