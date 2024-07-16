"use client";

import React, { useEffect, useState } from "react";
import Input from "../module/Input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

function SigninPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userPhone = localStorage.getItem("phoneNumber");
    setUserInfo({ ...userInfo, email: userEmail, phone: userPhone });
  }, []);

  const { email, password, phone } = userInfo;
  const router = useRouter();

  const sendOtpHandler = async () => {
    const num = `{"to":"${phone}"}`;
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post("api/proxy", num, { headers })
      .then((res) => {
        if (res) {
          sessionStorage.setItem("otpCode", res?.data.code);
          router.push("/reset-pass");
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
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.error) {
      toast.error(res.error, { position: "top-center", transition: Flip });
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex w-max flex-col items-center gap-8 rounded-lg border-2 border-blue-600 px-2 py-8 shadow-2xl"
      >
        <h1 className="text-xl font-medium dark:text-white">
          ورود به حساب کاربری
        </h1>
        <div className="flex flex-col items-center justify-center">
          <Input
            name="email"
            value={userInfo.email}
            type="email"
            changeHandler={changeHandler}
            label="ایمیل"
          />
          <Input
            name="password"
            value={userInfo.password}
            type="password"
            changeHandler={changeHandler}
            label="رمز عبور"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#2563eb"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white"
            >
              ورود
            </button>
          )}

          {/* <p className="text-sm font-medium dark:text-white">
            حساب کاربری ندارید ؟{" "}
            <Link className="text-blue-600" href="/sign-up">
              ثبت نام کنید
            </Link>
          </p> */}
          <p className="text-blue-600" onClick={sendOtpHandler}>
            رمز عبور را فراموش کردم !
          </p>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default SigninPage;
