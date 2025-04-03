import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from './(home)/_components/Header'
import Footer from './(home)/_components/Footer'
import { notFound } from 'next/navigation'
import { routing } from '@/core/i18n/routing'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
 title: 'Nexus, find the best AI tools',
 description: 'Nexus is a platform for discovering and sharing the best AI tools for designers and developers.',
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
