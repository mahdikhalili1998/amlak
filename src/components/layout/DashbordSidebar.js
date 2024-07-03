import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Profile from "../module/Profile&Email";
import { redirect } from "next/navigation";
import ConnectDB from "@/utils/connectDB";
import UserAmlak from "@/models/user";

async function DashbordSidebar({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sing-up");
  await ConnectDB();
  const user = await UserAmlak.findOne({ email: session.user.email });

  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-sebyek">
      <div className="h-max space-y-4 justify-self-start rounded-lg px-4 py-4 md:flex md:flex-col md:shadow-xl md:shadow-blue-300">
        <div className="flex flex-col items-center gap-2">
          <Profile email={user?.email} role={user.role} />
        </div>
        <div className="flex flex-col items-center justify-between gap-2 text-base">
          <Link
            className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-white"
            href="/dashbord"
          >
            حساب کاربری من
          </Link>
          <Link
            className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-white"
            href="/dashbord/add-ads"
          >
            ثبت آگهی
          </Link>
          <Link
            className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-white"
            href="/dashbord/my-ads"
          >
            {" "}
            آگهی های من
          </Link>
          {user.role === "ADMIN" ? (
            <Link
              className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-white"
              href="/dashbord/admin"
            >
              آگهی های در انتظار تایید
            </Link>
          ) : null}
          {user.role === "ADMIN" ? (
            <Link
              className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-white"
              href="/dashbord/admin/comments"
            >
              سوال های در انتظار تایید
            </Link>
          ) : null}
        </div>
      </div>

      <div className="justify-self-center">{children}</div>
    </div>
  );
}

export default DashbordSidebar;
