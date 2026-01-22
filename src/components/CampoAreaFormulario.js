import React from "react";

export default function CampoAreaFormulario({ label, name, id, placeholder, value, onChange, required = false, error }) {
  return (
    <div className="sm:col-span-4">
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <textarea
            name={name}
            id={id}
            className="block min-w-0 w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 resize-y"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        </div>
        {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
} 