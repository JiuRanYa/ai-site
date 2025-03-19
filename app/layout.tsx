import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
 title: 'AI For Developer - 发现优质AI工具资源',
 description: '探索精选的人工智能工具和平台，帮助您提高效率、激发创造力并解决各种挑战',
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
  <html lang="zh-CN">
   <body className={inter.className}>
    <Header />
    {children}
   </body>
  </html>
 )
}
