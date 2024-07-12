const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// تنظیمات برای Proxy Middleware
const proxyOptions = {
  target: "https://console.melipayamak.com", // آدرس سرور API
  changeOrigin: true, // تغییر مبدا اصلی درخواست
  pathRewrite: {
    "^/send-sms": "/api/send/otp/b56cb348f246442598aef8e5a96a18e9", // تغییر مسیر درخواست
  },
};

// استفاده از Middleware برای مسیر مورد نظر
app.use("/send-sms", createProxyMiddleware(proxyOptions));

// اجرای سرور
const port = 3000;
app.listen(port, () => {
  console.log(`سرور اجرا شد در http://localhost:${port}`);
});
