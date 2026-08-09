const express = require("express");
const { getContactConfig } = require("../Controllers/ConfigController");

const router = express.Router();

router.get("/contact", getContactConfig);

module.exports = router;
