import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  ChevronDown,
  HeartPulse,
  Menu,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { useContactInfo } from "../../services/contactInfo";

function Nav() {
  const contactInfo = useContactInfo();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, []);

  const closeMenus = () => {
    setShowSignInDropdown(false);
    setMobileOpen(false);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Facilities", path: "/Our-Facilities" },
    { name: "Find Doctor", path: "/Find-Doctor" },
    { name: "About", path: "/About-Us" },
    { name: "Contact", path: "/Contact-Us" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="top-ribbon hidden min-h-10 items-center px-5 text-sm text-white lg:flex">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-white/86">
              <ShieldCheck size={16} />
              Secure healthcare management
            </span>
            <Link to="/Book-Appointment" className="flex items-center gap-2 hover:text-[#bdeee0]">
              <CalendarCheck size={16} />
              Book appointment
            </Link>
            <Link to="/Find-Doctor" className="flex items-center gap-2 hover:text-[#bdeee0]">
              <Stethoscope size={16} />
              Find a doctor
            </Link>
          </div>
          <span className="flex items-center gap-2 text-white/86">
            <Phone size={16} />
            {contactInfo.phone}
          </span>
        </div>
      </div>

      <nav className="nav-shell">
        <div className="mx-auto flex min-h-[78px] w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-fit items-center gap-3" onClick={closeMenus}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f6ff] text-[#0f7fbf] ring-1 ring-[#cfe7f1]">
              <HeartPulse size={25} />
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-extrabold tracking-tight text-[#102f45]">
                MEDI FLOW
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#607385]">
                Health management system
              </span>
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="rounded-xl px-4 py-2 text-sm font-bold text-[#17324d] hover:bg-[#e8f6ff] hover:text-[#0f7fbf]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:ml-4 lg:flex">
            <Link
              to="/Book-Appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0f7fbf] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-[#0d6fa8]"
            >
              <CalendarCheck size={18} />
              Appointment
            </Link>

            {isAuthenticated ? (
              <Link
                to="/User-Account"
                className="inline-flex items-center gap-2 rounded-xl border border-[#cfe7f1] bg-white px-5 py-3 text-sm font-bold text-[#17324d] hover:border-[#0f7fbf] hover:text-[#0f7fbf]"
              >
                <UserRound size={18} />
                My Account
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#cfe7f1] bg-white px-5 py-3 text-sm font-bold text-[#17324d] hover:border-[#0f7fbf] hover:text-[#0f7fbf]"
                  onClick={() => setShowSignInDropdown((open) => !open)}
                >
                  <UserRound size={18} />
                  Sign In
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showSignInDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showSignInDropdown && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-[#d9e8ef] bg-white p-2 shadow-xl">
                    <Link
                      to="/login"
                      className="block rounded-xl px-4 py-3 text-sm font-bold text-[#17324d] hover:bg-[#e8f6ff] hover:text-[#0f7fbf]"
                      onClick={closeMenus}
                    >
                      User Sign In
                    </Link>
                    <Link
                      to="/login-doctor"
                      className="block rounded-xl px-4 py-3 text-sm font-bold text-[#17324d] hover:bg-[#e8f8f2] hover:text-[#16845f]"
                      onClick={closeMenus}
                    >
                      Doctor Sign In
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-[#cfe7f1] bg-white text-[#17324d] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#d9e8ef] bg-white px-4 py-4 shadow-xl lg:hidden">
            <div className="grid gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="rounded-xl px-4 py-3 font-bold text-[#17324d] hover:bg-[#e8f6ff] hover:text-[#0f7fbf]"
                  onClick={closeMenus}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/Book-Appointment"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0f7fbf] px-4 py-3 font-bold text-white"
                onClick={closeMenus}
              >
                <CalendarCheck size={18} />
                Book Appointment
              </Link>
              <Link
                to={isAuthenticated ? "/User-Account" : "/login"}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#cfe7f1] px-4 py-3 font-bold text-[#17324d]"
                onClick={closeMenus}
              >
                <UserRound size={18} />
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
