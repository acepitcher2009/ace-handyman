import type { ChangeEventHandler, FocusEventHandler } from 'react';

type FieldType = 'text' | 'tel' | 'email' | 'select' | 'textarea' | 'radio';

interface FieldOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  /** Used for id + htmlFor + the form control's name. */
  name: string;
  label: string;
  type?: FieldType;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  required?: boolean;
  /** Error message — when present, the control is marked invalid and described by it. */
  error?: string;
  /** Required for 'select' and 'radio'. */
  options?: FieldOption[];
  placeholder?: string;
}

export function FormField({
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  error,
  options = [],
  placeholder,
}: FormFieldProps) {
  const errorId = `${name}-error`;
  const describedBy = error ? errorId : undefined;
  const controlClasses =
    'w-full min-h-11 rounded-md border border-line bg-surface px-4 py-3 text-base text-ink ' +
    'placeholder:text-body focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-primary aria-[invalid=true]:border-primary';

  return (
    <div className="flex flex-col gap-2">
      {type !== 'radio' && (
        <label htmlFor={name} className="font-sans text-base font-semibold text-ink">
          {label}
          {required && <span className="text-primary"> *</span>}
        </label>
      )}

      {type === 'textarea' && (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          placeholder={placeholder}
          rows={5}
          className={controlClasses}
        />
      )}

      {type === 'select' && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={controlClasses}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {type === 'radio' && (
        <fieldset aria-describedby={describedBy} aria-invalid={Boolean(error)}>
          <legend className="font-sans text-base font-semibold text-ink">
            {label}
            {required && <span className="text-primary"> *</span>}
          </legend>
          <div className="mt-2 flex flex-col gap-2">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="inline-flex min-h-11 items-center gap-2 text-base text-body"
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  required={required}
                  aria-required={required}
                  className="size-5 accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {(type === 'text' || type === 'tel' || type === 'email') && (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          placeholder={placeholder}
          className={controlClasses}
        />
      )}

      {error && (
        <p id={errorId} className="text-sm font-semibold text-primary">
          {/* Prefix makes the error legible without relying on color alone. */}
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  );
}
