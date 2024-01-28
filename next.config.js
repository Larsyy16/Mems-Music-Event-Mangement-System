/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['memsbucket2024.s3.us-east-2.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'memsbucket2024.s3.us-east-2.amazonaws.com',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
