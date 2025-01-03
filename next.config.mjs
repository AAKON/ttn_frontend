/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ttn.technostupid.com',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'admin.thetextilenetwork.com',
                pathname: '**',
            }
        ]
    },
};

export default nextConfig;
