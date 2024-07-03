import AD from "@/models/ad";
import UserAmlak from "@/models/user";
import ConnectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await ConnectDB();
    const {
      title,
      picUrl,
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
      picUrl,
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
export async function PATCH(req) {
  try {
    await ConnectDB();
    const {
      adInfo: {
        _id,
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
      },
      id,
    } = await req.json();

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

    if (!user._id.equals(ad.userId)) {
      return NextResponse.json(
        {
          error: "دسترسی شما به این آگهی محدود شده است",
        },
        { status: 403 },
      );
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
    ad.title = title;
    ad.description = description;
    ad.location = location;
    ad.phone = phone;
    ad.price = price;
    ad.realState = realState;
    ad.constractionDate = constractionDate;
    ad.category = category;
    ad.rules = rules;
    ad.options = options;
    ad.save();
    return NextResponse.json(
      { message: "با موفقیت تغیر کرد" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "مشکلی در ارتباط با سرور پیش آمده است",
      },
      { status: 500 },
    );
  }
}
export async function GET(req) {
  try {
    await ConnectDB();
    const ad = await AD.find({ published: true }).select("-userId");
    return NextResponse.json({ data: ad }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "مشکلی در ارتباط با سرور پیش آمده است",
      },
      { status: 500 },
    );
  }
}
