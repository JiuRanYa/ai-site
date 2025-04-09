import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'sgltrnagsnfqiependff.supabase.co'
      },
      {
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  },
  reactStrictMode: false,
}

const withNextIntl = createNextIntlPlugin('./core/i18n/request.ts')
export default withNextIntl(nextConfig)
