import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SplitText from "../components/SplitText";
import Reveal from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import ContactGrid from "./ContactGrid";
import { openMail } from "../lib/openMail";
import { profile, links } from "../data/site";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", placeholder: "Jane Doe" },
  { name: "email", label: "Email", type: "email", placeholder: "jane@company.com" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Required";
    if (!form.email.trim()) er.email = "Required";
    else if (!EMAIL_RE.test(form.email)) er.email = "Enter a valid email";
    if (!form.message.trim()) er.message = "Tell me a little about it";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("Please complete the highlighted fields.");
      return;
    }
    // Take whatever the visitor filled in and open their mail client with a
    // prefilled message addressed to me. Also copies my address to clipboard,
    // so it still works if no default mail app is set.
    openMail({
      subject: `Project enquiry — ${form.name}`,
      body: `${form.message}\n\n— ${form.name}\n${form.email}`,
    });
    setStatus(`Opening Gmail — or write me at ${profile.email}`);
  };

  return (
    <section
      id="contact"
      data-section
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <ContactGrid />

      <div className="frame relative z-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-meta text-signal">[ 07 ]</span>
          <span className="font-mono text-[11px] uppercase tracking-meta text-ink-dim">
            Contact
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <h2 className="mt-10 font-display text-[13vw] font-medium uppercase leading-[0.9] tracking-tightest text-ink sm:text-[10vw] lg:text-[8vw]">
          <SplitText
            as="span"
            lines={[
              <span key="1">Let's build the</span>,
              <span key="2">
                <span className="font-serif italic lowercase text-signal">next</span> thing.
              </span>,
            ]}
          />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Direct links */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-sm text-pretty font-display text-lg leading-relaxed text-ink-dim">
                Have a project in mind, a role to fill, or a system that needs
                building? I read every message.
              </p>
            </Reveal>

            <div className="mt-10 space-y-px">
              {[
                { label: "Email", value: profile.email, href: links.email },
                { label: "LinkedIn", value: "anjit-kumar-yadav", href: links.linkedin },
                { label: "GitHub", value: "github profile", href: links.github },
              ].map((l) => (
                <Reveal key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor
                    className="group flex items-center justify-between border-t border-line py-4 last:border-b"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-meta text-ink-faint">
                      {l.label}
                    </span>
                    <span className="flex items-center gap-2 font-display text-lg text-ink transition-colors group-hover:text-signal">
                      {l.value}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <form onSubmit={onSubmit} noValidate className="space-y-8">
                {FIELDS.map((f) => (
                  <Field
                    key={f.name}
                    {...f}
                    value={form[f.name]}
                    onChange={set(f.name)}
                    error={errors[f.name]}
                  />
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[11px] uppercase tracking-meta text-ink-dim"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What are we building?"
                    className="mt-3 w-full resize-none border-b border-line bg-transparent pb-3 font-display text-lg text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
                  />
                  {errors.message && (
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-meta text-signal">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton type="submit" variant="solid">
                    Send Message <ArrowUpRight size={15} strokeWidth={1.75} />
                  </MagneticButton>
                  <span
                    aria-live="polite"
                    className="font-mono text-[11px] uppercase tracking-meta text-ink-dim"
                  >
                    {status}
                  </span>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[11px] uppercase tracking-meta text-ink-dim"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-line bg-transparent pb-3 font-display text-lg text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
      />
      {error && (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-meta text-signal">
          {error}
        </span>
      )}
    </div>
  );
}
