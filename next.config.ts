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
  }
}
 
const withNextIntl = createNextIntlPlugin('./core/i18n/request.ts')
export default withNextIntl(nextConfig)
