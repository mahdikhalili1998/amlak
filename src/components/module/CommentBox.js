"use client";

import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { maskEmail } from "@/funcs/helper";

function CommentBox({ session, email, id }) {
  const [cm, setCm] = useState("");
  const [loadnig, setLoading] = useState(false);
  // console.log(id);
  const sendHandler = async () => {
    setLoading(true);
    await axios
      .post(`/api/comments/${id}`, { cm })
      .then((res) => {
        res.status === 200
          ? toast.success("در انتظار پاسخ از سمت مشاورین ما باشید ", {
              position: "top-center",
              transition: Flip,
            })
          : null;
      })
      .catch((error) => console.log(error));
    setCm("");
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        {session ? (
          <div className="flex items-center justify-center gap-2 text-xs">
            <span>{maskEmail(email)}</span>
            <span className="rounded-[100%] bg-gray-600 px-2 py-1 text-xs text-white">
              {email.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : null}
        <div>
          <textarea
            value={cm}
            placeholder="سوال خود را تایپ کنید ..."
            className="h-36 rounded-lg bg-blue-300 p-3 text-center text-xs font-medium placeholder:py-4 placeholder:text-center placeholder:text-xs placeholder:font-medium placeholder:text-blue-950 focus:outline-none"
            type="text"
            onChange={(e) => setCm(e.target.value)}
          />
        </div>
        {loadnig ? (
          <ThreeDots
            visible={true}
            height="50"
            width="50"
            color="#2563eb"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <button
            className="mx-auto w-max rounded-lg bg-blue-600 px-2 py-1 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!cm}
            onClick={sendHandler}
          >
            ارسال
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default CommentBox;
