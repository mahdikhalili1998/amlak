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
  const { title, location, price, category, picUrl } = data;
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
          <GrGallery className="mx-auto w-max m-5 text-4xl" />
        )}
        <span className="flex items-center gap-2">
          <span className="text-lg text-cyan-600">{icons[category]}</span>
          {title}
        </span>
        <span className="flex items-center gap-2">
          <FaLocationDot className="text-cyan-700" />
          {getFirstWord(location)}
        </span>
        <span className="flex items-center gap-2">
          <AiFillDollarCircle className="text-base text-cyan-700" />
          {sp(price)} تومان
        </span>
      </div>
    </div>
  );
}

export default AdCard;
