import ConnectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import UserAmlak from "@/models/user";
import AD from "@/models/ad";
import MyAdPage from "@/components/template/MyAdPage";

async function MyAd() {
  await ConnectDB();
  const session = await getServerSession(authOptions);

  const user = await UserAmlak.findOne({ email: session.user.email });
  const { _id } = user;
  const ad = await AD.find({ userId: _id });

  return (
    <div className="">
      <MyAdPage data={ad} />
    </div>
  );
}

export default MyAd;
