import AD from "@/models/ad";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectDB();
    const {
      title,
      description,
      location,
      phone,
      price,
      realState,
      constractionDate,
      category,
      rules,
      options,
    } = await req.json();
    // console.log(await req.json());
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }
    const user = await UserAmlak.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }
    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realState ||
      !constractionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "اطلاعات معتبر وارد کنید" },
        { status: 400 },
      );
    }
    const result = await AD.create({
      title,
      description,
      location,
      phone,
      price: +price,
      realState,
      constractionDate,
      category,
      rules,
      options,
      userId: new Types.ObjectId(user._id),
    });
    return NextResponse.json({
      message: "آگهی با موفقیت ایجاد شد",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "مشکلی در ارتباط با سرور پیش آمده است",
      status: 500,
    });
  }
}
