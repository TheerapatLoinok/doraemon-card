/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theerapatloinok.github.io",
      },
    ],
  },
};

export default nextConfig;
