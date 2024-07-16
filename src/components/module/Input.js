import React from "react";

function Input({ type, name, label, changeHandler, readonly, value }) {
  return (
    <div className="mb-4 flex flex-col items-center justify-center gap-3">
      <label className="dark:text-white" htmlFor={name}>
        {label}
      </label>
      <input
        className="rounded-xl border-2 border-dotted border-blue-600 px-2 py-1 text-center read-only:opacity-50 focus:outline-none"
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={(e) => changeHandler(e)}
        readOnly={readonly}
      />
    </div>
  );
}

export default Input;
