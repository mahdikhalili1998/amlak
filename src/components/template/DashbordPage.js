import React from "react";

function DashbordPage({ time }) {
  console.log(time);
  return (
    <div className="my-auto h-max space-y-2">
      <h2>سلام 🖐</h2>
      <p>آگهی خود را به اشتراک بگذارید تا صدها نفر دیگر هم آن را ببینند </p>
      <div className="flex w-max items-center gap-2 rounded-lg bg-blue-300 px-2 py-1 text-blue-800">
        <span> تاریخ عضویت : </span>
        <span>{new Date(time).toLocaleDateString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default DashbordPage;
