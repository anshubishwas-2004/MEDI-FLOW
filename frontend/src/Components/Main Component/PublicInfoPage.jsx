import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  HelpCircle,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const pageContent = {
  "/request-consultation": {
    eyebrow: "Consultation",
    title: "Request a guided healthcare consultation.",
    description:
      "Share your concern and our care coordination team will help route you to the right workflow, doctor, or service.",
    icon: <Stethoscope size={34} />,
    actions: [
      { label: "Book appointment", path: "/Book-Appointment", primary: true },
      { label: "Contact us", path: "/Contact-Us" },
    ],
    cards: [
      "Select the right department",
      "Prepare patient details before the visit",
      "Coordinate doctor and pharmacy follow-up",
    ],
  },
  "/online-results": {
    eyebrow: "Online results",
    title: "Access reports and follow-up information securely.",
    description:
      "Patients can keep medical reports organized while teams manage documentation through the report workflow.",
    icon: <FileText size={34} />,
    actions: [
      { label: "View account", path: "/User-Account", primary: true },
      { label: "Contact records team", path: "/Contact-Us" },
    ],
    cards: [
      "Medical report uploads",
      "Patient profile access",
      "Clear follow-up documentation",
    ],
  },
  "/Privacy-Policy": {
    eyebrow: "Privacy",
    title: "Healthcare data should feel protected and understandable.",
    description:
      "MEDI FLOW is designed around careful data handling, clear forms, and secure access patterns for sensitive health information.",
    icon: <LockKeyhole size={34} />,
    actions: [{ label: "Contact support", path: "/Contact-Us", primary: true }],
    cards: [
      "Sensitive information is handled through structured workflows",
      "Patient account access is separated from staff workspaces",
      "Operational data is stored in the existing MongoDB-backed system",
    ],
  },
  "/FAQ": {
    eyebrow: "FAQ",
    title: "Answers for patients and healthcare staff.",
    description:
      "Quick guidance for booking, account access, doctor workflows, pharmacy stock, and medical reports.",
    icon: <HelpCircle size={34} />,
    actions: [
      { label: "Book appointment", path: "/Book-Appointment", primary: true },
      { label: "Send a question", path: "/Contact-Us" },
    ],
    cards: [
      "Can I book an appointment online? Yes, use the appointment workflow.",
      "Can doctors manage diagnosis records? Yes, through the doctor workspace.",
      "Can pharmacy staff track inventory? Yes, through pharmacy dashboards.",
    ],
  },
  "/Blog": {
    eyebrow: "Health resources",
    title: "Practical updates for digital healthcare teams.",
    description:
      "A clean resource area for patient guidance, operational updates, and healthcare technology notes.",
    icon: <ClipboardCheck size={34} />,
    actions: [{ label: "Explore facilities", path: "/Our-Facilities", primary: true }],
    cards: [
      "Patient preparation tips",
      "Pharmacy stock safety practices",
      "Digital care coordination updates",
    ],
  },
  "/Help": {
    eyebrow: "Help center",
    title: "Get support for MEDI FLOW workflows.",
    description:
      "Find help for login, appointment booking, report access, pharmacy tasks, and admin dashboard navigation.",
    icon: <MessageCircle size={34} />,
    actions: [{ label: "Contact support", path: "/Contact-Us", primary: true }],
    cards: [
      "Account and login support",
      "Appointment workflow support",
      "Dashboard and reporting support",
    ],
  },
};

function PublicInfoPage({ pageKey }) {
  const content = pageContent[pageKey] || pageContent["/FAQ"];

  return (
    <div className="mf-page min-h-screen">
      <Nav />
      <main>
        <section className="border-b border-[#d9e8ef] bg-[#f6fcff] py-16">
          <div className="mf-container grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <div className="mf-chip mb-5 px-4 py-2">{content.eyebrow}</div>
              <h1 className="max-w-3xl text-4xl font-extrabold text-[#102f45] md:text-5xl">
                {content.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#607385]">
                {content.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {content.actions.map((action) => (
                  <Link
                    key={action.path}
                    to={action.path}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold ${
                      action.primary
                        ? "bg-[#0f7fbf] text-white hover:bg-[#0d6fa8]"
                        : "border border-[#b7ddea] bg-white text-[#17324d] hover:text-[#0f7fbf]"
                    }`}
                  >
                    {action.label}
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mf-card p-8">
              <span className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[#e8f6ff] text-[#0f7fbf]">
                {content.icon}
              </span>
              <div className="grid gap-4">
                {content.cards.map((card) => (
                  <div key={card} className="flex gap-3 rounded-2xl border border-[#d9e8ef] bg-[#f8fcfd] p-4">
                    <ShieldCheck className="mt-0.5 shrink-0 text-[#24a67a]" size={18} />
                    <span className="font-semibold leading-6 text-[#17324d]">{card}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mf-container py-14">
          <div className="rounded-3xl border border-[#d9e8ef] bg-white p-8 shadow-lg shadow-slate-900/5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="m-0 text-2xl font-extrabold text-[#102f45]">
                  Need direct assistance?
                </h2>
                <p className="m-0 mt-2 text-[#607385]">
                  The care coordination team can help you choose the right next step.
                </p>
              </div>
              <Link
                to="/Contact-Us"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24a67a] px-6 py-3 font-bold text-white hover:bg-[#16845f]"
              >
                <CalendarCheck size={18} />
                Request help
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PublicInfoPage;
