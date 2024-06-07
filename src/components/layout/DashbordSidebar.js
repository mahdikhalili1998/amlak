import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "../module/LogoutButton";

async function DashbordSidebar({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid-cols-sebyek grid">
      <div className="space-y-4 h-max justify-self-start rounded-lg px-4 py-4 shadow-xl shadow-blue-300">
        <div className="flex flex-col items-center gap-3 border-b-2 border-gray-400">
          <FaUserCircle className="text-[3rem] text-blue-600" />
          <span className="pb-1">{session?.user.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <Link href="/dashbord">حساب کاربری من</Link>
          <Link href="/dashbord/add-ads">ثبت آگهی</Link>
          <Link href="/dashbord/my-ads"> آگهی های من</Link>
        </div>
        <LogoutButton />
      </div>
      <div className="justify-self-center">{children}</div>
    </div>
  );
}

export default DashbordSidebar;
