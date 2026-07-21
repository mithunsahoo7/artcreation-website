import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { MessageCircle, Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";
import { CONTACT, SERVICES } from "../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    city: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Enquiry received. We'll be in touch shortly.");
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        city: "",
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <section className="pt-40 pb-16 md:pt-52 md:pb-24 bg-white grain relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <p className="overline mb-8">Contact · Start a project</p>
          <RevealLines
            as="h1"
            dataTestId="contact-title"
            className="font-display font-black leading-[0.9] tracking-tighter text-6xl md:text-8xl lg:text-9xl"
            lines={[
              "Bring us",
              <>the <span className="text-accent italic font-medium">brief.</span></>,
            ]}
          />
        </div>
      </section>

      <section className="bg-white pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-12">
          {/* Left column - info */}
          <aside className="col-span-12 md:col-span-5 lg:col-span-4">
            <Reveal>
              <div className="border border-hair p-8 md:p-10 bg-alt">
                <p className="overline mb-8">Studio</p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin size={18} className="mt-1 text-accent" />
                    <div>
                      <p className="font-display font-black tracking-tight text-lg">
                        Kolkata Studio
                      </p>
                      <p className="text-black/70 text-sm mt-1">
                        {CONTACT.address}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone size={18} className="mt-1 text-accent" />
                    <div>
                      <p className="font-display font-black tracking-tight text-lg">
                        Call
                      </p>
                      <a
                        href={CONTACT.phoneHref}
                        data-testid="contact-phone"
                        className="block text-black/70 text-sm mt-1 link-underline"
                      >
                        {CONTACT.phone}
                      </a>
                      <a
                        href={CONTACT.phoneAltHref}
                        data-testid="contact-phone-alt"
                        className="block text-black/70 text-sm mt-1 link-underline"
                      >
                        {CONTACT.phoneAlt}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MessageCircle size={18} className="mt-1 text-accent" />
                    <div>
                      <p className="font-display font-black tracking-tight text-lg">
                        WhatsApp
                      </p>
                      <a
                        href={CONTACT.whatsappHref}
                        data-testid="contact-whatsapp"
                        className="text-black/70 text-sm mt-1 link-underline"
                      >
                        {CONTACT.whatsapp}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail size={18} className="mt-1 text-accent" />
                    <div>
                      <p className="font-display font-black tracking-tight text-lg">
                        Email
                      </p>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        data-testid="contact-email"
                        className="text-black/70 text-sm mt-1 link-underline"
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </li>
                </ul>
                {CONTACT.placeholder && (
                  <p className="mt-10 text-[11px] text-black/40 border-t border-hair pt-4">
                    * Contact details shown are placeholders.
                  </p>
                )}
              </div>

              <div className="mt-6 border border-hair p-8 md:p-10">
                <p className="overline mb-6">Hours</p>
                <ul className="text-sm text-black/70 space-y-2">
                  <li className="flex justify-between">
                    <span>Mon — Sat</span>
                    <span className="font-display font-black">10:00 — 20:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sun</span>
                    <span className="font-display font-black">By appointment</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </aside>

          {/* Right column - form */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <Reveal delay={0.1}>
              <form
                data-testid="enquiry-form"
                onSubmit={onSubmit}
                className="border border-hair p-8 md:p-12"
              >
                <p className="overline mb-8">Enquiry</p>
                <h2 className="font-display font-black tracking-tighter text-3xl md:text-5xl mb-10 leading-tight">
                  Tell us about the project.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="Your name *"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    testid="input-name"
                  />
                  <Field
                    label="Company"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    testid="input-company"
                  />
                  <Field
                    label="Email *"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    testid="input-email"
                  />
                  <Field
                    label="Phone / WhatsApp"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    testid="input-phone"
                  />
                  <div className="md:col-span-1">
                    <label className="block">
                      <span className="overline block mb-3">Service</span>
                      <select
                        data-testid="input-service"
                        name="service"
                        value={form.service}
                        onChange={onChange}
                        className="w-full bg-transparent border-b border-black py-3 focus:outline-none focus:border-accent"
                      >
                        <option value="">Select service</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </label>
                  </div>
                  <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={onChange}
                    testid="input-city"
                  />
                </div>

                <label className="block mt-8">
                  <span className="overline block mb-3">Project brief *</span>
                  <textarea
                    data-testid="input-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Scope, locations, timelines, artwork status…"
                    className="w-full bg-transparent border-b border-black py-3 focus:outline-none focus:border-accent resize-none"
                  />
                </label>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    data-testid="submit-enquiry"
                    disabled={submitting}
                    className="btn btn-accent disabled:opacity-50"
                  >
                    {submitting ? "Sending…" : "Send enquiry"} <ArrowRight size={16} />
                  </button>
                  <a
                    href={CONTACT.whatsappHref}
                    data-testid="contact-whatsapp-btn"
                    className="btn btn-outline"
                  >
                    Or WhatsApp us
                  </a>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", value, onChange, testid }) {
  return (
    <label className="block">
      <span className="overline block mb-3">{label}</span>
      <input
        data-testid={testid}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-black py-3 focus:outline-none focus:border-accent"
      />
    </label>
  );
}
