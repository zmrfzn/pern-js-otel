const logger = require("./../logger");
const API_CONFIG = {
  baseURL: "http://api.openweathermap.org/data/2.5",
  TOKEN: "b06f7aeeae13ab893ca5409afa2ca384",
};

exports.get = (req, res) => {
  var axios = require("axios");

  var config = {
    method: "get",
    url: `${API_CONFIG.baseURL}/weather?q=${req.query.location}&appid=${API_CONFIG.TOKEN}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      logger.info(
        `${req.method} ${req.originalUrl}- ${JSON.stringify(
          req.params
        )} - Request Successful!!`
      );
      res.send(response.data);
    })
    .catch(function (error) {
      logger.error(
        `${req.method} ${req.originalUrl}- ${JSON.stringify(
          req.params
        )} - Error fetching data`
      );
      res
        .status(404)
        .send({ message: "Error retrieving data for location=" + req.params?.location });
    });
};
