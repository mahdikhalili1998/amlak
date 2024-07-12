import React from "react";

function DashbordPage({ time }) {
  return (
    <div className="flex flex-col items-center gap-2 text-sm">
      <h2 className="dark:text-white">سلام 🖐</h2>
      <p className="dark:text-white">
        آگهی خود را به اشتراک بگذارید تا صدها نفر دیگر هم آن را ببینند{" "}
      </p>
      <div className="mx-auto flex w-max items-center gap-2 rounded-lg bg-blue-300 px-2 py-1 text-blue-800 dark:bg-cyan-600">
        <span className="dark:text-white"> تاریخ عضویت : </span>
        <span className="dark:text-white">
          {new Date(time).toLocaleDateString("fa-IR")}
        </span>
      </div>
    </div>
  );
}

export default DashbordPage;
