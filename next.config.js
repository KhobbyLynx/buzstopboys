/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.mdx': ['mdx-loader'],
      },
    },
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin-allow-popups',
        },
        // {
        //   key: 'Content-Security-Policy',
        //   value: `
        //     default-src 'self';
        //     script-src 'self'
        //       https://checkout.paystack.com
        //       https://js.paystack.co
        //       https://www.googletagmanager.com
        //       https://api.iconify.design
        //       'unsafe-inline';
        //     connect-src 'self' https://api.paystack.co https://api.iconify.design;
        //     frame-src https://checkout.paystack.com;
        //     img-src 'self' data: https://api.iconify.design;
        //     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        //     font-src 'self' https://fonts.gstatic.com https://api.iconify.design;
        //     object-src 'none';
        //     media-src 'self';
        //     sandbox allow-popups allow-scripts allow-same-origin;
        //     upgrade-insecure-requests
        //   `.replace(/\n/g, ''),
        // },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(self), microphone=()',
        },
      ],
    },
  ],
}

module.exports = nextConfig
