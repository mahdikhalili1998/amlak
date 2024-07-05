"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PublishBt({ id }) {
  const router = useRouter();

  const publishHandler = async () => {
    await axios
      .patch(`/api/publish/${id}`)
      .then((res) => {
        res.status === 200
          ? (toast.success("آگهی منتشر شد", {
              position: "top-center",
              transition: Flip,
            }),
            router.refresh())
          : null;
      })
      .catch((error) => console.log(error));
  };
  const deleteHandler = async () => {
    await axios
      .delete(`/api/publish/${id}`)
      .then((res) => {
        res.status === 202 ? router.refresh() : null;
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white"
        onClick={publishHandler}
      >
        انتشار
      </button>
      <button
        className="rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white"
        onClick={deleteHandler}
      >
        حذف
      </button>
      <ToastContainer />
    </div>
  );
}

export default PublishBt;
