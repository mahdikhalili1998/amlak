import AD from "@/models/ad";
import ConnectDB from "@/utils/connectDB";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { SiHomebridge } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { sp } from "@/utils/replaceNumber";
import { FaCalendarWeek } from "react-icons/fa";
import ShareBt from "../module/ShareBt";
import Comments from "./Comments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommentDetail from "../module/CommentDetail";
import UserAmlak from "@/models/user";
import { category, icons } from "@/constant/data";
import Swipper from "./Swipper";

async function AdDetailsPage({ id }) {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const ad = await AD.find({ _id: id });
  const [ads] = await AD.find({ _id: id });
  const [user] = await UserAmlak.find({ _id: ads.userId });

  if (!ad) return <h2>مشکلی پیش آمده است !</h2>;
  // console.log(ad);
  return (
    <div>
      {ad.map((item) => (
        <div
          className="items-center justify-between space-y-8 px-5 md:flex md:items-start"
          key={item._id}
        >
          <div className="space-y-7 px-1">
          <Swipper ad={JSON.parse(JSON.stringify(ad))} />
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-lg font-semibold text-blue-600">
                {item.title}
              </h2>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <FaLocationDot className="-mt-[4px] text-[12px]" />{" "}
                {item.location}
              </span>
            </div>
            <div>
              <h2 className="border-b-2 border-blue-200 pb-1 text-sm font-semibold text-blue-600 md:mb-4 md:w-max md:px-2 md:py-1 md:text-lg">
                توضیحات
              </h2>
              <p className="pt-1 text-xs font-medium md:text-base">
                {item.description}
              </p>
            </div>
            <div>
              {" "}
              <h2 className="border-b-2 border-blue-200 pb-1 text-sm font-semibold text-blue-600 md:mb-4 md:w-max md:px-2 md:py-1 md:text-lg">
                امکانات رفاهی
              </h2>
              {item.options.length ? (
                <ul className="list-disc space-y-2 pt-2 font-medium">
                  {item.options.map((item, index) => (
                    <li
                      className="flex items-center gap-2 pr-2 text-xs md:text-base"
                      key={index}
                    >
                      <FaCircle className="text-[4px] text-blue-700" /> {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <h3 className="pt-2 text-xs font-medium text-red-500 md:text-base">
                  هیچ موردی ذکر نشده است
                </h3>
              )}
            </div>
            <div>
              {" "}
              <h2 className="border-b-2 border-blue-200 pb-1 text-sm font-semibold text-blue-600 md:mb-4 md:w-max md:px-2 md:py-1 md:text-lg">
                قوانین
              </h2>
              {item.rules.length ? (
                <ul className="list-disc space-y-2 pt-2 font-medium">
                  {item.rules.map((item, index) => (
                    <li
                      className="flex items-center gap-2 pr-2 text-xs md:text-base"
                      key={index}
                    >
                      <FaCircle className="text-[4px] text-blue-700" /> {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <h3 className="pt-2 text-xs font-medium text-red-500 md:text-base">
                  هیچ موردی ذکر نشده است
                </h3>
              )}
            </div>
          </div>
          <div className="space-y-7 px-1">
            <div className="mx-auto flex w-max items-center justify-center gap-10 rounded-xl px-4 py-5 shadow-xl shadow-blue-300">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium">
                  املاک {item.realState}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <FaPhone className="-mt-1 text-blue-600" /> {item.phone}
                </span>
              </div>
              <SiHomebridge className="text-4xl text-blue-600" />
            </div>
            <div className="mx-auto flex w-max flex-col items-center justify-center gap-5 rounded-xl px-8 py-5 shadow-xl shadow-blue-300">
              <div className="flex items-center gap-2">
                <span className="text-[20px] text-blue-600">
                  {icons[item.category]}
                </span>
                <span className="pt-1 text-sm font-medium">
                  {category[item.category]}
                </span>
              </div>
              <p className="text-sm text-gray-500">{sp(item.price)} تومان </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <FaCalendarWeek className="-pb-2 text-blue-600" />
                {new Date(item.constractionDate).toLocaleDateString(
                  "fa-ir",
                )}{" "}
              </p>
            </div>
            <ShareBt />
            <Comments
              session={JSON.parse(JSON.stringify(session))}
              id={JSON.parse(JSON.stringify(id))}
            />

            <CommentDetail
              email={JSON.parse(JSON.stringify(user.email))}
              id={JSON.parse(JSON.stringify(id))}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdDetailsPage;
