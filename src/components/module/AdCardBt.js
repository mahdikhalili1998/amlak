"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";

function AdCardBt({ data }) {
  const router = useRouter();
  const editHandler = () => {
    router.push(`/dashbord/my-ads/${data._id}`);
  };

  const deleteHandler = async () => {
    await axios
      .delete(`/api/delete-ad/${data._id}`)
      .then((res) => {
        res.status === 200 ? router.refresh() : null;
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex items-center justify-between gap-5 text-xl">
      <Link href="/">
        <FaArrowRightLong className="text-cyan-700" />
      </Link>
      <button onClick={editHandler}>
        <FaEdit className="text-blue-700" />
      </button>
      <button>
        <RiDeleteBin5Fill onClick={deleteHandler} className="text-red-700" />
      </button>
    </div>
  );
}

export default AdCardBt;
