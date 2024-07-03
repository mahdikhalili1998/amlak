import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminPage from "@/components/template/AdminPage";
import AD from "@/models/ad";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function Admin() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-up");
  const user = await UserAmlak.findOne({ email: session.user.email });
  if (user.role !== "ADMIN") redirect("/dashbord");
  const ad = await AD.find({ published: false });
  return (
    <div>
      <AdminPage ad={ad}  />
    </div>
  );
}


export default Admin;
