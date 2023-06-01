const express = require("express");
const router = express.Router();

const weatherController = require('./../controllers/weather.controller')

router.get("/", weatherController.get);
// router.get("/", (req,res) => res.send('weather'));

module.exports = router;
