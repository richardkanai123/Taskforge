import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ui-avatars.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "randomuser.me",
				pathname: "**",
			},
		],
  },
  
  // disable type check on building
  typescript: {
   
    ignoreBuildErrors: true
 }
};

export default nextConfig;
