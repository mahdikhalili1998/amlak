"use client";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const [isSun, setIsSun] = useState(true);
  // console.log(isSun);

  return (
    <>
      <Header menu={menu} isSun={isSun} setIsSun={setIsSun} setMenu={setMenu} />
      <div
        className={`mx-1 py-[2rem] dark:bg-[#0a0228] ${!menu ? null : "pointer-events-none opacity-10"}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
