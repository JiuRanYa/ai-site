import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'sgltrnagsnfqiependff.supabase.co'
      }
    ]
  },
  webpack: (config) => {
    return config
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

const withNextIntl = createNextIntlPlugin('./core/i18n/request.ts')
export default withNextIntl(nextConfig)
