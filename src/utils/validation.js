// Validation utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";

  // Remove all non-digit characters except + for international numbers
  const cleanedPhone = phone.replace(/[^\d+]/g, "");

  // Check if it's a valid US phone number format (10 digits)
  const usPhoneRegex =
    /^(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

  // Check if it's a valid international format with country code
  const internationalRegex = /^\+[1-9]\d{6,14}$/;

  // Check if it's just digits (10-15 digits)
  const digitsOnlyRegex = /^\d{10,15}$/;

  if (
    usPhoneRegex.test(phone) ||
    internationalRegex.test(cleanedPhone) ||
    digitsOnlyRegex.test(cleanedPhone)
  ) {
    return null;
  }

  return "Please enter a valid phone number (e.g., 123-456-7890, +1234567890, or 1234567890)";
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, fieldName, minLength) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateDate = (date) => {
  if (!date) return "Date is required";

  // Convert both dates to YYYY-MM-DD format for reliable comparison
  const selectedDateStr = date; // date input is already in YYYY-MM-DD format

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // Get YYYY-MM-DD format

  if (selectedDateStr < todayStr) {
    return "Date cannot be in the past";
  }
  return null;
};

export const validateFileSize = (file, maxSizeMB = 5) => {
  if (!file) return null;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  return null;
};

export const validateFileType = (
  file,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
) => {
  if (!file) return null;
  if (!allowedTypes.includes(file.type)) {
    return "Please upload a valid image file (JPEG, PNG, JPG)";
  }
  return null;
};
