import AD from "@/models/ad";
import Comments from "@/models/comment";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    await ConnectDB();
    const id = context.params.id;
    const cms = await Comments.deleteOne({ _id: id });
    return NextResponse.json(
      { message: "آگهی با موفقیت حذف شد" },
      { status: 202 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "مشکلی در ارتباط با سرور پیش آمده است",
      status: 500,
    });
  }
}
export async function PATCH(req, context) {
  try {
    await ConnectDB();
    const id = context.params.id;
    const { adminCm } = await req.json();
    if (!adminCm)
      return NextResponse.json(
        { message: "نمیتوانید بدون جواب دادن منتشر کنید" },
        { status: 404 },
      );
    const cms = await Comments.findOne({ _id: id });
    cms.published = true;
    cms.adminAnswer = adminCm;
    cms.save();
    return NextResponse.json({ messge: "کامنت منتشر شد", status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "مشکلی در ارتباط با سرور پیش آمده است",
      status: 500,
    });
  }
}
export async function POST(req, context) {
  try {
    await ConnectDB();
    const { cm } = await req.json();
    const id = context.params.id;
    console.log(id);
    if (!cm) {
      return NextResponse.json(
        { message: "متن کامنت نباید خالی باشد" },
        { status: 422 },
      );
    }
    const ad = await AD.findOne({ _id: id });

    const session = await getServerSession(req);
    const user = await UserAmlak.findOne({ email: session.user.email });
    const cms = await Comments.create({
      text: cm,
      email: session.user.email,
      ad_id: new Types.ObjectId(ad._id),
      userId: new Types.ObjectId(user._id),
    });
    return NextResponse.json({ message: "حله حاجی" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "مشکلی در ارتباط با سرور پیش آمده است" },
      { status: 500 },
    );
  }
}
