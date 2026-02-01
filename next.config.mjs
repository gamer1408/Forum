/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint xatolarini o'tkazib yuborish
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript xatolarini o'tkazib yuborish
  },
};
export default nextConfig;
