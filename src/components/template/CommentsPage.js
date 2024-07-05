"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdQuickreply } from "react-icons/md";

function CommentsPage({ data }) {
  const [adminCm, setAdminCm] = useState("");
  const { text, published, createdAt, ad_id, _id, email } = data;
  const router = useRouter();

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`/api/comments/${_id}`);

      if (res.status === 202) router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const answerHandler = async () => {
    try {
      const res = await axios.patch(`/api/comments/${_id}`, { ad_id, adminCm });
      if (res.status === 200) router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 rounded-lg p-5 shadow-xl shadow-blue-300">
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-1 text-center italic text-gray-700">
            {email} <MdQuickreply />
          </span>
          <p className="rounded-lg bg-green-300 p-3 text-sm font-medium text-green-950">
            {text}
          </p>
          <span className="w-max rounded-lg bg-blue-300 px-2 py-1 text-xs text-blue-900">
            {new Date(createdAt).toLocaleDateString("fa-IR")}
          </span>
        </div>
        <textarea
          value={adminCm}
          className="h-32 rounded-lg bg-blue-300 text-center placeholder:py-4 placeholder:text-center placeholder:text-xs placeholder:font-medium placeholder:text-blue-950 focus:outline-none"
          type="text"
          placeholder="اینجا پاسخ دهید!"
          onChange={(e) => setAdminCm(e.target.value)}
        />
        <div className="flex items-center justify-center gap-5">
          <button
            className="rounded-lg bg-green-500 px-2 py-1 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
            onClick={answerHandler}
            disabled={!adminCm}
          >
            منتشر
          </button>
          <button
            className="rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white"
            onClick={deleteHandler}
          >
            حذف
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentsPage;
