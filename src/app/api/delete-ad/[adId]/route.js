import AD from "@/models/ad";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, context) {
  try {
    await ConnectDB();
    const id = context.params.adId;
    const session = await getServerSession(authOptions);
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
    const ad = await AD.findOne({ _id: id });
    // console.log(ad);
    if (!user._id.equals(ad.userId)) {
      return NextResponse.json(
        {
          error: "دسترسی شما به این آگهی محدود شده است",
        },
        { status: 403 },
      );
    }
    await ad.deleteOne({ _id: id });
    return NextResponse.json(
      { message: "آگهی با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "مشکلی در ارتباط با سرور پیش آمده است",
      status: 500,
    });
  }
}
