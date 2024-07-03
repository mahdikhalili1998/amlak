import React from "react";
import MainPageImg from "../module/MainPageImg";
import { PiCity } from "react-icons/pi";
function MainPage() {
  const banner = ["اجاره", "رهن", "فروش", "خرید"];
  const cities = [
    "مازندران",
    "تبریز",
    "اردبیل",
    "گرگان",
    "گلستان",
    "اصفهان",
    "گیلان",
    "مشهد",
    "تهران",
  ];
  return (
    <div className="space-y-8 md:space-y-14">
      <h1 className="text-center text-xl font-semibold text-blue-700">
        سامانه خرید و اجاره ملک
      </h1>
      <ul className="mx-auto flex w-max items-center gap-4 rounded-lg bg-blue-300 px-2 py-2 text-xs">
        {banner.map((item, index) => (
          <li
            className="rounded-xl bg-blue-500 px-2 py-1 text-white"
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="tabletz:grid tabletz:grid-cols-2 tabletz:gap-y-10 md:flex md:items-center md:justify-center md:gap-10">
        <MainPageImg title="آپارتمان" name="apartment" />
        <MainPageImg title="دفتر" name="office" />
        <MainPageImg title="مغازه" name="store" />
        <MainPageImg title="ویلا" name="villa" />
      </div>
      <div>
        <h1 className="mb-[2rem] text-center text-base font-semibold text-blue-700">
          شهرهای پربازدید
        </h1>
        <ul className="grid grid-cols-3 gap-3 text-blue-800">
          {cities.map((item, index) => (
            <li key={index} className="justify-self-center text-sm">
              {item} <PiCity className="hidden" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
