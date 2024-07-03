import "./globals.css";
import "../iransans.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { FcHome } from "react-icons/fc";

export const metadata = {
  title: "خرید و فروش ملک",
  description:
    "خرید ، رهن  و اجاره ی دفتر ، مغازه ، ویلا و آپارتمان با قیمت مناسب و شرایط عالی",
  icons: { icon: "./favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="fn">
      <body className="mx-auto max-w-[1300px] font-iranText">
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
