import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Mail, MapPin, Phone } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContactInfo } from "../../services/contactInfo";

function Footer() {
  const contactInfo = useContactInfo();
  const links = [
    { label: "About", path: "/About-Us" },
    { label: "Facilities", path: "/Our-Facilities" },
    { label: "Find Doctor", path: "/Find-Doctor" },
    { label: "Book Appointment", path: "/Book-Appointment" },
    { label: "Contact", path: "/Contact-Us" },
  ];

  return (
    <footer className="footer-gradient text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <HeartPulse size={26} />
            </span>
            <div>
              <h2 className="m-0 text-2xl font-extrabold">MEDI FLOW</h2>
              <p className="m-0 text-sm font-semibold text-[#bdeee0]">
                Smart healthcare management
              </p>
            </div>
          </div>
          <p className="max-w-md leading-7 text-white/72">
            A professional healthcare platform for appointments, patient
            records, doctors, pharmacy inventory, and clinical administration.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#bdeee0]">
            Quick links
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-semibold text-white/76 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#bdeee0]">
            Contact
          </h3>
          <div className="grid gap-3 text-sm font-semibold text-white/76">
            <span className="flex items-center gap-3">
              <Phone size={17} />
              {contactInfo.phone}
            </span>
            <span className="flex items-center gap-3">
              <Mail size={17} />
              {contactInfo.email || "Email configured in backend"}
            </span>
            <span className="flex items-center gap-3">
              <MapPin size={17} />
              {contactInfo.address}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/62">
        © All Rights Reserved to MEDI FLOW | Privacy Policy | Cookie Policy |
        Developed by ITPM_Y3S1_WE_91 Group
      </div>
    </footer>
  );
}

export default Footer;
