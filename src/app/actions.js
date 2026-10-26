"use server";

import { validateContact } from "@/lib/validation";

const read = (formData, key) => String(formData.get(key) ?? "").trim();

/**
 * Contact form handler (React `useActionState` signature).
 *
 * Delivery goes to CONTACT_FORM_ENDPOINT, any service that accepts a JSON POST
 * (Formspree, Basin, a webhook, ...). Until that variable is set the action
 * answers `unconfigured`, and the form falls back to a prefilled mailto link
 * instead of pretending the message was sent.
 */
export async function sendMessage(_previousState, formData) {
  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "company")) return { status: "success" };

  const values = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return { status: "unconfigured", values };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...values, _subject: `Portfolio message from ${values.name}` }),
    });
    if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);
    return { status: "success" };
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return { status: "error", values };
  }
}
