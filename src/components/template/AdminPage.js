import React from "react";
import AdCard from "../module/AdCard";
import { deleteHandlerd } from "@/funcs/helper";
import PublishBt from "../module/PublishBt";

function AdminPage({ ad }) {
  return (
    <div className="space-y-7">
      {ad.map((item) => (
        <div
          key={item._id}
          className="mx-auto flex w-max flex-col gap-3 rounded-lg px-6 py-3 shadow-xl shadow-blue-300 dark:shadow-cyan-800"
        >
          <AdCard key={item._id} data={JSON.parse(JSON.stringify(item))} />
          <PublishBt id={JSON.parse(JSON.stringify(item._id))} />
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
