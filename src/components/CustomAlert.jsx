import { Link } from "react-router-dom";

export default function CustomAlert({
  isOpen,
  onClose,
  message,
  type = "success",
}) {
  if (!isOpen) return null;

  const bgColor = type === "success" ? "#3A4A32" : "#dc2626";
  const iconColor = type === "success" ? "#10b981" : "#ef4444";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
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

        <div className="relative z-10 text-center">
          {/* Success Icon */}
          <div
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${bgColor}20` }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: iconColor }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {type === "success" ? (
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </div>

          {/* Message */}
          <h3 className="text-2xl font-semibold text-[#2D2D2D]/90 mb-4">
            {type === "success" ? "Success!" : "Error"}
          </h3>
          <p className="text-[#2D2D2D]/80 mb-8 leading-relaxed">{message}</p>

          {/* Buttons */}
          <div className="space-y-3">
            {type === "success" ? (
              <Link
                to="/"
                className="block w-full bg-gradient-to-r from-[#3A4A32]/90 to-[#3A4A32]/80 hover:from-[#3A4A32] hover:to-[#3A4A32]/90 text-white/90 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Return to Home
              </Link>
            ) : (
              <button
                onClick={onClose}
                className="block w-full bg-gradient-to-r from-[#dc2626]/90 to-[#dc2626]/80 hover:from-[#dc2626] hover:to-[#dc2626]/90 text-white/90 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
