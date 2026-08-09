const express = require("express");
const {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} = require("../Controllers/ContactMessageController");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", getContactMessages);
router.patch("/:id/status", updateContactMessageStatus);

module.exports = router;
