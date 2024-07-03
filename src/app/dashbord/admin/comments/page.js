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
          <h2 className="font-semibold text-red-500">
            هیچ سوالی از سمت کاربران نیست
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
