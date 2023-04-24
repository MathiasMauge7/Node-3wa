const http = require("http");
const app = require("./app");
const pug = require("pug");
const { Router } = require("express");
const express = require("express");
var router = express.Router();

app.set("view engine", "pug");

app.set("port", process.env.PORT || 9000);

Router.get("/", function (req, res) {
  res.send("index");
});

module.exports = router;
