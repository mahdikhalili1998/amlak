import "./globals.css";
// import "../iransans.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { ThemeProvider } from "@/components/theme/Dark";
import DarkBt from "@/components/template/DarkBt";

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
          <ThemeProvider>
            <Layout>{children}</Layout>
            {/* <DarkBt /> */}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
