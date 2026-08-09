import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { HeartPulse, ShieldCheck } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#17324d",
        iconColor: "#24a67a",
        customClass: {
          popup: "swal2-rounded",
        },
      });

      setTimeout(() => {
        const adminEmails = [
          "useradmin@gmail.com",
          "pharmacyadmin@gmail.com",
          "doctoradmin@gmail.com",
          "appointmentadmin@gmail.com",
        ];

        if (adminEmails.includes(formData.email)) {
          if (formData.email === "useradmin@gmail.com") {
            navigate("/User-Dashboard");
          } else if (formData.email === "pharmacyadmin@gmail.com") {
            navigate("/Pharmacy-Dashboard");
          } else if (formData.email === "doctoradmin@gmail.com") {
            navigate("/Doctor-Dashboard");
          } else if (formData.email === "appointmentadmin@gmail.com") {
            navigate("/Appointment-Dashboard");
          }
        } else {
          navigate("/");
        }
      }, 2200);
    } catch (requestError) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text:
          requestError.response?.data?.message ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6fcff]">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
        <section className="hidden lg:block">
          <div className="mb-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e8f6ff] text-[#0f7fbf] ring-1 ring-[#cfe7f1]">
              <HeartPulse size={27} />
            </span>
            <div>
              <h1 className="m-0 text-2xl font-extrabold text-[#102f45]">MEDI FLOW</h1>
              <p className="m-0 text-sm font-bold uppercase tracking-[0.18em] text-[#607385]">
                Secure access
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[#d9e8ef] bg-white p-4 shadow-2xl shadow-slate-900/8">
            <img
              src="/Home1.jpg"
              alt="Healthcare professionals"
              className="h-[430px] w-full rounded-3xl object-cover"
            />
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#d9e8ef] bg-white p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e8f8f2] text-[#24a67a]">
              <ShieldCheck size={23} />
            </span>
            <p className="m-0 leading-7 text-[#607385]">
              Access patient, doctor, pharmacy, and appointment workspaces from
              one secure healthcare management system.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-3xl border border-[#d9e8ef] bg-white p-6 shadow-xl shadow-slate-900/8 md:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#e8f6ff] text-[#0f7fbf] lg:hidden">
              <HeartPulse size={30} />
            </div>
            <h2 className="m-0 text-3xl font-extrabold text-[#102f45]">Welcome back</h2>
            <p className="m-0 mt-2 text-sm leading-6 text-[#607385]">
              Sign in to continue to your MEDI FLOW workspace.
            </p>
          </div>

          {error && (
            <p className="mb-4 rounded-xl bg-red-50 p-3 text-center text-sm font-bold text-red-600">
              {error}
            </p>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.4, borderRadius: 2, fontWeight: 800 }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            <div className="flex items-center justify-between gap-3">
              <Button
                color="primary"
                onClick={() => navigate("/forgot-password")}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Forgot Password?
              </Button>
              <Button
                color="primary"
                onClick={() => navigate("/registration")}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Create Account
              </Button>
            </div>
          </Box>
        </section>
      </div>
    </main>
  );
}

export default Login;
