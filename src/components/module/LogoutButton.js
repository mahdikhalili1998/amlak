"use client";
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
function LogoutButton() {
  const signOutHandler = () => {
    signOut({ callbackUrl: "/send-otp" });
  };
  return (
    <div
      onClick={signOutHandler}
      className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-white"
    >
      <HiOutlineLogout className="text-xl" />
      <span>خروج</span>
    </div>
  );
}

export default LogoutButton;
