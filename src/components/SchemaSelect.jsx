import React, { useMemo, useState, useEffect } from "react";

export default function SchemaSelect({ value, allOptions, selectedValues, onChange }) {
  const [fade, setFade] = useState(true);

  const options = useMemo(() => {
    const used = new Set(selectedValues); // only other selected schemas
    return allOptions.filter(opt => opt.value === value || !used.has(opt.value));
  }, [value, selectedValues, allOptions]);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 50);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <select
      className={`form-select ${fade ? "fade show" : "fade"}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
