"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineLogin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

function Header({ menu, setMenu }) {
  const { status } = useSession();

  return (
    <div className="relative flex items-center justify-between rounded-xl bg-blue-600 px-3 py-2 text-white">
      <GiHamburgerMenu className="sm:hidden" onClick={(e) => setMenu(true)} />
      <div className="hidden items-center gap-7 font-medium text-white sm:flex">
        <Link href="/">صفحه اصلی</Link>
        <Link href="/resedentionals"> آگهی ها</Link>
      </div>
      <>
        <div className="sm:hidden"></div>
        <div
          className={`absolute right-0 top-0 flex h-max w-full py-20 ${!menu ? "translate-x-full" : "translate-x-0"} flex-col items-center gap-5 rounded-lg bg-blue-600/80 p-4 transition-[transform] duration-700 sm:hidden`}
        >
          <div className="flex flex-col items-center justify-center gap-5">
            <Link
              href="/"
              className="rounded-br-xl rounded-tl-xl bg-white px-2 py-[1px] font-medium text-blue-500"
              onClick={(e) => setMenu(false)}
            >
              صفحه اصلی
            </Link>
            <Link
              href="/resedentionals"
              className="rounded-br-xl rounded-tl-xl bg-white px-2 py-[1px] font-medium text-blue-500"
              onClick={(e) => setMenu(false)}
            >
              {" "}
              آگهی ها
            </Link>
          </div>
          <div
            className="flex items-center gap-2 rounded-xl bg-red-500 px-2 py-[2px] text-white"
            onClick={(e) => setMenu(false)}
          >
            <span> بستن</span>
            <span>
              <IoClose />
            </span>
          </div>
        </div>
      </>

      {status === "authenticated" ? (
        <Link
          className="flex items-center gap-3 rounded-lg px-2 py-1 font-medium"
          href="/dashbord"
        >
          <FaUserCircle style={{ fontSize: "1.8rem", color: "#fff" }} />
        </Link>
      ) : (
        <Link
          href="/sign-up"
          className="flex items-center gap-3 rounded-lg bg-white px-2 py-1 text-blue-700"
        >
          <MdOutlineLogin style={{ fontSize: "1.2rem" }} />
          <span className="text-sm font-medium">ورود به حساب</span>
        </Link>
      )}
    </div>
  );
}

export default Header;
