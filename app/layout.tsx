import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
 title: 'AI Source - 发现最佳AI工具和资源',
 description: '探索世界顶级AI工具，提升设计和开发效率',
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
  <html lang="zh-CN">
   <body className={inter.className}>
    <div className="flex flex-col min-h-screen">
     <Header />
     <main className="flex-grow">
      {children}
     </main>
     <Footer />
    </div>
   </body>
  </html>
 )
}
