import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useContactInfo } from "../../services/contactInfo";

function ContactUs() {
  const contactInfo = useContactInfo();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General inquiry",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (
      cleanPhone &&
      !/^(\+91)?[6-9]\d{9}$/.test(cleanPhone) &&
      !/^0[6-9]\d{9}$/.test(cleanPhone)
    ) {
      setErrorMessage("Please enter a valid Indian mobile number.");
      setSubmitting(false);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact-messages`,
        { ...formData, phone: cleanPhone }
      );
      setSuccessMessage("Thank you. Our care coordination team will contact you soon.");
      setFormData({ name: "", email: "", phone: "", topic: "General inquiry", message: "" });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "We could not submit the message right now. Please try again shortly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mf-page min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-[#d9e8ef] bg-[#f6fcff] py-16">
          <div className="mf-container grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <div className="mf-chip mb-5 px-4 py-2">Contact us</div>
              <h1 className="text-4xl font-extrabold text-[#102f45] md:text-5xl">
                Speak with the MEDI FLOW care coordination team.
              </h1>
              <p className="mt-5 leading-8 text-[#607385]">
                Questions about appointments, reports, pharmacy workflows, or
                administration? Send a message and the right team member will follow up.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  { icon: <Phone size={20} />, title: "Phone", text: contactInfo.phone },
                  { icon: <Mail size={20} />, title: "Email", text: contactInfo.email || "Email configured in backend" },
                  { icon: <MapPin size={20} />, title: "Location", text: contactInfo.address },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-[#d9e8ef] bg-white p-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f6ff] text-[#0f7fbf]">
                      {item.icon}
                    </span>
                    <div>
                      <p className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[#607385]">
                        {item.title}
                      </p>
                      <p className="m-0 font-bold text-[#17324d]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mf-card p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e8f8f2] text-[#24a67a]">
                  <MessageCircle size={24} />
                </span>
                <div>
                  <h2 className="m-0 text-2xl font-extrabold text-[#102f45]">
                    Send a message
                  </h2>
                  <p className="m-0 mt-1 text-sm text-[#607385]">
                    We usually respond within one business day.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9334231954"
                />
                <TextField
                  fullWidth
                  label="Topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="General inquiry">General inquiry</option>
                  <option value="Appointment support">Appointment support</option>
                  <option value="Medical reports">Medical reports</option>
                  <option value="Pharmacy support">Pharmacy support</option>
                  <option value="Technical support">Technical support</option>
                </TextField>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  endIcon={<Send size={18} />}
                >
                  {submitting ? "Submitting..." : "Submit message"}
                </Button>
              </div>

              {errorMessage && (
                <p className="mt-5 rounded-xl bg-red-50 p-4 text-center font-bold text-red-600">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="mt-5 rounded-xl bg-[#e8f8f2] p-4 text-center font-bold text-[#16845f]">
                  {successMessage}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactUs;
