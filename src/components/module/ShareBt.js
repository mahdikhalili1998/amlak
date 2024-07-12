"use client";
import { IoShareSocialSharp } from "react-icons/io5";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShareBt() {
  const [url, setUrl] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (click) {
    toast.success("آدرس آگهی کپی شد", {
      position: "top-center",
      transition: Flip,
    });
    setClick(false);
  }
  return (
    <>
      <CopyToClipboard text={url}>
        <div
          onClick={(e) => setClick(true)}
          className="mx-auto flex w-max items-center justify-center gap-7 rounded-xl px-8 py-5 font-medium shadow-xl shadow-blue-300 dark:text-white dark:shadow-cyan-800"
        >
          اشتراک گذاری{" "}
          <IoShareSocialSharp className="text-2xl text-blue-600 dark:text-cyan-400" />
        </div>
      </CopyToClipboard>
      <ToastContainer />
    </>
  );
}

export default ShareBt;
