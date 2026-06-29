import { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';

import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';

import { business, features, siteCopy } from '../../data/business';
import { serviceAreas } from '../../data/serviceAreas';
import { services } from '../../data/services';

// Backend constant — flip to true (and supply confirmed consent copy) only if the
// chosen EmailJS setup requires explicit consent. Kept here as a backend fact, not
// invented launch copy (PRD §5/§6; CONVENTIONS §G). Defaults false → checkbox omitted.
const REQUIRES_CONSENT = false;

type Variant = 'inline' | 'page';
type ContactMethod = '' | 'phone' | 'email';
type Status = 'idle' | 'sending' | 'success' | 'error';

interface EstimateFormProps {
  variant?: Variant;
  /** Optional heading for the 'page' variant; falls back to a sensible default. */
  heading?: string;
  className?: string;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  area: string;
  service: string;
  description: string;
  contactMethod: ContactMethod;
  consent: boolean;
  company: string; // honeypot — must stay empty for a real human
}

type ValidatableField =
  | 'fullName'
  | 'phone'
  | 'email'
  | 'area'
  | 'service'
  | 'description'
  | 'consent';
type Errors = Partial<Record<ValidatableField, string>>;

// Standard email shape — rejects obviously malformed addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Plausible US phone: optional +1, then 10 digits with common separators.
const PHONE_RE = /^\+?1?[\s.-]*\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}$/;

const initialValues: FormValues = {
  fullName: '',
  phone: '',
  email: '',
  area: '',
  service: '',
  description: '',
  contactMethod: '',
  consent: false,
  company: '',
};

const REQUIRED_FIELDS: ValidatableField[] = REQUIRES_CONSENT
  ? ['fullName', 'phone', 'email', 'area', 'service', 'description', 'consent']
  : ['fullName', 'phone', 'email', 'area', 'service', 'description'];

function validateField(name: ValidatableField, values: FormValues): string | undefined {
  switch (name) {
    case 'fullName':
      return values.fullName.trim() ? undefined : 'Please enter your name.';
    case 'phone':
      if (!values.phone.trim()) return 'Please enter your phone number.';
      return PHONE_RE.test(values.phone.trim()) ? undefined : 'Please enter a valid phone number.';
    case 'email':
      if (!values.email.trim()) return 'Please enter your email.';
      return EMAIL_RE.test(values.email.trim()) ? undefined : 'Please enter a valid email address.';
    case 'area':
      return values.area ? undefined : 'Please choose a service area.';
    case 'service':
      return values.service ? undefined : 'Please choose a service.';
    case 'description':
      return values.description.trim() ? undefined : 'Please describe your project.';
    case 'consent':
      if (!REQUIRES_CONSENT) return undefined;
      return values.consent ? undefined : 'Please agree before submitting.';
    default:
      return undefined;
  }
}

// Town select: the 4 service-area names (from data) + Other.
const areaOptions = [
  ...serviceAreas.map((a) => ({ value: a.name, label: a.name })),
  { value: 'Other', label: 'Other' },
];
// Service select: the 8 service titles (from data) + "Other / Not sure".
const serviceOptions = [
  ...services.map((s) => ({ value: s.title, label: s.title })),
  { value: 'Other / Not sure', label: 'Other / Not sure' },
];

