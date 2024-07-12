"use client";
import Link from "next/link";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

function Category() {
  const [click, setClick] = useState(false);
  console.log(click);

  const queries = [
    { villa: "ویلا" },
    { store: "مغازه" },
    { office: "دفتر" },
    { apartment: "آپارتمان" },
  ];

  const clickHandler = () => {
    setClick(true);
  };

  const closeHandler = () => {
    setClick(false);
  };

  return (
    <>
      <div className="450:hidden">
        {click ? (
          <div className={`mb-[2rem] flex items-center justify-center gap-2`}>
            {queries.map((item, index) => (
              <Link
                className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white"
                key={index}
                href={{
                  pathname: "/resedentionals",
                  query: { category: Object.keys(item) },
                }}
              >
                {Object.values(item)}
              </Link>
            ))}
            <Link
              onClick={closeHandler}
              href="/resedentionals"
              className="rounded-lg bg-red-500 px-2 text-white"
            >
              X
            </Link>
          </div>
        ) : (
          <div
            onClick={clickHandler}
            className={`mb-[2rem] flex w-max items-center justify-start gap-1 rounded-xl bg-blue-600 px-2 py-1 text-sm font-medium text-white`}
          >
            <span> دسته بندی</span>
            <MdKeyboardDoubleArrowLeft className="text-lg" />
          </div>
        )}
      </div>
      <div className="hidden 450:mb-[2rem] 450:flex 450:items-center 450:justify-center 450:gap-5 lg:hidden">
        {queries.map((item, index) => (
          <Link
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
            key={index}
            href={{
              pathname: "/resedentionals",
              query: { category: Object.keys(item) },
            }}
          >
            {Object.values(item)}
          </Link>
        ))}
        <Link
          onClick={closeHandler}
          href="/resedentionals"
          className="rounded-lg bg-red-500 px-3 py-1 text-white"
        >
          X
        </Link>
      </div>
      <div className="hidden lg:flex lg:h-max lg:flex-col lg:items-center lg:rounded-lg lg:px-10 lg:py-3 lg:shadow-xl lg:shadow-blue-300">
        <h1 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
          دسته بندی
          <FiFilter />
        </h1>
        {queries.map((item, index) => (
          <Link
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold"
            key={index}
            href={{
              pathname: "/resedentionals",
              query: { category: Object.keys(item) },
            }}
          >
            <FaCircle className="text-[5px]" />
            {Object.values(item)}
          </Link>
        ))}
        <Link
          onClick={closeHandler}
          href="/resedentionals"
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold"
        >
          <FaCircle className="text-[5px]" />
          همه
        </Link>
      </div>
    </>
  );
}

export default Category;
