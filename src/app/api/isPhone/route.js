import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectDB();
    const { phoneNumber } = await req.json();
    const user = await UserAmlak.find({ phone: phoneNumber });

    if (!user.length)
      return NextResponse.json({ message: "کاربر یافت نشد " }, { status: 400 });
    const [userEmail] = user;
    userEmail.phone = phoneNumber;
    const { email } = userEmail;
    // console.log({ user, email });
    return NextResponse.json(
      { message: "کاربر یافت شد", email },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "مشکلی در سرور پیش آمده است" },
      { status: 505 },
    );
  }
}
