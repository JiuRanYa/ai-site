'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProjectCards from '../(home)/_components/ProjectCards'
export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
   <div className="flex flex-col min-h-screen">
    <main className="flex-1">
     <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
       <h1 className="text-2xl font-medium text-gray-900">
        {query ? `搜索结果: "${query}"` : '所有作品'}
       </h1>
      </div>
      <ProjectCards initialData={{
        items: [],
        pagination: {
          hasMore: false,
          total: 0
        }
      }} />
     </div>
    </main>
   </div>
  )
} 