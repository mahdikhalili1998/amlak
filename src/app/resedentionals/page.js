import ResedentionalsPage from "@/components/template/ResedentionalsPage";

export default async function Resedentionals({ searchParams }) {
//   console.log(searchParams);
  const res = await fetch(" http://localhost:3000/api/add-ad", {
    cache: "no-store",
  });
  const data = await res.json();
  let finalData = data.data;

  if (searchParams.category) {
    finalData = finalData.filter(
      (item) => item.category === searchParams.category,
    );
  }

  return <ResedentionalsPage data={finalData} />;
}
