/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sfycdn.speedsize.com'
            }
        ],
    },
};

export default nextConfig;
