const ContactMessage = require("../Models/ContactMessageModel");

const normalizePhone = (value) => String(value || "").replace(/[\s-]/g, "");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, topic, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email." });
    }

    const cleanPhone = normalizePhone(phone);
    if (
      cleanPhone &&
      !/^(\+91)?[6-9]\d{9}$/.test(cleanPhone) &&
      !/^0[6-9]\d{9}$/.test(cleanPhone)
    ) {
      return res.status(400).json({ message: "Please provide a valid Indian mobile number." });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone: cleanPhone,
      topic,
      message,
    });

    res.status(201).json({
      message: "Message received successfully.",
      data: contactMessage,
    });
  } catch (err) {
    console.error("Error creating contact message:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching contact messages:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateContactMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    console.error("Error updating contact message:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
};
