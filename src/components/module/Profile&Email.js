"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
function Profile({ email, role }) {
  const [showSingoutBt, setShowSignoutBt] = useState(false);
  return (
    <div className="transition-all duration-700">
      <div
        onClick={(e) => setShowSignoutBt((showSingoutBt) => !showSingoutBt)}
        className="flex cursor-pointer flex-col items-center gap-1"
      >
        <FaUserCircle className="text-[3rem] text-blue-600" />
        <span className="pb-1">{email}</span>
        {role === "ADMIN" ? (
          <span className="-mt-2 mb-3 rounded-lg bg-red-200 px-2 py-1 text-xs font-medium text-red-800">
            ادمین
          </span>
        ) : null}
      </div>

      <div
        className={`transition-[transform] duration-700 ${!showSingoutBt ? "invisible -translate-y-full md:visible md:translate-y-0" : "visible translate-y-0"} `}
      >
        <LogoutButton />
      </div>
    </div>
  );
}

export default Profile;
