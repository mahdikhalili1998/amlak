import DashbordSidebar from "@/components/layout/DashbordSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function layout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  return (
    <div className="mx-5 ">
      <DashbordSidebar>{children}</DashbordSidebar>
    </div>
  );
}

export default layout;
