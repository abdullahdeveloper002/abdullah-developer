/** Shared by the contact form (instant feedback) and the server action (trust boundary). */
export const LIMITS = { name: 80, email: 120, message: 2000, messageMin: 10 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field, rawValue) {
  const value = String(rawValue ?? "").trim();

  switch (field) {
    case "name":
      if (!value) return "Please tell me your name.";
      if (value.length > LIMITS.name) return `Keep your name under ${LIMITS.name} characters.`;
      return null;
    case "email":
      if (!value) return "I need an email address to reply to.";
      if (value.length > LIMITS.email || !EMAIL_PATTERN.test(value))
        return "That email address doesn't look right.";
      return null;
    case "message":
      if (!value) return "Write a few words about what you have in mind.";
      if (value.length < LIMITS.messageMin)
        return `Add a little more detail (at least ${LIMITS.messageMin} characters).`;
      if (value.length > LIMITS.message) return `Please keep it under ${LIMITS.message} characters.`;
      return null;
    default:
      return null;
  }
}

/** Returns an object of `{ field: message }` for every invalid field. */
export function validateContact(values) {
  const errors = {};
  for (const field of ["name", "email", "message"]) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
