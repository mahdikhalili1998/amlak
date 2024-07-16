"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

function NewPassInput() {
  const [newPass, setNewPass] = useState({ pass: "", rePass: "" });
  const [email, setEmail] = useState("");
  const { pass, rePass } = newPass;
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const emailObject = JSON.stringify(userEmail);
    setEmail(emailObject);
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewPass({ ...newPass, [name]: value });
  };

  const passChanger = async () => {
    if (pass !== rePass) {
      toast.error("رمز و تکرار آن یکسان نیستند", {
        position: "top-center",
        transition: Flip,
      });
      return;
    }
    if (pass === rePass) {
      await axios
        .patch("/api/pass", { email, pass })
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-center",
            transition: Flip,
          });
          if (res.status === 202) router.push("/sign-in");
        })
        .catch((error) => {
          if (error) {
            toast.error(error.message, {
              position: "top-center",
              transition: Flip,
            });
          }
        });
    }
  };
  return (
    <div className="rounded-lg border-2 border-dotted border-blue-600 p-5 shadow-xl shadow-blue-300 dark:shadow-cyan-900 505:max-w-64">
      <div className="flex flex-col items-center gap-3">
        <Input
          type="password"
          value={newPass.pass}
          name="pass"
          id="pass"
          changeHandler={changeHandler}
          label="رمز جدید را وارد کنید"
        />
        <Input
          type="password"
          value={newPass.rePass}
          name="rePass"
          id="rePass"
          changeHandler={changeHandler}
          label="رمز جدید را تکرار  کنید"
        />
        <button
          onClick={passChanger}
          disabled={!pass && !rePass}
          className="rounded-lg bg-green-600 px-2 py-1 text-sm font-medium text-white disabled:opacity-40"
        >
          تایید
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewPassInput;
