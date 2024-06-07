import ConnectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import UserAmlak from "@/models/user";

async function MyAd() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const user = await UserAmlak.aggregate([
    { $match: { email: session.user.email } },
    {
      $lookup: {
        from: "ad",
        foreignField: "userId",
        localField: "_id",
        as: "theAds",
      },
    },
    console.log(user),
  ]);
  return <div>MyAd</div>;
}

export default MyAd;
