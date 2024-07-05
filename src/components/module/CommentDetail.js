import { maskEmail } from "@/funcs/helper";
import Comments from "@/models/comment";
import ConnectDB from "@/utils/connectDB";

async function CommentDetail({ email, id }) {
  await ConnectDB();
  const cms = await Comments.find({ ad_id: id });

  return (
    <div className="space-y-6">
      {cms.length ? (
        <h2 className="mx-auto w-max border-b-2 border-blue-600 px-2 py-1 text-sm font-medium text-blue-600">
          سوالات اخیر
        </h2>
      ) : null}
      {!cms.length
        ? null
        : cms.map((item, index) => (
            <div className="" key={index}>
              {item.published ? (
                <div
                  key={item._id}
                  className="mb-10 rounded-xl px-1 py-4 shadow-xl shadow-blue-300"
                >
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="mt-[3px] font-semibold">
                      {maskEmail(item.email)}
                    </span>
                    <span className="rounded-[100%] border-[3px] border-cyan-500 bg-gray-600 px-2 py-1 text-xs text-white">
                      {item.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-5 p-4">
                    <div>
                      <div className="chat-container text-xs">
                        <p className="chat-bubble user-message relative mb-4 mr-auto w-40 rounded-lg bg-green-200 p-3 450:w-56 sm:w-64">
                          {item.text}
                        </p>
                        <p className="chat-bubble other-message relative mb-4 ml-auto w-40 rounded-lg bg-blue-200 p-3 450:w-56 sm:w-64">
                          {item.adminAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
    </div>
  );
}

export default CommentDetail;
