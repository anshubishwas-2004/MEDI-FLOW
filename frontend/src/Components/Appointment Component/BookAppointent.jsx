import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  IdCard,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  UserCircle,
} from "lucide-react";
import Nav from "../Nav Component/Nav";
import Footer from "../Nav Component/Footer";
import { useContactInfo } from "../../services/contactInfo";

const initialForm = {
  name: "",
  address: "",
  nic: "",
  phone: "",
  email: "",
  doctorName: "",
  doctor_id: "",
  specialization: "",
  date: "",
  time: "",
};

const timeSlots = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "09:00 AM - 10:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
];

const normalizePhone = (value) => value.replace(/\s|-/g, "");

function BookAppointment() {
  const navigate = useNavigate();
  const contactInfo = useContactInfo();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [pageError, setPageError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const minDate = new Date().toISOString().split("T")[0];

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor._id === form.doctor_id),
    [doctors, form.doctor_id]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingProfile(false);
      return;
    }

    axios
      .get(`${apiUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserDetails(response.data);
        setForm((previous) => ({
          ...previous,
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.mobile || "",
          address: response.data.city || "",
        }));
      })
      .catch(() => {
        localStorage.removeItem("token");
        setPageError("Your session expired. Please sign in again to book an appointment.");
      })
      .finally(() => setLoadingProfile(false));
  }, [apiUrl]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/doctor/`)
      .then((response) => {
        setDoctors(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setPageError("We could not load the doctor list. Please try again shortly.");
      })
      .finally(() => setLoadingDoctors(false));
  }, [apiUrl]);

  const updateField = (name, value) => {
    setErrors((previous) => ({ ...previous, [name]: "" }));

    if (name === "doctor_id") {
      const doctor = doctors.find((item) => item._id === value);
      setForm((previous) => ({
        ...previous,
        doctor_id: value,
        doctorName: doctor?.name || "",
        specialization: doctor?.specialization || "",
      }));
      return;
    }

    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const validateAppointment = () => {
    const nextErrors = {};

    if (!form.doctor_id) nextErrors.doctor_id = "Choose a doctor.";
    if (!form.specialization) nextErrors.specialization = "Specialization is required.";
    if (!form.date) {
      nextErrors.date = "Choose an appointment date.";
    } else if (new Date(form.date) < new Date(minDate)) {
      nextErrors.date = "Appointment date cannot be in the past.";
    }
    if (!form.time) nextErrors.time = "Choose a time slot.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validatePatient = () => {
    const nextErrors = {};
    const phone = normalizePhone(form.phone);

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required.";
    } else if (!/^[A-Za-z\s.'-]{2,80}$/.test(form.name.trim())) {
      nextErrors.name = "Enter a valid full name.";
    }

    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^(\+91)?[6-9]\d{9}$/.test(phone) && !/^0[6-9]\d{9}$/.test(phone)) {
      nextErrors.phone = "Use a valid Indian mobile number.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.nic.trim()) {
      nextErrors.nic = "National ID is required.";
    } else if (!/^[A-Za-z0-9-]{6,20}$/.test(form.nic.trim())) {
      nextErrors.nic = "Enter a valid ID using 6-20 letters or numbers.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Address is required.";
    } else if (form.address.trim().length < 4 || form.address.trim().length > 90) {
      nextErrors.address = "Address must be 4-90 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateAppointment()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePatient()) {
      Swal.fire({
        icon: "error",
        title: "Please check your details",
        text: "Some patient information is missing or invalid.",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || !userDetails?._id) {
      navigate("/login");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/appoinment`,
        {
          ...form,
          phone: normalizePhone(form.phone),
          user_id: userDetails._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const appointmentId = response.data?.appointment?._id;
      if (appointmentId) {
        try {
          await axios.post(`${apiUrl}/api/appoinment/send-confirmation`, {
            appointmentId,
          });
        } catch {
          // Booking is the primary action; email delivery can be retried by staff.
        }
      }

      await Swal.fire({
        icon: "success",
        title: "Appointment booked",
        text: "Your request has been saved successfully.",
        confirmButtonColor: "#0f7fbf",
      });

      navigate("/Appoinment-Display");
    } catch (requestError) {
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text:
          requestError.response?.data?.message ||
          "We could not book the appointment right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-red-600">
        <AlertCircle size={15} />
        {errors[field]}
      </p>
    ) : null;

  if (loadingProfile || loadingDoctors) {
    return (
      <div className="mf-page min-h-screen">
        <Nav />
        <main className="grid min-h-[70vh] place-items-center px-4">
          <div className="mf-card flex items-center gap-4 p-6">
            <Loader2 className="animate-spin text-[#0f7fbf]" size={28} />
            <div>
              <h1 className="m-0 text-xl font-extrabold text-[#102f45]">
                Preparing appointment booking
              </h1>
              <p className="m-0 mt-1 text-[#607385]">
                Loading your profile and available doctors.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="mf-page min-h-screen">
        <Nav />
        <main className="mf-container grid min-h-[72vh] place-items-center py-16">
          <section className="mf-card max-w-xl p-8 text-center">
            <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#e8f6ff] text-[#0f7fbf]">
              <LockKeyhole size={34} />
            </span>
            <h1 className="text-3xl font-extrabold text-[#102f45]">
              Sign in to book an appointment
            </h1>
            <p className="mt-4 leading-7 text-[#607385]">
              A patient account lets us securely connect your appointment to
              your profile, reports, and follow-up care.
            </p>
            {pageError && (
              <p className="mt-5 rounded-xl bg-red-50 p-4 font-semibold text-red-600">
                {pageError}
              </p>
            )}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f7fbf] px-6 py-3 font-bold text-white hover:bg-[#0d6fa8]"
              >
                <UserCircle size={18} />
                Sign in
              </Link>
              <Link
                to="/registration"
                className="inline-flex items-center gap-2 rounded-xl border border-[#b7ddea] bg-white px-6 py-3 font-bold text-[#17324d] hover:text-[#0f7fbf]"
              >
                Create account
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mf-page min-h-screen">
      <Nav />

      <main>
        <section className="border-b border-[#d9e8ef] bg-[#f6fcff] py-12">
          <div className="mf-container grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <div className="mf-chip mb-5 px-4 py-2">Book appointment</div>
              <h1 className="max-w-3xl text-4xl font-extrabold text-[#102f45] md:text-5xl">
                Schedule care with the right doctor in minutes.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#607385]">
                Choose a specialist, confirm a time slot, and submit your
                patient details securely to the appointment team.
              </p>
            </div>
            <div className="mf-card p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e8f8f2] text-[#24a67a]">
                  <ShieldCheck size={25} />
                </span>
                <div>
                  <h2 className="m-0 text-lg font-extrabold text-[#102f45]">
                    Need help booking?
                  </h2>
                  <p className="m-0 mt-1 text-sm leading-6 text-[#607385]">
                    Call {contactInfo.phone}
                    {contactInfo.email ? ` or email ${contactInfo.email}` : ""}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mf-container grid gap-8 py-12 lg:grid-cols-[0.72fr_1fr]">
          <aside className="space-y-5">
            <div className="mf-card p-6">
              <h2 className="text-xl font-extrabold text-[#102f45]">Booking progress</h2>
              <div className="mt-6 space-y-4">
                {[
                  { number: 1, title: "Appointment", text: "Doctor, date, and time" },
                  { number: 2, title: "Patient details", text: "Identity and contact info" },
                ].map((item) => (
                  <div
                    key={item.number}
                    className={`flex gap-4 rounded-2xl border p-4 ${
                      step === item.number
                        ? "border-[#9ed8e7] bg-[#e8f6ff]"
                        : "border-[#d9e8ef] bg-white"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-extrabold ${
                        step === item.number
                          ? "bg-[#0f7fbf] text-white"
                          : "bg-[#eef6f8] text-[#607385]"
                      }`}
                    >
                      {item.number}
                    </span>
                    <div>
                      <h3 className="m-0 font-extrabold text-[#102f45]">{item.title}</h3>
                      <p className="m-0 mt-1 text-sm text-[#607385]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mf-card p-6">
              <h2 className="text-xl font-extrabold text-[#102f45]">Before you arrive</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#607385]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#24a67a]" size={18} />
                  Arrive 15 minutes before your time slot.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#24a67a]" size={18} />
                  Bring your national ID and any previous reports.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#24a67a]" size={18} />
                  Watch your email for appointment confirmation.
                </li>
              </ul>
            </div>
          </aside>

          <section className="mf-card overflow-hidden">
            <div className="border-b border-[#d9e8ef] bg-white px-6 py-5">
              <h2 className="m-0 flex items-center gap-3 text-2xl font-extrabold text-[#102f45]">
                {step === 1 ? <CalendarCheck className="text-[#0f7fbf]" /> : <UserCircle className="text-[#0f7fbf]" />}
                {step === 1 ? "Choose appointment" : "Confirm patient details"}
              </h2>
              <p className="m-0 mt-2 text-sm text-[#607385]">
                {step === 1
                  ? "Doctor availability is loaded directly from the healthcare database."
                  : "These details will be saved with your appointment record."}
              </p>
            </div>

            <div className="p-6 md:p-8">
              {pageError && (
                <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 font-semibold text-red-600">
                  {pageError}
                </div>
              )}

              {step === 1 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#17324d]">Doctor</span>
                    <div className="relative">
                      <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f7fbf]" size={20} />
                      <select
                        name="doctor_id"
                        value={form.doctor_id}
                        onChange={(event) => updateField("doctor_id", event.target.value)}
                        className="w-full rounded-xl border border-[#cfe7f1] bg-white py-3 pl-12 pr-4 font-semibold text-[#17324d]"
                      >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>
                            {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError("doctor_id")}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#17324d]">Specialization</span>
                    <div className="relative">
                      <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f7fbf]" size={20} />
                      <input
                        value={form.specialization}
                        readOnly
                        placeholder="Selected automatically"
                        className="w-full rounded-xl border border-[#cfe7f1] bg-[#f8fcfd] py-3 pl-12 pr-4 font-semibold text-[#17324d]"
                      />
                    </div>
                    {renderError("specialization")}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#17324d]">Date</span>
                    <div className="relative">
                      <CalendarCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f7fbf]" size={20} />
                      <input
                        type="date"
                        value={form.date}
                        min={minDate}
                        onChange={(event) => updateField("date", event.target.value)}
                        className="w-full rounded-xl border border-[#cfe7f1] bg-white py-3 pl-12 pr-4 font-semibold text-[#17324d]"
                      />
                    </div>
                    {renderError("date")}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#17324d]">Time slot</span>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f7fbf]" size={20} />
                      <select
                        value={form.time}
                        onChange={(event) => updateField("time", event.target.value)}
                        className="w-full rounded-xl border border-[#cfe7f1] bg-white py-3 pl-12 pr-4 font-semibold text-[#17324d]"
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError("time")}
                  </label>

                  {selectedDoctor && (
                    <div className="rounded-2xl border border-[#d9e8ef] bg-[#f8fcfd] p-5 md:col-span-2">
                      <h3 className="m-0 font-extrabold text-[#102f45]">
                        {selectedDoctor.name}
                      </h3>
                      <p className="m-0 mt-1 text-sm text-[#607385]">
                        {selectedDoctor.specialization} | {selectedDoctor.experience || 0} years experience
                      </p>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f7fbf] px-6 py-3 font-extrabold text-white hover:bg-[#0d6fa8]"
                    >
                      Continue to patient details
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                  {[
                    { name: "name", label: "Full name", icon: <UserCircle size={20} />, type: "text" },
                    { name: "phone", label: "Phone number", icon: <PhoneCall size={20} />, type: "tel" },
                    { name: "nic", label: "National ID", icon: <IdCard size={20} />, type: "text" },
                    { name: "email", label: "Email address", icon: <Mail size={20} />, type: "email" },
                  ].map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-2 block text-sm font-bold text-[#17324d]">{field.label}</span>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f7fbf]">
                          {field.icon}
                        </span>
                        <input
                          type={field.type}
                          value={form[field.name]}
                          onChange={(event) => updateField(field.name, event.target.value)}
                          className="w-full rounded-xl border border-[#cfe7f1] bg-white py-3 pl-12 pr-4 font-semibold text-[#17324d]"
                        />
                      </div>
                      {renderError(field.name)}
                    </label>
                  ))}

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-bold text-[#17324d]">Address</span>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-[#0f7fbf]" size={20} />
                      <textarea
                        value={form.address}
                        onChange={(event) => updateField("address", event.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-[#cfe7f1] bg-white py-3 pl-12 pr-4 font-semibold text-[#17324d]"
                      />
                    </div>
                    {renderError("address")}
                  </label>

                  <div className="flex flex-col gap-3 md:col-span-2 md:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#cfe7f1] bg-white px-6 py-3 font-extrabold text-[#17324d] hover:text-[#0f7fbf]"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#24a67a] px-6 py-3 font-extrabold text-white hover:bg-[#16845f] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Booking...
                        </>
                      ) : (
                        <>
                          Book appointment
                          <CheckCircle2 size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default BookAppointment;
