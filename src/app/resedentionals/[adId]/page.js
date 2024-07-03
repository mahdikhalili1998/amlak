import AdDetailsPage from "@/components/template/AdDetailsPage";
import AD from "@/models/ad";
import ConnectDB from "@/utils/connectDB";

function AdDetails({ params: { adId } }) {
  return (
    <>
      <AdDetailsPage id={adId} />
    </>
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
export default AdDetails;
