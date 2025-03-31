'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
// 定义产品类型
type Product = {
  id: string
  title: string
  url: string
  preview?: string
  image?: string
  description?: string
  tags?: string[]
}

type ProductsResponse = {
  data: {
    items: Product[]
    pagination: {
      hasMore: boolean
      total: number
    }
  }
}

export const getProducts = async (category?: string, page: number = 1) => {
  const baseUrl = 'http://localhost:3001/api/products'
  const url = new URL(baseUrl)
  
  if (category) {
    url.searchParams.set('category', category)
  }
  url.searchParams.set('page', page.toString())

  const res = await fetch(url)
  const data = await res.json() as ProductsResponse

  return data.data
}

export default function ProjectCards({
  category
}: {
  category?: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMore = async () => {
    if (loading || !hasMore || error) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await getProducts(category, page)
      setProducts(prev => [...prev, ...result.items])
      setHasMore(result.pagination.hasMore)
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Failed to load more products:', error)
      setError('加载失败，请稍后重试')
      // 保持 hasMore 为 true，这样用户可以重试
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 首次加载数据
    loadMore()
  }, [category])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasMore, loading])

  return (
   <div className="max-w-7xl mx-auto px-4 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
     {products?.map((product: Product, index: number) => (
      <div
       key={`${product.id}-${index}`}
       className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
          >
       <div className="aspect-[4/3] w-full bg-gray-100 relative">
        {product.image ? (
         <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
          loading="lazy"
         />
        ) : (
         <div className="w-full h-full flex items-center justify-center text-gray-400">
          <svg
           className="w-12 h-12"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
            >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
          </svg>
         </div>
        )}
       </div>

       <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
         <Link
          href={product.url}
          target="_blank"
          className="block group"
         >
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
           {product.title}
          </h3>
          {product.description && (
           <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
           </p>
          )}
         </Link>
         <div className="flex flex-wrap gap-2">
          {product.tags?.map((tag: string) => (
           <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
           >
            {tag}
           </span>
          ))}
         </div>
        </div>
       </div>
      </div>
        ))}
    </div>
    
    {/* 固定高度的加载状态容器 */}
    <div 
     ref={observerTarget} 
     className="w-full h-20 flex justify-center items-center"
    >
     {loading && (
      <div className="text-gray-500">加载中...</div>
      )}
     {error && (
      <div className="flex flex-col items-center gap-2">
       <div className="text-red-500">{error}</div>
       <button 
        onClick={() => loadMore()}
        className="px-4 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800"
          >
        重试
       </button>
      </div>
      )}
     {!loading && !error && !hasMore && (
      <div className="text-gray-500">没有更多数据了</div>
      )}
    </div>
   </div>
  )
} 