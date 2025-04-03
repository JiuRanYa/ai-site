import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from './(home)/_components/Header'
import Footer from './(home)/_components/Footer'
import { notFound } from 'next/navigation'
import { routing } from '@/core/i18n/routing'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import Providers from './providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
 title: 'Nexus AI Directory | Discover & Compare Top AI Tools',
 description: 'Explore curated AI tools for coding, design, and content creation. Find, compare, and choose the best AI solutions for your needs. Updated daily with the latest AI innovations.',
 icons: {
   icon: [
     {
       url: '/favicon/favicon-32x32.png',
       sizes: '32x32',
       type: 'image/png'
     },
     {
       url: '/favicon/favicon-16x16.png',
       sizes: '16x16',
       type: 'image/png'
     }
   ],
   apple: {
     url: '/favicon/apple-touch-icon.png',
     sizes: '180x180',
     type: 'image/png'
   },
   other: [
     {
       rel: 'android-chrome',
       url: '/favicon/android-chrome-192x192.png',
       sizes: '192x192',
       type: 'image/png'
     },
     {
       rel: 'android-chrome',
       url: '/favicon/android-chrome-512x512.png',
       sizes: '512x512',
       type: 'image/png'
     }
   ]
 },
 verification: {
   google: '0y2HH_Tp_TjmeR1iqVxeOMiJujmf5ZlpW3dDGmKpuZ4',
 },
 keywords: [
   // 主要关键词
   'AI directory',
   'artificial intelligence tools',
   
   // 功能相关
   'code generation',
   'image generation',
   'writing assistant',
   
   'coding tools',
   'design tools',
   
   'AI tools ranking',
   'best AI tools'
 ],
 openGraph: {
   title: 'Nexus AI Directory | Discover & Compare Top AI Tools',
   description: 'Explore curated AI tools for coding, design, and content creation. Find, compare, and choose the best AI solutions for your needs.',
   type: 'website',
   url: 'https://nexus.skin',
   images: ['https://nexus.skin/favicon/android-chrome-512x512.png'],
   siteName: 'Nexus AI Directory',
 },
 twitter: {
   card: 'summary_large_image',
   site: '@nexus_skin',
   title: 'Nexus AI Directory | Discover & Compare Top AI Tools',
   description: 'Explore curated AI tools for coding, design, and content creation. Find, compare, and choose the best AI solutions for your needs.',
   images: ['https://nexus.skin/favicon/android-chrome-512x512.png'],
 },
}

export default async function RootLayout({
 children,
 params
}: {
 children: React.ReactNode
 params: { locale: string }
}) {
   // Ensure that the incoming `locale` is valid
   const {locale} = await params
   if (!hasLocale(routing.locales, locale)) {
     notFound()
   }

 return (
  <html lang={locale}>
   <body className={inter.className}>
    <Script
     src="https://www.googletagmanager.com/gtag/js?id=G-M5N0MVWPH9"
     strategy="afterInteractive"
      />
    <Script id="google-analytics" strategy="afterInteractive">
     {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M5N0MVWPH9');
        `}
    </Script>

    <Providers>
     <NextIntlClientProvider>
      <div className="flex flex-col min-h-screen">
       <Header />
       <main className="flex-grow">
        {children}
       </main>
       <Footer />
      </div>
     </NextIntlClientProvider>
    </Providers>
   </body>
  </html>
 )
}
