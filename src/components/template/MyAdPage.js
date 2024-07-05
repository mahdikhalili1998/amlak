import React from "react";
import AdCard from "../module/AdCard";
import AdCardBt from "../module/AdCardBt";

function MyAdPage({ data }) {
  return (
    <div className="space-y-8 sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-x-8 sm:gap-y-4">
      {data.length ? (
        data.map((item) => (
          <div className="mx-auto flex w-max flex-col items-center gap-3 rounded-lg px-4 py-3 shadow-xl shadow-blue-300">
            <AdCard data={item} key={item._id} />
            <AdCardBt data={item} />
          </div>
        ))
      ) : (
        <h2 className="text-center font-medium text-red-700">
          هیچ آگهی وجود ندارد{" "}
        </h2>
      )}
    </div>
  );
}

export default MyAdPage;
