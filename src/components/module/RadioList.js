import React from "react";

function RadioList({ name, label, adInfo, radioHandler }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-blue-200 px-2 py-1 text-blue-700">
      <label className="" htmlFor={name}>
        {label}
      </label>
      <input
        className="peer/draft"
        type="radio"
        name={name}
        id={name}
        value={name}
        checked={adInfo.category === name}
        onChange={(e) => radioHandler(e)}
      />
    </div>
  );
}

export default RadioList;
