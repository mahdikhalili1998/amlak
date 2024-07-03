import AddAdsPage from "@/components/template/AddAdsPage";
import AD from "@/models/ad";
import ConnectDB from "@/utils/connectDB";
import React from "react";

async function EditAdPage({ params: { adId } }) {
  //   console.log(props);
  await ConnectDB();
  const ad = await AD.findOne({ _id: adId });
  return (
    <div>
      <AddAdsPage data={ad} />
    </div>
  );
}

export const generateMetadata = async ({ params: { adId } }) => {
  await ConnectDB();
  const ad = await AD.findOne({ _id: adId });
  return {
    title: ad.title,
    description: ad.description,
  };
};
export default EditAdPage;
