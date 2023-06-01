const express = require("express");
const webAppRouter = express.Router();
const path = require('path');

webAppRouter.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../build", "index.html"));
});

module.exports = webAppRouter;
