/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable React Strict Mode in development
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sfycdn.speedsize.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com'
            }
        ],
    },
};

export default nextConfig;