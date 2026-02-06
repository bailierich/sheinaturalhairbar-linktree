import { useState } from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";
import CustomAlert from "./components/CustomAlert.jsx";
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from "./utils/validation.js";

// Initialize Airtable
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base("appaHFXQJquxvopY1");

export default function RegularClientSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alert, setAlert] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const nameError = validateRequired(form.name, "Full Name");
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(form.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlert({
        isOpen: true,
        message: "Please fix the errors in the form before submitting.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    const airtableData = {
      "Full Name": form.name,
      Email: form.email,
      "Phone Number": form.phone,
    };

    try {
      await base("Regular Client Signup").create([
        {
          fields: airtableData,
        },
      ]);
      setAlert({
        isOpen: true,
        message: "You've been added to the regular client notification list!",
        type: "success",
      });
      setForm({ name: "", email: "", phone: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding to regular client notification list:", error);
      setAlert({
        isOpen: true,
        message:
          "There was an error adding you to the regular client notification list. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/bg-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Header Image - Full Width */}
      <div className="w-full relative">
        <Link
          to="/"
          className="absolute top-4 left-4 z-10 text-white hover:text-gray-200 transition-colors duration-300 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          ← Back to Home
        </Link>
        <img
          src="/headerimg.png"
          alt="Shei Natural Header"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div
          className="rounded-2xl shadow-xl p-8 relative overflow-hidden"
          style={{ backgroundColor: "#e7e4d9" }}
        >
          {/* Card Background - matching main page */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 0% 0%, rgba(58, 74, 50, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 100% 0%, rgba(58, 74, 50, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 100% 100%, rgba(58, 74, 50, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 0% 100%, rgba(58, 74, 50, 0.1) 0%, transparent 50%),
                  #e7e4d9
                `,
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-center text-[#2D2D2D]/90 mb-8">
              Join the Regular Client Notification List
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  Your Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  Your Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g., 123-456-7890 or +1234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
                <p className="text-xs text-[#2D2D2D]/60 mt-1">
                  Enter your phone number with or without formatting
                </p>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3A4A32]/90 to-[#3A4A32]/80 hover:from-[#3A4A32] hover:to-[#3A4A32]/90 text-white/90 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Me to the List"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CustomAlert
        isOpen={alert.isOpen}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ ...alert, isOpen: false })}
      />
    </div>
  );
}
