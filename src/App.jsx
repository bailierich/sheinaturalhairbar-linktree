import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaYoutube, FaEnvelope } from "react-icons/fa";
import ConsultationForm from "./ConsultationForm.jsx";
import WaitlistForm from "./WaitlistForm.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SheiNaturalLinktree />} />
      <Route path="/consultation" element={<ConsultationForm />} />
      <Route path="/waitlist" element={<WaitlistForm />} />
    </Routes>
  );
}

function SheiNaturalLinktree() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{
          type: "spring",
          stiffness: 300,
          duration: 0.8,
        }}
        className="w-full max-w-md rounded-2xl shadow-xl p-8 relative z-10 overflow-hidden"
      >
        {/* Card Background */}
        <div className="absolute inset-0 backdrop-blur-xl">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 0% 0%, rgba(58, 74, 50, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 100% 0%, rgba(58, 74, 50, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(58, 74, 50, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 0% 100%, rgba(58, 74, 50, 0.4) 0%, transparent 50%),
                white
              `,
            }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Logo Area */}
          <div className="relative mb-6 -m-8">
            <motion.img
              src="/headerimg.png"
              alt="Shei Natural Header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-auto relative z-10 rounded-t-2xl"
            />
          </div>

          {/* Business Info */}

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#db6118]/30 to-transparent mx-auto mb-6"></div>

          {/* Social Icons */}
          <div className="flex items-center justify-center space-x-8 text-[#2D2D2D]/90 text-2xl mb-8">
            <motion.a
              href="https://www.instagram.com/sheinaturalhairbar/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="hover:text-[#E1306C] transition-colors duration-300"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@sheinaturalhairbar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="hover:text-[#000000] transition-colors duration-300"
            >
              <FaTiktok />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/channel/UCGC698GDO8nEMyp9_XuJLmQ"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="hover:text-[#FF0000] transition-colors duration-300"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              href="mailto:contactus@sheinaturalhairbar.com"
              whileHover={{ scale: 1.1 }}
              className="hover:text-[#db6118] transition-colors duration-300"
            >
              <FaEnvelope />
            </motion.a>
          </div>

          {/* Link Buttons */}
          <div className="w-full space-y-4">
            <LinkButton
              href="https://sheinaturalhairbar.as.me/schedule/e08fa5bf"
              label="Book An Appointment"
            />
            <LinkButton
              href="https://sheinatural.com/"
              label="Shop Shei Natural"
            />
            <LinkButton
              href="https://www.tiktok.com/@sheinaturalhairbar"
              label="Watch Me On TikTok"
            />
            <LinkButton
              href="https://www.amazon.com/shop/shopiamshei?ref_=cm_sw_r_cp_ud_aipsfshop_aipsfshopiamshei_S7583F5BVCSFAB6VYZZV"
              label="Shop Amazon Must Haves"
            />
            <LinkButton
              href="/waitlist"
              label={`Join ${new Date().toLocaleString("default", {
                month: "long",
              })} Waitlist`}
            />
          </div>

          {/* Footer */}
          <footer className="mt-8 text-sm text-[#2D2D2D]/80 text-center">
            © {new Date().getFullYear()} Shei Natural Hair Bar
          </footer>
        </div>
      </motion.div>
    </div>
  );
}

function LinkButton({ href, label, disabled = false }) {
  return (
    <motion.a
      href={disabled ? undefined : href}
      target={href.startsWith("/") ? undefined : "_blank"}
      rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`block w-full text-center rounded-xl py-4 px-6 text-md font-medium font-body transition-all duration-300 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-[#3A4A32]/90 to-[#3A4A32]/80 hover:from-[#3A4A32] hover:to-[#3A4A32]/90 text-white/90 shadow-lg hover:shadow-xl"
      }`}
    >
      {label}
    </motion.a>
  );
}
