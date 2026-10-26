"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { CircleAlert, CircleCheck, Info, LoaderCircle, Lock, Send } from "lucide-react";
import { sendMessage } from "@/app/actions";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { LIMITS, validateContact, validateField } from "@/lib/validation";

const fieldClasses =
  "w-full rounded-md bg-white/[0.06] px-4 py-3.5 text-paper placeholder:text-paper/35 ring-1 " +
  "transition duration-200 hover:bg-white/[0.08] focus:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2";

const fieldTones = {
  valid: "ring-white/10 focus-visible:ring-lime",
  invalid: "ring-danger-light/70 focus-visible:ring-danger-light",
};

/** Label on the left, optional aside (e.g. a character count) on the right, error below the control. */
function Field({ id, label, aside, error, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-paper/60">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger-light">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          Sending&hellip;
        </>
      ) : (
        <>
          Send message
          <Send aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </>
      )}
    </Button>
  );
}

function mailtoHref({ name = "", message = "" }) {
  const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
  const body = encodeURIComponent(message);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

const banners = {
  success: {
    icon: CircleCheck,
    tone: "border-lime/30 bg-lime/10 text-lime",
    title: "Message sent",
    text: () => "Thanks for reaching out. Your message is on its way and I'll reply by email.",
  },
  error: {
    icon: CircleAlert,
    tone: "border-danger-light/30 bg-danger-light/10 text-danger-light",
    title: "Message not sent",
    text: () => "Something went wrong on my end. Please try again in a moment.",
  },
  unconfigured: {
    icon: Info,
    tone: "border-azure-light/30 bg-azure-light/10 text-azure-light",
    title: "This form isn’t connected to an inbox yet",
    text: (state) => (
      <>
        <a href={mailtoHref(state.values)} className="font-semibold underline underline-offset-2">
          Send it from your email app instead
        </a>{" "}
        and your message will be prefilled.
      </>
    ),
  },
};

export default function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, { status: "idle" });
  const [local, setLocal] = useState({ source: state, errors: {} });
  const [messageLength, setMessageLength] = useState(state.values?.message?.length ?? 0);

  // Adopt server-side errors whenever a new action result arrives.
  let errors = local.errors;
  if (local.source !== state) {
    errors = state.errors ?? {};
    setLocal({ source: state, errors });
  }

  const setFieldError = (name, message) =>
    setLocal((current) => ({ ...current, errors: { ...current.errors, [name]: message } }));

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldError(name, validateField(name, value));
  };

  // Once a field shows an error, re-check it as the visitor types so it clears right away.
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "message") setMessageLength(value.length);
    if (errors[name]) setFieldError(name, validateField(name, value));
  };

  const handleSubmit = (event) => {
    const found = validateContact(Object.fromEntries(new FormData(event.currentTarget)));
    const [firstInvalid] = Object.keys(found);
    if (!firstInvalid) return;

    event.preventDefault();
    setLocal((current) => ({ ...current, errors: found }));
    event.currentTarget.elements[firstInvalid]?.focus();
  };

  const field = (name) => ({
    id: `contact-${name}`,
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: cn(fieldClasses, errors[name] ? fieldTones.invalid : fieldTones.valid),
  });

  const banner = banners[state.status];

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={errors.name}>
          <input type="text" autoComplete="name" maxLength={LIMITS.name} placeholder="Jane Doe" {...field("name")} />
        </Field>

        <Field id="contact-email" label="Email address" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            placeholder="jane@company.com"
            {...field("email")}
          />
        </Field>
      </div>

      <Field
        id="contact-message"
        label="How can I help?"
        error={errors.message}
        aside={
          <span
            aria-hidden="true"
            className={cn(
              "font-mono text-xs tabular-nums transition-colors duration-200",
              messageLength > LIMITS.message * 0.9 ? "text-danger-light" : "text-paper/60",
            )}
          >
            {messageLength}/{LIMITS.message}
          </span>
        }
      >
        <textarea
          rows={5}
          maxLength={LIMITS.message}
          placeholder="Tell me a little about your project, timeline or idea."
          {...field("message")}
          className={cn(field("message").className, "resize-none")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-4">
        <SubmitButton />
        <p className="flex items-center justify-center gap-2 text-sm text-paper/60">
          <Lock aria-hidden="true" className="size-4 shrink-0" />
          Only used to reply to your message.
        </p>
        <div role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {banner ? (
              <m.div
                key={state.status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex items-start gap-3 rounded-control border px-4 py-3.5 text-sm", banner.tone)}
              >
                <banner.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <p>
                  <strong className="block font-semibold">{banner.title}</strong>
                  <span className="font-medium">{banner.text(state)}</span>
                </p>
              </m.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
