import "./globals.css";
import "../iransans.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
