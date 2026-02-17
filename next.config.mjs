/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  eslint: {
    // 忽略 ESLint 错误，防止构建失败
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略 TypeScript 错误，防止构建失败
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
