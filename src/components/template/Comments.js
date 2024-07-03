import Link from "next/link";
import CommentBox from "../module/CommentBox";

function Comments({ session, id }) {
  return (
    <div className="rounded-xl px-2 py-3 shadow-xl shadow-blue-300">
      <h1 className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <span className="font-se mt-3 text-lg text-red-500">*</span>
        سوال از مشاوران ما :
      </h1>
      {!session ? (
        <div className="flex flex-col items-center justify-center gap-4 font-medium">
          <span className="text-xs/6 font-medium">
            برای ارتباط با مشاورین داشتن حساب الزامی است .{" "}
          </span>
          <Link className="text-xs font-medium text-blue-600" href="/sign-up">
            برای ساخت حساب کلیک کنید !
          </Link>
          {}
        </div>
      ) : (
        <CommentBox id={JSON.parse(JSON.stringify(id))} />
      )}
    </div>
  );
}

export default Comments;
