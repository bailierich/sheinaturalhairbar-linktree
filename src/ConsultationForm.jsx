import { useState } from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";
import CustomAlert from "./components/CustomAlert.jsx";
import {
  validateRequired,
  validateMinLength,
  validateFileSize,
  validateFileType,
} from "./utils/validation.js";

// Initialize Airtable
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base("appaHFXQJquxvopY1");

export default function ConsultationForm() {
  const [form, setForm] = useState({
    fullName: "",
    date: "",
    hairJourney: "",
    regimen: "",
    lastTrim: "",
    products: "",
    shampooFrequency: "",
    hairType: "",
    relaxer: "",
    colorTreated: "",
    scalpCondition: "",
    goodDiet: "",
    medicalConditions: "",
    medicalDetails: "",
    image: null,
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
    const requiredFields = {
      fullName: "Full Name",
      hairJourney: "Hair Journey",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      const error = validateRequired(form[field], label);
      if (error) newErrors[field] = error;
    });

    // Hair journey minimum length
    const journeyError = validateMinLength(
      form.hairJourney,
      "Hair Journey",
      10
    );
    if (journeyError) newErrors.hairJourney = journeyError;

    // File validation
    if (form.image) {
      const fileSizeError = validateFileSize(form.image, 5);
      if (fileSizeError) newErrors.image = fileSizeError;

      const fileTypeError = validateFileType(form.image);
      if (fileTypeError) newErrors.image = fileTypeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
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

    let imageUrl = "";
    if (form.image) {
      const imageData = new FormData();
      imageData.append("image", form.image);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const uploadJson = await uploadRes.json();
      imageUrl = uploadJson.data.url;
    }

    const airtableData = {
      "Full Name": form.fullName,
      Date: form.date,
      "Hair Journey": form.hairJourney,
      Regimen: form.regimen,
      "Last Trim": form.lastTrim,
      "Products Used": form.products,
      "Shampoo Frequency": form.shampooFrequency,
      "Hair Type": form.hairType,
      Relaxer: form.relaxer,
      "Color Treated": form.colorTreated,
      "Scalp Condition": form.scalpCondition,
      "Good Diet": form.goodDiet,
      "Medical Conditions": form.medicalConditions,
      "Medical Details": form.medicalDetails,
      "Photo Upload": imageUrl ? [{ url: imageUrl }] : [],
    };

    try {
      await base("Consultations").create([
        {
          fields: airtableData,
        },
      ]);
      setAlert({
        isOpen: true,
        message: "Form submitted successfully!",
        type: "success",
      });
      // Reset form
      setForm({
        fullName: "",
        date: "",
        hairJourney: "",
        regimen: "",
        lastTrim: "",
        products: "",
        shampooFrequency: "",
        hairType: "",
        relaxer: "",
        colorTreated: "",
        scalpCondition: "",
        goodDiet: "",
        medicalConditions: "",
        medicalDetails: "",
        image: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlert({
        isOpen: true,
        message: "There was an error submitting the form. Please try again.",
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
              Consultation Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  Tell me about your hair journey and goals *
                </label>
                <textarea
                  name="hairJourney"
                  placeholder="Share your hair journey, current concerns, and goals..."
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                />
                {errors.hairJourney && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hairJourney}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  Do you have a hair regimen?
                </label>
                <textarea
                  name="regimen"
                  placeholder="Describe your current hair care routine..."
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                    When was your last trim?
                  </label>
                  <input
                    name="lastTrim"
                    placeholder="e.g., 3 months ago"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                    How often do you shampoo your hair?
                  </label>
                  <input
                    name="shampooFrequency"
                    placeholder="e.g., Once a week"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Hair Type Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                    What is your hair type?
                  </label>
                  <select
                    name="hairType"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  >
                    <option value="">Select your hair type</option>
                    <option value="Type 1 - Straight">Type 1 - Straight</option>
                    <option value="Type 2A - Wavy (Fine)">
                      Type 2A - Wavy (Fine)
                    </option>
                    <option value="Type 2B - Wavy (Medium)">
                      Type 2B - Wavy (Medium)
                    </option>
                    <option value="Type 2C - Wavy (Coarse)">
                      Type 2C - Wavy (Coarse)
                    </option>
                    <option value="Type 3A - Curly (Loose)">
                      Type 3A - Curly (Loose)
                    </option>
                    <option value="Type 3B - Curly (Medium)">
                      Type 3B - Curly (Medium)
                    </option>
                    <option value="Type 3C - Curly (Tight)">
                      Type 3C - Curly (Tight)
                    </option>
                    <option value="Type 4A - Coily (Loose)">
                      Type 4A - Coily (Loose)
                    </option>
                    <option value="Type 4B - Coily (Medium)">
                      Type 4B - Coily (Medium)
                    </option>
                    <option value="Type 4C - Coily (Tight)">
                      Type 4C - Coily (Tight)
                    </option>
                  </select>
                </div>

                {/* Hair Type Reference Image */}
                <div className="text-center">
                  <img
                    src="/hairtype.png"
                    alt="Hair Type Reference Chart"
                    className="w-full max-w-md h-auto mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-xs text-[#2D2D2D]/60 mt-2">
                    Use this chart to help identify your hair type
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  What products are you currently using?
                </label>
                <textarea
                  name="products"
                  placeholder="List your current hair products..."
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "relaxer", label: "Do you use relaxer?" },
                  { key: "colorTreated", label: "Is your hair color treated?" },
                  { key: "scalpCondition", label: "Any scalp conditions?" },
                  { key: "goodDiet", label: "Do you maintain a good diet?" },
                  {
                    key: "medicalConditions",
                    label: "Any medical conditions?",
                  },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                      {label}
                    </label>
                    <select
                      name={key}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>

              {form.medicalConditions === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                    Please provide medical details
                  </label>
                  <textarea
                    name="medicalDetails"
                    placeholder="Please describe any medical conditions that may affect your hair..."
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D]/80 mb-2">
                  Upload a photo (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A4A32] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3A4A32] file:text-white hover:file:bg-[#2D2D2D]"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#3A4A32]/90 to-[#3A4A32]/80 hover:from-[#3A4A32] hover:to-[#3A4A32]/90 text-white/90 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Consultation Form"}
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
