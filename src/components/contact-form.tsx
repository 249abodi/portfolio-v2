"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Close } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_RE.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  }

  function reset() {
    setStatus("idle");
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const body = new URLSearchParams();
      body.append("form-name", "contact");
      body.append("name", name.trim());
      body.append("email", email.trim());
      body.append("message", message.trim());

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
          <Check size={24} className="text-accent" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-fg">
          Message sent successfully!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Thanks for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-medium text-accent underline-offset-4 transition-colors duration-200 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-sunken">
          <Close size={24} className="text-fg-muted" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-fg">
          Something went wrong.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border border-border bg-surface-sunken px-4 py-3 text-sm text-fg placeholder:text-fg-faint transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)]";

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />

      <p className="sr-only">
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="mono-label mb-2 block text-fg-muted">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={inputBase}
          />
          {errors.name ? (
            <p id="error-name" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mono-label mb-2 block text-fg-muted">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={inputBase}
          />
          {errors.email ? (
            <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-message" className="mono-label mb-2 block text-fg-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me a little about your project or idea..."
            required
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearError("message");
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
            className={`${inputBase} resize-y min-h-[120px]`}
          />
          {errors.message ? (
            <p id="error-message" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.message}
            </p>
          ) : null}
        </div>

        <Magnetic className="block w-full sm:inline-block">
          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent-solid px-7 text-sm font-semibold text-accent-contrast shadow-glow transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:px-8"
          >
            {status === "loading" ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                  aria-hidden
                />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
