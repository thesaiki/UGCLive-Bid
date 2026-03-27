/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ugclive/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
