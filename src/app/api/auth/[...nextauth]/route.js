import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/nextPass";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProviders({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await ConnectDB();
        } catch (error) {
          throw new Error("مشکل در اتصال به دیتا بیس");
        }
        if (!email || !password) throw new Error("اطلاعات را درست وارد کنید ");
        const user = await UserAmlak.findOne({ email });
        if (!user) throw new Error("ابتدا یک حساب برای خود بسازید");
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("رمز عبور و یا نام کاربری اشتباه است ");
        console.log(email);
        return { email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
