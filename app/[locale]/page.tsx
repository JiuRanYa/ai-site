import Hero from '@/app/[locale]/(home)/_components/Hero'
import Header from '@/app/[locale]/(home)/_components/Header'
import Footer from '@/app/[locale]/(home)/_components/Footer'

export default function Home() {
 return (
  <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
   <Header />
   <Hero />
   <Footer />
  </main>
 )
}
