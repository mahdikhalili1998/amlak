"use client";
import { sp } from "@/utils/replaceNumber";
import { FaStore } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2";
import { MdOutlineApartment } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";

function AdCard({ data }) {
  const { title, location, price, category } = data;

  const icons = {
    villa: <FaHome />,
    department: <MdOutlineApartment />,
    store: <FaStore />,
    office: <HiBuildingOffice />,
  };

  return (
    <div className="flex flex-col gap-4 py-2 items-center  ">
      <span className="text-3xl text-cyan-600">{icons[category]}</span>
      <div className="flex flex-col items-start gap-2 text-sm">
        <span className="flex items-center gap-2">
          <MdSubtitles className="text-cyan-700" />
          {title}
        </span>
        <span className="flex items-center gap-2">
          <FaLocationDot className="text-cyan-700" />
          {location}
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
