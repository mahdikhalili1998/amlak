import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SinginPage from "@/components/template/Singin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Signin() {

  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <>
      <SinginPage />
    </>
  );
}

export default Signin;
