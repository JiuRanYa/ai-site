'use client'
import { useSearchParams } from 'next/navigation'
import SearchBar from '../(home)/_components/SearchBar'
import ProjectCards from '../(home)/_components/ProjectCards'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
   <div className="flex flex-col min-h-screen">

    <main className="flex-1">
     <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
       <h1 className="text-2xl font-medium text-gray-900">
        {query ? `搜索结果: "${query}"` : '所有作品'}
       </h1>
      </div>
      <ProjectCards query={query || ''} />
     </div>
    </main>
   </div>
  )
} 