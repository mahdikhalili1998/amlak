"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineLogin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { status } = useSession();
  return (
    <div className="flex justify-between rounded-xl bg-blue-600 px-3 py-2">
      <div className="flex items-center gap-4 text-white">
        <Link href="/">صفحه اصلی</Link>
        <Link href="/filse"> آگهی ها</Link>
      </div>
      {status === "authenticated" ? (
        <div className="flex items-center gap-3 rounded-lg px-2 py-1">
          <Link href="/dashbord" className="font-medium">
            <FaUserCircle style={{ fontSize: "1.8rem", color: "#fff" }} />
          </Link>
        </div>
      ) : (
        <Link
          href="/sign-up"
          className="flex items-center gap-3 rounded-lg bg-white px-2 py-1"
        >
          <MdOutlineLogin style={{ fontSize: "1.4rem" }} />
          <span className="font-medium">ورود به حساب</span>
        </Link>
      )}
    </div>
  );
}

export default Header;
