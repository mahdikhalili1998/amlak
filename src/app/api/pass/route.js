import { removeQuotes } from "@/funcs/helper";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/nextPass";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await ConnectDB();
    const { email, pass } = await req.json();

    const userEmail = removeQuotes(email);
    const user = await UserAmlak.findOne({ email: userEmail });
    if (!user)
      return NextResponse.json(
        { message: "کاربر یافت نشد مجددا سعی کنید" },
        { status: 422 },
      );

    user.password = await hashPassword(pass);
    user.save();
    return NextResponse.json(
      { message: "تغیر رمز با موفقیت صورت گرفت " },
      { status: 202 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "" }, { status: 500 });
  }
}
