const express = require("express");
const router = express.Router();
const os = require("os");

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.get("/api/getUsername", (req, res) => {
  res.send({ username: os.userInfo().username });
});

module.exports = router;
