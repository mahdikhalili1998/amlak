import ResedentionalsPage from "@/components/template/ResedentionalsPage";

export default async function Resedentionals({ searchParams }) {
  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-ad`;

  const res = await fetch(url, {
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
