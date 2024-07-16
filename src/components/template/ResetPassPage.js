"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThreeDots } from "react-loader-spinner";

function ResetPassPage() {
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const router = useRouter();
  console.log(otpCode);

  useEffect(() => {
    const code = sessionStorage.getItem("otpCode");
    router.refresh("/reset-pass");
    if (code) {
      setOtpCode(code);
    }
  }, []);

  const loginHandler = async () => {
    if (!otpCode && !userCode) {
      console.log("khalie");
      return;
    }
    setLoading(true);

    if (otpCode === userCode) {
      router.push("/new-pass");
    }
    if (otpCode !== userCode) {
      toast.error("رمز وارد شده صحیح نیست", {
        position: "top-center",
        transition: Flip,
      });
    }

    setLoading(false);
  };
  return (
    <div className="relative mt-7 505:flex 505:justify-center">
      <div className="absolute right-[5%] top-[20%] flex flex-col items-center justify-center gap-5 rounded-lg bg-blue-500 bg-sky-800/65 px-2 py-2 285:right-[17%] 285:top-[20%] 360:right-[20%] 360:top-[22%] 450:right-[28%] 450:top-[28%] 505:static 505:bg-transparent">
        <h2 className="text-sm font-semibold text-white 505:text-blue-600">
          کد 5 رقمی پیامک شده را وارد کنید :{" "}
        </h2>
        <input
          type="number"
          value={userCode}
          className="mtnVast rounded-lg px-2 py-1 placeholder:text-center focus:outline-none 505:border-2 505:border-solid 505:border-blue-600"
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="X-X-X-X-X"
        />
        <div>
          {loading ? (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              className="text-pink-500"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <button
              className="rounded-xl bg-blue-900 px-3 py-1 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 420:disabled:opacity-75 505:bg-blue-600 505:disabled:opacity-45"
              onClick={loginHandler}
              disabled={!userCode}
            >
              تایید
            </button>
          )}
        </div>
      </div>
      <Image
        className="505:max-w-[28rem] 505:rounded-xl"
        src="/images/house.jpg"
        height={500}
        width={500}
        alt="logo"
        priority
      />
      <ToastContainer />
    </div>
  );
}

export default ResetPassPage;
