import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/nextPass";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectDB();

    const { email, password } = await req.json();
    console.log(email, password);

    if (!email || !password) {
      return NextResponse.json({
        error: "اطلاعات درست را وارد کنید",
        status: 422,
      });
    }
    const hashPass = await hashPassword(password);
    const existedUser = await UserAmlak.findOne({ email });
    // console.log(existedUser);
    if (existedUser) {
      return NextResponse.json({ error: "این کاربر وجود دارد", status: 422 });
    }
    const newUser = await UserAmlak.create({
      email: email,
      password: hashPass,
    });

    return NextResponse.json({
      message: "کاربر با موفقیت ایجاد شد",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "مشکلی در سرور رخ داده است",
      status: 500,
    });
  }
}
