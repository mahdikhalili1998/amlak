import React from "react";
import AdCard from "../module/AdCard";
import Link from "next/link";
import Category from "../module/Category";

function ResedentionalsPage({ data }) {
 
  return (
    <div className="lg:flex lg:justify-between lg:px-10">
      <Category />
      {data?.length ? null : (
        <h1 className="text-center text-sm font-semibold text-red-500">
          هیچ آگهی یافت نشد !{" "}
        </h1>
      )}

      <div className="flex flex-col gap-8 650:grid 650:grid-cols-2 800:grid-cols-3 xl:grid-cols-4">
        {data?.map((item) => (
          <div
            key={item._id}
            className="mx-auto flex w-max flex-col gap-2 rounded-lg px-4 py-4 shadow-xl shadow-blue-300"
          >
            <AdCard data={item} />
            <Link
              className="mx-auto w-max text-xs font-semibold text-blue-800"
              href={`/resedentionals/${item._id}`}
            >
              مشاهده آگهی
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResedentionalsPage;
