import Link from "next/link";
import React from "react";

function PageNotFound() {
  return (
    <div className="mx-auto flex w-max flex-col items-center gap-3">
      <h1 className="text-xl font-semibold">صفحه مورد نظر یافت نشد </h1>
      <Link className="font-medium text-blue-600" href="/">
        {" "}
        برو به صفحه اصلی
      </Link>
    </div>
  );
}

export default PageNotFound;
