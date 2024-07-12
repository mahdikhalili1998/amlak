"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GrGallery } from "react-icons/gr";

const Slider = ({ ad }) => {
  const [adv] = ad;
  const { picUrl } = adv;
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - currentX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % picUrl.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + picUrl.length) % picUrl.length,
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-44 w-full overflow-hidden 300:h-56 360:h-64 420:h-72 450:w-56"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full w-full">
          {picUrl.length ? (
            picUrl.map((image, index) => (
              <Image
                width={180}
                height={180}
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`absolute aspect-square h-full w-full rounded-xl transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
              />
            ))
          ) : (
            <div className="-z-20 mx-auto mt-5 flex w-max flex-col items-center justify-center gap-4 300:mx-auto">
              <span className="rounded-xl bg-gray-500 px-5 py-5 300:px-20 300:py-10">
                <GrGallery className="text-5xl" />
              </span>
              <h2 className="w-max text-center text-xs font-medium">
                عکسی برای نمایش وجود ندارد
              </h2>
            </div>
          )}
        </div>
      </div>
      {picUrl.length > 0 && (
        <div className="mt-4">
          <button
            className="mx-2 rounded bg-blue-500 px-2 py-1 text-white dark:bg-cyan-500"
            onClick={nextSlide}
          >
            <IoIosArrowForward />
          </button>
          <button
            className="mx-2 rounded bg-blue-500 px-2 py-1 text-white dark:bg-cyan-500"
            onClick={prevSlide}
          >
            <IoIosArrowBack />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
