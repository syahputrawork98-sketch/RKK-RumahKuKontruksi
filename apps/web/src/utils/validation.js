export function validateIdentifier(input) {
  const trimmed = (input || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email atau nomor telepon wajib diisi.' };
  }

  // Basic email structure check
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  if (isEmail) {
    return { isValid: true, type: 'email', value: trimmed };
  }

  // Phone number check: allows +, -, (), spaces and digits
  const isPhoneChars = /^[\d\s+\-()]+$/.test(trimmed);
  if (isPhoneChars) {
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
      return { isValid: true, type: 'phone', value: trimmed };
    }
  }

  return { isValid: false, error: 'Masukkan email atau nomor telepon yang valid.' };
}
