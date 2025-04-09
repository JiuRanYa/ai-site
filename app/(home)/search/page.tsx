'use client'
import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProjectCards from '../_components/ProjectCards'

function Title() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <h1 className="text-2xl font-medium text-gray-900">
      {query ? `搜索结果: "${query}"` : '所有作品'}
    </h1>
  )
}

export default function SearchPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Suspense>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <Title />
            </div>
            <ProjectCards />
          </div>
        </main>
      </div>
    </Suspense>
  )
} 