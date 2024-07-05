import AD from "@/models/ad";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  try {
    await ConnectDB();
    const id = context.params.adId;
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }
    const user = await UserAmlak.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 },
      );
    }
    const ad = await AD.findOne({ _id: id });
    ad.published = true;
    ad.save();
    return NextResponse.json(
      { message: "با موفقیت منتشر شد" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "در ارتباط با سرور مشکلی پیش آمده است" },
      { status: 500 },
    );
  }
}
export async function DELETE(req, context) {
  try {
    await ConnectDB();
    const id = context.params.adId;
    const ad = await AD.deleteOne({ _id: id });
    return NextResponse.json({ message: "ok" }, { status: 202 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "مشکلی در سمت سرور پیش  آمده است " },
      { status: 500 },
    );
  }
}
