import { useState } from "react";

function TextList({ name, adInfo, setAdInfo }) {
  const [rulesValue, setRulesValue] = useState("");

  const addHandler = () => {
    setAdInfo({ ...adInfo, [name]: [...adInfo[name], rulesValue] });
    setRulesValue("");
  };
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <input
          className="w-full rounded-xl border-2 border-dotted border-blue-600 px-2 py-1 text-center"
          id={name}
          value={rulesValue}
          onChange={(e) => setRulesValue(e.target.value)}
        />

        {!rulesValue ? (
          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-blue-600/35 px-2 py-1 text-xs text-white dark:bg-cyan-500 dark:text-white"
            onClick={addHandler}
          >
            اضافه کردن
          </button>
        ) : (
          <button
            className="rounded-lg bg-blue-600 px-2 py-1 text-xs text-white"
            onClick={(e) => addHandler(name)}
          >
            اضافه کردن
          </button>
        )}
      </div>
    </>
  );
}

export default TextList;
