import { useState, type FormEvent } from "react";
import { submitContactForm } from "../lib/formspree";

type Status = "idle" | "submitting" | "success" | "error";

const CONTACT_EMAIL = "pranaysurya4@gmail.com";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setEmailTouched(true);
      return;
    }
    setStatus("submitting");
    try {
      await submitContactForm({ name, email, message });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="reveal is-visible rounded-md bg-accent-soft p-6 text-ink">
        Thanks - I'll reply within 2 business days.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-ink/20 px-3 py-2 transition-colors duration-150 ease-out focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          required
          aria-invalid={emailError}
          aria-describedby={emailError ? "email-error" : undefined}
          className={`mt-1 w-full rounded-md border px-3 py-2 transition-colors duration-150 ease-out ${emailError ? "border-red-600" : "border-ink/20 focus:border-accent"}`}
        />
        {emailError && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            Enter a valid email
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-ink/20 px-3 py-2 transition-colors duration-150 ease-out focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong - email me directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>{" "}
          instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-accent px-6 py-3 font-medium text-cream transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
