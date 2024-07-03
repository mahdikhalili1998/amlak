import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import DashbordPage from "@/components/template/DashbordPage";

async function Dashbord() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const user = await UserAmlak.findOne({ email: session.user.email });
  return (
    <div>
      <DashbordPage time={user?.createAt} />
    </div>
  );
}

export default Dashbord;