export function EstimateForm({ variant = 'inline', heading, className = '' }: EstimateFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const isValid = REQUIRED_FIELDS.every((f) => !validateField(f, values));

  function setValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(field: ValidatableField) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate all required fields on submit.
    const nextErrors: Errors = {};
    for (const f of REQUIRED_FIELDS) nextErrors[f] = validateField(f, values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    // Honeypot: a filled hidden field means a bot — pretend success, send nothing.
    if (values.company.trim()) {
      setStatus('success');
      return;
    }

    // Read EmailJS keys ONLY from VITE_* env; guard undefined/empty so a missing key
    // degrades to the error path and never throws / crashes the build or render.
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          full_name: values.fullName,
          phone: values.phone,
          email: values.email,
          service_area: values.area,
          service_type: values.service,
          description: values.description,
          preferred_contact: values.contactMethod,
        },
        { publicKey }
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  // SUCCESS — replaces the form; announced politely; uses text-success (never a CTA color).
  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-md border border-line bg-mist p-6 ${className}`.trim()}
      >
        <p className="text-lg font-semibold text-success">{siteCopy.formSuccess.text}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-6 ${variant === 'page' ? 'max-w-2xl' : ''} ${className}`.trim()}
    >
      {variant === 'page' && (
        <h2 className="font-display text-3xl text-ink">{heading ?? 'Request an Estimate'}</h2>
      )}

      <FormField
        name="fullName"
        label="Full name"
        value={values.fullName}
        onChange={(e) => setValue('fullName', e.target.value)}
        onBlur={() => handleBlur('fullName')}
        required
        error={errors.fullName}
      />
      <FormField
        name="phone"
        label="Phone"
        type="tel"
        value={values.phone}
        onChange={(e) => setValue('phone', e.target.value)}
        onBlur={() => handleBlur('phone')}
        required
        error={errors.phone}
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => setValue('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        required
        error={errors.email}
      />
      <FormField
        name="area"
        label="Service area / town"
        type="select"
        value={values.area}
        onChange={(e) => setValue('area', e.target.value)}
        onBlur={() => handleBlur('area')}
        required
        error={errors.area}
        placeholder="Select a service area"
        options={areaOptions}
      />
      <FormField
        name="service"
        label="Service type"
        type="select"
        value={values.service}
        onChange={(e) => setValue('service', e.target.value)}
        onBlur={() => handleBlur('service')}
        required
        error={errors.service}
        placeholder="Select a service"
        options={serviceOptions}
      />
      <FormField
        name="description"
        label="Project description"
        type="textarea"
        value={values.description}
        onChange={(e) => setValue('description', e.target.value)}
        onBlur={() => handleBlur('description')}
        required
        error={errors.description}
      />
      <FormField
        name="contactMethod"
        label="Preferred contact method"
        type="radio"
        value={values.contactMethod}
        onChange={(e) => setValue('contactMethod', e.target.value as ContactMethod)}
        options={[
          { value: 'phone', label: 'Phone' },
          { value: 'email', label: 'Email' },
        ]}
      />

      {/* Photo upload — ONLY when the backend supports it (Gaps G-4). Omitted entirely otherwise. */}
      {features.photoUpload && (
        <div className="flex flex-col gap-2">
          <label htmlFor="photo" className="font-sans text-base font-semibold text-ink">
            Add a photo (optional)
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="w-full min-h-11 rounded-md border border-line bg-surface px-4 py-3 text-base text-ink"
          />
        </div>
      )}

      {/* Consent — only when the backend requires it. Visible + labelled when shown. */}
      {REQUIRES_CONSENT && (
        <label className="inline-flex min-h-11 items-start gap-2 text-base text-body">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setValue('consent', e.target.checked)}
            onBlur={() => handleBlur('consent')}
            className="mt-1 size-5 accent-primary"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>I agree to be contacted about my request.</span>
        </label>
      )}

      {/* Honeypot — visually hidden, off the tab order, not a real field. */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(e) => setValue('company', e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      {/* Error / failure — text (not color alone), announced, phone fallback only if present. */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-md border border-line bg-mist p-4 text-base text-ink"
        >
          <p className="font-semibold">
            <span aria-hidden="true">⚠ </span>
            Sorry — something went wrong sending your request. Please try again.
          </p>
          {business.phone && (
            <p className="mt-2">
              or call us at{' '}
              <a
                href={`tel:${business.phone}`}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {business.phone}
              </a>
              .
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        disabled={!isValid || status === 'sending'}
        className="w-full sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Request an Estimate'}
      </Button>
    </form>
  );
}
