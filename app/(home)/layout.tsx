import Header from '@/app/(home)/_components/Header'
import Footer from '@/app/(home)/_components/Footer'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
     {children}
    </main>
    <Footer />
   </div>
  )
}