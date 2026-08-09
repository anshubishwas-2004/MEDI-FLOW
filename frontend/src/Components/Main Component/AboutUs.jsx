import React from "react";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import {
  Activity,
  ClipboardCheck,
  DatabaseZap,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

function AboutUs() {
  const values = [
    {
      icon: <ShieldCheck size={25} />,
      title: "Trustworthy by design",
      text: "Clear screens, controlled workflows, and careful handling of healthcare information.",
    },
    {
      icon: <ClipboardCheck size={25} />,
      title: "Operational discipline",
      text: "Every module is built around the real work of reception, doctors, pharmacy, and admins.",
    },
    {
      icon: <HeartHandshake size={25} />,
      title: "Patient-centered care",
      text: "The system keeps the patient journey simple while supporting clinical teams behind the scenes.",
    },
  ];

  return (
    <div className="mf-page min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-[#d9e8ef] bg-[#f6fcff] py-16">
          <div className="mf-container grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <div className="mf-chip mb-5 px-4 py-2">About MEDI FLOW</div>
              <h1 className="max-w-3xl text-4xl font-extrabold text-[#102f45] md:text-5xl">
                A healthcare management platform built for clarity, safety, and daily use.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#607385]">
                MEDI FLOW helps healthcare teams coordinate appointments,
                doctors, pharmacy operations, reports, and patient information
                through one connected digital system.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#d9e8ef] bg-white p-4 shadow-xl shadow-slate-900/5">
              <img
                src="/Home2.jpg"
                alt="Healthcare team reviewing patient care"
                className="h-[390px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mf-container py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="mf-card p-7">
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-[#e8f6ff] text-[#0f7fbf]">
                  {value.icon}
                </span>
                <h2 className="text-xl font-extrabold text-[#102f45]">{value.title}</h2>
                <p className="mt-3 leading-7 text-[#607385]">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d9e8ef] bg-white py-16">
          <div className="mf-container grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div>
              <div className="mf-chip mb-4 px-4 py-2">Our approach</div>
              <h2 className="text-3xl font-extrabold text-[#102f45]">
                We focus on professional workflows, not decorative noise.
              </h2>
              <p className="mt-4 leading-8 text-[#607385]">
                A healthcare system must feel dependable. That is why the
                interface uses calm colors, readable layouts, and structured
                modules for common clinical responsibilities.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: <DatabaseZap size={22} />, text: "Centralized patient and operational records" },
                { icon: <Activity size={22} />, text: "Health analysis and trend visibility" },
                { icon: <LockKeyhole size={22} />, text: "Security-conscious form, table, and dashboard design" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4 rounded-2xl border border-[#d9e8ef] bg-[#f8fcfd] p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#24a67a]">
                    {item.icon}
                  </span>
                  <span className="font-bold text-[#17324d]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
