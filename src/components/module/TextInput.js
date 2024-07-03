import React from "react";

function TextInput({
  label,
  type,
  adInfo,
  changeHandler,
  name,
  textArea = false,
}) {
  return (
    <div className="flex flex-col  items-center gap-3">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label} :
      </label>
      {textArea ? (
        <textarea
          className="rounded-lg border-2 border-dotted border-blue-600 px-3 py-2 text-center focus:outline-none focus:outline-dotted"
          id={name}
          type={type}
          value={adInfo[name]}
          onChange={(e) => changeHandler(e)}
          name={name}
        />
      ) : (
        <input
          className="rounded-lg border-2 border-dotted border-blue-600 px-3 py-2 text-center focus:outline-none focus:outline-dotted"
          id={name}
          type={type}
          value={adInfo[name]}
          onChange={(e) => changeHandler(e)}
          name={name}
        />
      )}
    </div>
  );
}

export default TextInput;
