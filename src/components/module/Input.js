import React from "react";

function Input({ type, name, label, changeHandler, value }) {
  return (
    <div className="mb-4 flex flex-col items-center justify-center gap-3">
      <label htmlFor={name}>{label}</label>
      <input
        className="rounded-xl border-2 border-dotted border-blue-600 px-2 py-1 text-center focus:outline-none"
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
}

export default Input;
