/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  redirects: async () => [
    // Redirect old pages to home
    { source: '/skills', destination: '/interventions', permanent: true },
    { source: '/skills/:path*', destination: '/interventions', permanent: true },
    { source: '/tools', destination: '/', permanent: true },
    { source: '/tools/:path*', destination: '/', permanent: true },
    { source: '/directory', destination: '/', permanent: true },
    { source: '/blog', destination: '/cases', permanent: true },
    { source: '/blog/:path*', destination: '/cases', permanent: true },
    { source: '/how-it-works', destination: '/interventions', permanent: true },
    { source: '/faq', destination: '/audit', permanent: true },
    { source: '/about', destination: '/', permanent: true },
    { source: '/buy', destination: '/audit', permanent: true },
    { source: '/buy/:path*', destination: '/audit', permanent: true },
    { source: '/deploy', destination: '/', permanent: true },
    { source: '/run', destination: '/', permanent: true },
    { source: '/dashboard', destination: '/', permanent: true },
    { source: '/login', destination: '/', permanent: true },
    { source: '/register', destination: '/', permanent: true },
  ],
};

export default nextConfig;
