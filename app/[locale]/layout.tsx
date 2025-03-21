import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/core/components/Header'
import Footer from '@/core/components/Footer'
import { notFound } from 'next/navigation'
import { routing } from '@/core/i18n/routing'
import {NextIntlClientProvider, Locale, hasLocale} from 'next-intl'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
 title: 'AI Source - 发现最佳AI工具和资源',
 description: '探索世界顶级AI工具，提升设计和开发效率',
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
  <html lang="zh-CN">
   <body className={inter.className}>
    <NextIntlClientProvider>
     <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
       {children}
      </main>
      <Footer />
     </div>
    </NextIntlClientProvider>
   </body>
  </html>
 )
}
