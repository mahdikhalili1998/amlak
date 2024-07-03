"use client";
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
function LogoutButton() {
  return (
    <div
      onClick={signOut}
      className="flex items-center justify-center gap-2 rounded-lg bg-red-500 py-1 px-2 text-white"
    >
      <HiOutlineLogout className="text-xl" />
      <span>خروج</span>
    </div>
  );
}

export default LogoutButton;
