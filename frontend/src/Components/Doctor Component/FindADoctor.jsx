import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  HeartPulse,
  Search,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";

function FindADoctor() {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiology",
      detail: "Heart care, hypertension, preventive screenings",
    },
    {
      name: "Dr. Michael Chen",
      role: "General Medicine",
      detail: "Primary care, chronic care, routine consultation",
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Diagnostics",
      detail: "Reports, clinical review, follow-up planning",
    },
  ];

  return (
    <div className="mf-page min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-[#d9e8ef] bg-[#f6fcff] py-16">
          <div className="mf-container grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="mf-chip mb-5 px-4 py-2">Find a doctor</div>
              <h1 className="max-w-3xl text-4xl font-extrabold text-[#102f45] md:text-5xl">
                Choose the right specialist and book with confidence.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#607385]">
                Search doctors by care area, review availability, and continue
                into the appointment workflow without confusion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/Book-Appointment"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0f7fbf] px-6 py-3 font-bold text-white hover:bg-[#0d6fa8]"
                >
                  <CalendarCheck size={18} />
                  Book appointment
                </Link>
                <Link
                  to="/Contact-Us"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#b7ddea] bg-white px-6 py-3 font-bold text-[#17324d] hover:text-[#0f7fbf]"
                >
                  Contact care team
                </Link>
              </div>
            </div>

            <div className="mf-card p-5">
              <div className="flex items-center gap-3 rounded-2xl border border-[#d9e8ef] bg-[#f8fcfd] px-4 py-3">
                <Search size={19} className="text-[#0f7fbf]" />
                <span className="font-semibold text-[#607385]">Search by doctor, department, or concern</span>
              </div>
              <div className="mt-5 grid gap-3">
                {["Cardiology", "General Medicine", "Diagnostics", "Pharmacy Support"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-[#d9e8ef]">
                    <span className="font-bold text-[#17324d]">{item}</span>
                    <ArrowRight size={17} className="text-[#0f7fbf]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mf-container py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="mf-chip mb-4 px-4 py-2">Available specialists</div>
              <h2 className="text-3xl font-extrabold text-[#102f45]">
                Featured care team
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div key={doctor.name} className="mf-card p-6">
                <div className="mb-5 flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e8f6ff] text-[#0f7fbf]">
                    <Stethoscope size={27} />
                  </span>
                  <div>
                    <h3 className="m-0 text-lg font-extrabold text-[#102f45]">{doctor.name}</h3>
                    <p className="m-0 text-sm font-bold text-[#24a67a]">{doctor.role}</p>
                  </div>
                </div>
                <p className="leading-7 text-[#607385]">{doctor.detail}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#0f7fbf]">
                  <BadgeCheck size={17} />
                  Verified provider
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mf-container grid gap-5 md:grid-cols-3">
            {[
              { icon: <UserRoundCheck size={24} />, title: "Verified profiles" },
              { icon: <CalendarCheck size={24} />, title: "Simple booking" },
              { icon: <HeartPulse size={24} />, title: "Patient-first care" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#d9e8ef] bg-[#f8fcfd] p-5">
                <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-white text-[#24a67a]">
                  {item.icon}
                </span>
                <h3 className="m-0 font-extrabold text-[#102f45]">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FindADoctor;
