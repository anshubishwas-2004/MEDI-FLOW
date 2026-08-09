import React from "react";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import {
  Activity,
  BedDouble,
  FlaskConical,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  Timer,
} from "lucide-react";

function OurFacilities() {
  const facilities = [
    {
      icon: <Stethoscope size={26} />,
      title: "Specialist Consultation",
      text: "Structured appointment routing for patients, receptionists, and doctors.",
    },
    {
      icon: <Pill size={26} />,
      title: "Pharmacy Services",
      text: "Inventory visibility, prescription support, and safer stock management.",
    },
    {
      icon: <FlaskConical size={26} />,
      title: "Digital Reports",
      text: "Centralized medical records and report handling for faster follow-up.",
    },
    {
      icon: <Activity size={26} />,
      title: "Health Monitoring",
      text: "Vitals, symptom analysis, and trend tools for ongoing care decisions.",
    },
    {
      icon: <BedDouble size={26} />,
      title: "Patient Management",
      text: "Clean patient profiles and administrative tools for clinical teams.",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Secure Workflows",
      text: "Professional interfaces designed around sensitive healthcare operations.",
    },
  ];

  return (
    <div className="mf-page min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-[#d9e8ef] bg-[#f6fcff] py-16">
          <div className="mf-container">
            <div className="mf-chip mb-5 px-4 py-2">Facilities</div>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <h1 className="max-w-3xl text-4xl font-extrabold text-[#102f45] md:text-5xl">
                  Complete digital support for modern healthcare services.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#607385]">
                  MEDI FLOW connects the important parts of care delivery so
                  patients and staff move through each step with confidence.
                </p>
              </div>
              <div className="mf-card p-6">
                <div className="mb-3 flex items-center gap-3 text-[#24a67a]">
                  <Timer size={24} />
                  <span className="font-extrabold">Always available</span>
                </div>
                <p className="m-0 leading-7 text-[#607385]">
                  Appointment, pharmacy, report, and doctor workflows are
                  organized for everyday hospital operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mf-container py-16">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <div key={facility.title} className="mf-card p-7">
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-[#e8f6ff] text-[#0f7fbf]">
                  {facility.icon}
                </span>
                <h2 className="text-xl font-extrabold text-[#102f45]">
                  {facility.title}
                </h2>
                <p className="mt-3 leading-7 text-[#607385]">{facility.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mf-container grid gap-8 rounded-3xl border border-[#d9e8ef] bg-[#f6fcff] p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="grid h-32 w-32 place-items-center rounded-3xl bg-white text-[#0f7fbf] shadow-lg">
              <HeartPulse size={58} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#102f45]">
                Designed to feel trustworthy for patients and practical for staff.
              </h2>
              <p className="mt-4 leading-8 text-[#607385]">
                The system focuses on clarity, security, and smooth handoffs
                rather than unnecessary decoration.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default OurFacilities;
