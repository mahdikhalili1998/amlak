"use client";
import { sp } from "@/utils/replaceNumber";
import { FaStore } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2";
import { MdOutlineApartment } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import Image from "next/image";
import { getFirstWord } from "@/funcs/helper";

function AdCard({ data }) {
  console.log(data);
  const { title, location, price, category, published, picUrl } = data;
  const [firstPic] = picUrl;
  const icons = {
    villa: <FaHome />,
    department: <MdOutlineApartment />,
    store: <FaStore />,
    office: <HiBuildingOffice />,
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex flex-col items-start gap-4 text-sm font-medium">
        {firstPic ? (
          <Image
            src={firstPic}
            className="rounded-xl"
            alt={title}
            width={190}
            height={190}
          />
        ) : (
          <div className="flex h-[234px] w-[190px] items-center rounded-xl bg-slate-200">
            <GrGallery className="mx-auto w-max text-5xl" />
          </div>
        )}
        <span className="flex items-center gap-2 dark:text-white">
          <span className="text-lg text-cyan-600 dark:text-white">
            {icons[category]}
          </span>
          {title}
        </span>
        <span className="flex items-center gap-2 dark:text-white">
          <FaLocationDot className="text-cyan-700 dark:text-white" />
          {getFirstWord(location)}
        </span>
        <span className="flex items-center gap-2 dark:text-white">
          <AiFillDollarCircle className="text-base text-cyan-700 dark:text-white" />
          {sp(price)} تومان
        </span>
        {published ? null : (
          <span className="rounded-xl bg-red-300 px-2 py-1 text-xs font-medium text-red-700">
            در انتظار تایید ...{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default AdCard;
