"use client";

import React, { useEffect, useState } from "react";
import Input from "../module/Input";
import Link from "next/link";
import { Flip, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useRouter } from "next/navigation";

function SignupPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    phone: "",
    repassword: "",
  });

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    setUserInfo({ ...userInfo, phone: phoneNumber });
  }, []);

  const [loading, setLoading] = useState(false);
  const { email, password, repassword, phone } = userInfo;
  const router = useRouter();

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      toast.error("رمز عبور و تکرار آن تطبیق ندارند ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
    setLoading(true);
    await axios
      .post("/api/auth/signup", { email, password, phone })
      .then((res) => {
        {
          res.data.status === 201 ? router.push("/sign-in") : null;
        }
        {
          res.data.status === 422
            ? toast.error("کاربر با این ایمیل وجود دارد", {
                position: "top-center",
                transition: Flip,
              })
            : null;
        }
      })
      .catch((error) => {
        console.log(error);
        {
          error.response.status === 400
            ? toast.error(error.message, {
                position: "top-center",
                transition: Flip,
              })
            : null;
        }
      });
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex flex-col items-center gap-8 rounded-lg border-2 border-blue-600 py-8 shadow-2xl"
      >
        <h1 className="w-max text-lg font-medium">ساخت حساب کاربری</h1>
        <div className="flex flex-col items-center justify-center text-sm">
          <Input
            name="email"
            value={userInfo.email}
            type="email"
            changeHandler={changeHandler}
            label="ایمیل"
          />
          <Input
            name="phone"
            value={userInfo.phone}
            type="string"
            changeHandler={changeHandler}
            label="شماره همراه :"
            readonly="readonly"
          />
          <Input
            name="password"
            value={userInfo.password}
            type="password"
            changeHandler={changeHandler}
            label="رمز عبور"
          />
          <Input
            name="repassword"
            value={userInfo.repassword}
            type="password"
            changeHandler={changeHandler}
            label="تکرار رمز عبور"
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
              ثبت نام
            </button>
          )}
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default SignupPage;
