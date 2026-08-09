const CONTACT_PHONE = "+91 9334231954";

const getContactConfig = (req, res) => {
  res.status(200).json({
    phone: CONTACT_PHONE,
    email: process.env.EMAIL_USER || "",
    address: process.env.CONTACT_ADDRESS || "Medi Flow Healthcare Coordination",
    website: process.env.PUBLIC_WEBSITE || "www.mediflow.com",
  });
};

module.exports = {
  getContactConfig,
};
