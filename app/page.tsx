import Hero from '@/components/Hero'
import CategoryNav from '@/components/CategoryNav'
import ResourceGrid from '@/components/ResourceGrid'

export default function Home() {
 return (
  <main className="bg-pink-50">
   <Hero />
   <div id="resources" className="container mx-auto px-4 py-16">
    <CategoryNav />
    <ResourceGrid />
   </div>
  </main>
 )
}
