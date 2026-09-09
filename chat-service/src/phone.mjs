export function normalizePhone(value) {
  if (typeof value !== 'string' || value.length > 40) return null;
  const phone = value.trim().replace(/[\s().-]/g, '').replace(/^00/, '+');
  return /^\+[1-9]\d{7,14}$/.test(phone) ? phone : null;
}
