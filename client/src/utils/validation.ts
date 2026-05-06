/**
 * Validasi email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validasi URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validasi nomor telepon Indonesia
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validasi password strength
 * - minimal 8 karakter
 * - harus ada uppercase, lowercase, number, special character
 */
export function isStrongPassword(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password minimal 8 karakter");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Harus mengandung huruf uppercase (A-Z)");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Harus mengandung huruf lowercase (a-z)");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Harus mengandung angka (0-9)");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Harus mengandung karakter spesial (!@#$%^&*)");
  }

  return {
    isStrong: errors.length === 0,
    errors,
  };
}

/**
 * Cek apakah string adalah JSON valid
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}