"use client";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
const LottiePlayer = dynamic(() => import("react-lottie-player"), {
  ssr: false,
});

function PageNotFound() {
  return (
    <div className="mx-auto flex w-max flex-col items-center gap-3">
      <h1 className="text-xl font-semibold">صفحه مورد نظر یافت نشد </h1>
      <Link
        className="flex flex-col items-center justify-center font-medium text-blue-600"
        href="/"
      >
        <LottiePlayer
          loop
          animationData={require("../lottie/404.json")}
          play
          style={{ width: 150, height: 150 }}
        />
        برو به صفحه اصلی
      </Link>
    </div>
  );
}

export default PageNotFound;
