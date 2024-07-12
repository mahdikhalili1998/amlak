import CommentsPage from "@/components/template/CommentsPage";
import ConnectDB from "@/utils/connectDB";
import Comments from "@/models/comment";

async function Commentspage() {
  await ConnectDB();
  const cm = await Comments.find({ published: false });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        {!cm.length ? (
          <h2 className="flex justify-center text-sm font-semibold text-red-500 dark:text-red-400">
            سوال تایید نشده ای موجود نیست !
          </h2>
        ) : (
          cm.map((item) => (
            <CommentsPage
              key={item._id}
              data={JSON.parse(JSON.stringify(item))}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Commentspage;
