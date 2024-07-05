/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ["rfxfsykqywfvnaeygmjn.supabase.co"],
  },
  webpack: (config, { isServer }) => {
    // اضافه کردن فایل‌های فونت به فهرست فایل‌های قابل بارگذاری وب‌سرور
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "font/woff/", // مسیری که فایل‌های فونت در آن قرار می‌گیرند
        },
      },
    });

    return config;
  },
};

export default config;
