const config = {
  images: {
    domains: ["rfxfsykqywfvnaeygmjn.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/send/otp/:slug*",
        destination: "https://console.melipayamak.com/api/send/otp/:slug*",
      },

    ];
  },
};

export default config;
