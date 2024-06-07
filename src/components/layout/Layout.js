import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="mx-4 my-[4rem]">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
