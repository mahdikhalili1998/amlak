"use client";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
      <div className={`mx-1 my-[2rem] ${!menu ? null : "opacity-10 pointer-events-none"}`}>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
