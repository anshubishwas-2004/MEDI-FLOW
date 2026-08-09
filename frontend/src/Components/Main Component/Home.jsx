import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  HeartPulse,
  Hospital,
  LockKeyhole,
  MessageCircle,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";

function Home() {
  const stats = [
    { value: "24/7", label: "Patient access" },
    { value: "500+", label: "Doctors and staff" },
    { value: "15k+", label: "Active patient records" },
    { value: "98%", label: "Care satisfaction" },
  ];

  const services = [
    {
      icon: <CalendarCheck size={24} />,
      title: "Appointments",
      text: "Schedule, review, and manage visits with a clean receptionist workflow.",
      path: "/Book-Appointment",
    },
    {
      icon: <Stethoscope size={24} />,
      title: "Doctor Portal",
      text: "Doctors can view appointments, diagnosis history, and leave activity.",
      path: "/Find-Doctor",
    },
    {
      icon: <Pill size={24} />,
      title: "Pharmacy Control",
      text: "Track stock, prescription orders, and inventory analytics in one place.",
      path: "/Pharmacy-Dashboard",
    },
    {
      icon: <Activity size={24} />,
      title: "Health Insights",
      text: "Support better decisions with vitals, symptom analysis, and trend views.",
      path: "/symptom-analysis",
    },
  ];

  const workflow = [
    "Patient registration and secure profile creation",
    "Appointment booking with department routing",
    "Doctor diagnosis, prescriptions, and reports",
    "Pharmacy stock tracking and order fulfillment",
  ];

  return (
    <div className="mf-page min-h-screen">
      <Nav />

      <main>
        <section className="relative overflow-hidden border-b border-[#d9e8ef] bg-[#f6fcff]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f7fbf] via-[#3bb9d6] to-[#24a67a]" />
          <div className="mf-container grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
            <div>
              <div className="mf-chip mb-5 px-4 py-2">Secure hospital management</div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#102f45] md:text-6xl">
                Healthcare operations that feel calm, connected, and reliable.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#607385]">
                MEDI FLOW brings patient care, appointments, doctor workflows,
                pharmacy inventory, and health analytics into one professional
                management system built for everyday clinical use.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/Book-Appointment"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0f7fbf] px-6 py-3 font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-[#0d6fa8]"
                >
                  Book appointment
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/symptom-analysis"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#b7ddea] bg-white px-6 py-3 font-bold text-[#17324d] hover:border-[#0f7fbf] hover:text-[#0f7fbf]"
                >
                  Try health analysis
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="mf-card p-4">
                    <div className="text-2xl font-extrabold text-[#0f7fbf]">{stat.value}</div>
                    <div className="mt-1 text-sm font-semibold text-[#607385]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-6 top-6 h-48 w-48 rounded-full bg-[#bdeee0]/50 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-4 shadow-2xl shadow-slate-900/10">
                <img
                  src="/Home1.jpg"
                  alt="Healthcare professionals providing care"
                  className="h-[420px] w-full rounded-3xl object-cover"
                />
                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/70 bg-white/92 p-5 shadow-xl backdrop-blur">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e8f8f2] text-[#24a67a]">
                      <ShieldCheck size={25} />
                    </span>
                    <div>
                      <p className="m-0 text-sm font-bold uppercase tracking-[0.14em] text-[#0f7fbf]">
                        Trusted care platform
                      </p>
                      <p className="m-0 mt-1 text-sm leading-6 text-[#607385]">
                        Structured workflows, clean records, and safer handoffs
                        between reception, doctors, and pharmacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mf-container py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mf-chip mb-4 px-4 py-2">Core modules</div>
              <h2 className="text-3xl font-extrabold text-[#102f45] md:text-4xl">
                One connected system for daily healthcare work
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#607385]">
              Designed for fast scanning, lower friction, and clear operational
              ownership across departments.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className="mf-card group block p-6 hover:-translate-y-1 hover:border-[#9ed8e7]"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#e8f6ff] text-[#0f7fbf] group-hover:bg-[#e8f8f2] group-hover:text-[#24a67a]">
                  {service.icon}
                </span>
                <h3 className="text-lg font-extrabold text-[#102f45]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#607385]">{service.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f7fbf]">
                  Open module <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d9e8ef] bg-white">
          <div className="mf-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-[#d9e8ef] bg-[#f7fbfc] p-4 shadow-lg shadow-slate-900/5">
              <img
                src="/Home2.jpg"
                alt="Doctor reviewing patient information"
                className="h-[430px] w-full rounded-2xl object-cover"
              />
            </div>

            <div>
              <div className="mf-chip mb-4 px-4 py-2">Clinical workflow</div>
              <h2 className="text-3xl font-extrabold text-[#102f45] md:text-4xl">
                Built around the actual patient journey
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#607385]">
                The interface supports the path from registration to appointment,
                diagnosis, prescription, pharmacy fulfillment, and patient follow-up.
              </p>

              <div className="mt-8 grid gap-4">
                {workflow.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-2xl border border-[#d9e8ef] bg-[#f8fcfd] p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f8f2] text-sm font-extrabold text-[#16845f]">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#17324d]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mf-container py-16">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="mf-card p-7">
              <LockKeyhole className="mb-5 text-[#0f7fbf]" size={30} />
              <h3 className="text-xl font-extrabold text-[#102f45]">Security-first records</h3>
              <p className="mt-3 leading-7 text-[#607385]">
                Clear access flows, structured patient information, and safer
                administrative screens for sensitive healthcare data.
              </p>
            </div>
            <div className="mf-card p-7">
              <ClipboardList className="mb-5 text-[#24a67a]" size={30} />
              <h3 className="text-xl font-extrabold text-[#102f45]">Operational clarity</h3>
              <p className="mt-3 leading-7 text-[#607385]">
                Dashboards, tables, forms, and reports are styled for repeat use,
                not decoration, with readable spacing and contrast.
              </p>
            </div>
            <div className="mf-card p-7">
              <UsersRound className="mb-5 text-[#0f7fbf]" size={30} />
              <h3 className="text-xl font-extrabold text-[#102f45]">Role-based experience</h3>
              <p className="mt-3 leading-7 text-[#607385]">
                Patients, doctors, pharmacy staff, receptionists, and admins each
                get a workspace that matches their responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#e8f6ff] py-16">
          <div className="mf-container grid gap-8 rounded-3xl border border-[#cfe7f1] bg-white p-8 shadow-xl shadow-slate-900/5 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="mf-chip mb-4 px-4 py-2">Ready when you are</div>
              <h2 className="text-3xl font-extrabold text-[#102f45]">
                Start with appointments, then scale into a complete hospital workflow.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#607385]">
                Keep the public experience simple while giving administrators the
                structured tools they need behind the scenes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
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
                <MessageCircle size={18} />
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
