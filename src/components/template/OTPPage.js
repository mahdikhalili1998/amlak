"use client";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/navigation";


const OTPPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  console.log(otpCode);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [userCode, setUserCode] = useState("");
  const [goToPass, setGoToPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtpHandler = async () => {
    const num = `{"to":"${phoneNumber}"}`;
    const phoneRegex = /^09\d{9}$/;
    const headers = {
      "Content-Type": "application/json",
    };

    if (!phoneRegex.test(phoneNumber)) {
      // console.log("error darim ");
      toast.error("شماره تلفن صحیح وارد کنید", {
        position: "top-center",
        transition: Flip,
      });
      return;
    }

    setLoading(true);

    await axios
      .post("api/proxy", num, { headers })
      .then((res) => {
        if (res) {
          setGoToPass(true);
          setOtpCode(res?.data.code);
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("خطای سرور ، دوباره امتحان کنید", {
            position: "top-center",
            transition: Flip,
          });
          return;
        }
      });

    setLoading(false);
  };

  const loginHandler = async () => {
    if (!otpCode && !userCode) {
      console.log("khalie");
      return;
    }

    localStorage.setItem("phoneNumber", phoneNumber);

    await axios
      .post("/api/isPhone", { phoneNumber })
      .then((res) => {
        if (res.status === 200 && otpCode === userCode) {
          // console.log(res);
          localStorage.setItem("userEmail", res.data.email);
          router.push("/sign-in");
        }
      })
      .catch((error) => {
        if (!error) return;
        if (error?.response?.status === 400 && otpCode === userCode)
          router.push("/sign-up");
      });
  };

  const editHandler = () => {
    setGoToPass(false);
  };

  return (
    <div className="relative mt-7 505:flex 505:justify-center">
      {goToPass ? (
        <div className="absolute right-[5%] top-[5%] flex flex-col items-center justify-center gap-5 rounded-lg bg-blue-500 bg-sky-800/65 px-2 py-2 285:right-[17%] 285:top-[20%] 360:right-[20%] 360:top-[22%] 450:right-[28%] 450:top-[28%] 505:static 505:bg-transparent">
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
          <div className="flex flex-col items-center gap-2 800:flex-row">
            <p className="w-max text-xs font-semibold text-white 505:text-blue-600">
              شماره تلفن صحیح نیست ؟
            </p>
            <button
              className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-blue-600 505:bg-blue-600 505:text-white"
              onClick={editHandler}
            >
              ویرایش شماره
            </button>
          </div>
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
                ورود
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute right-[10%] top-[10%] flex flex-col items-center justify-center gap-5 rounded-lg bg-blue-500 bg-sky-800/65 px-2 py-8 285:right-[17%] 285:top-[20%] 360:right-[20%] 360:top-[22%] 450:right-[28%] 450:top-[28%] 505:static 505:bg-transparent">
          <h2 className="text-sm font-semibold text-white 505:text-blue-600">
            شماره تلفن خود را وارد کنید :{" "}
          </h2>
          <input
            type="number"
            value={phoneNumber.to}
            className="mtnVast rounded-lg py-1 placeholder:text-center focus:outline-none 505:border-2 505:border-solid 505:border-blue-600"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0912XXXXXXX"
          />
          <div>
            {loading ? (
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#2563eb"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <button
                className="rounded-xl bg-blue-900 px-3 py-1 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 420:disabled:opacity-75 505:bg-blue-600 505:disabled:opacity-45"
                onClick={sendOtpHandler}
                disabled={!phoneNumber}
              >
                ارسال پیامک
              </button>
            )}
          </div>
        </div>
      )}

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
};

export default OTPPage;
