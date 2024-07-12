"use client";

import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useTheme } from "../theme/Dark";

const DarkBt = ({ isSun, setIsSun }) => {
  const { theme, toggleTheme, setTheme } = useTheme();

  const toggleSunMoon = () => {
    setIsSun(!isSun);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex h-5 w-max items-center rounded-md bg-blue-300 pl-5">
      <button
        className={`flex transform items-center justify-center rounded-full bg-white p-[5px] text-lg text-blue-600 transition duration-300 ease-in-out hover:bg-yellow-400 focus:outline-none ${isSun ? "translate-x-0" : "-translate-x-8"}`}
        onClick={toggleSunMoon}
      >
        {isSun ? <IoMdSunny /> : <IoMdMoon />}
      </button>
    </div>
  );
};

export default DarkBt;
