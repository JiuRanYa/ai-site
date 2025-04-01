'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
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

export const getProducts = async (page: number = 1, query?: string) => {
  const baseUrl = 'http://localhost:3001/api/products'
  const url = new URL(baseUrl)
  
  if (query) {
    url.searchParams.set('q', query)
  }
  url.searchParams.set('page', page.toString())
  url.searchParams.set('pageSize', '12')

  const res = await fetch(url)
  const data = await res.json() as ProductsResponse

  return data.data
}

// 添加 LoadingSpinner 组件
const LoadingSpinner = () => (
 <div className="flex items-center gap-3 my-8">
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
  <span className="text-gray-600">Loading more...</span>
 </div>
)

export default function ProjectCards() {
  const t = useTranslations('product')

  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadCount, setLoadCount] = useState(0)
  const [autoLoad, setAutoLoad] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)

  const resetAutoLoad = () => {
    setLoadCount(0)
    setAutoLoad(true)
  }

  const loadMore = async () => {
    if (loading || !hasMore || error) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await getProducts(page, query || undefined)
      setProducts(prev => [...prev, ...result.items])
      setHasMore(result.pagination.hasMore)
      setPage(prev => prev + 1)
      
      if (!autoLoad) {
        resetAutoLoad()
      } else {
        setLoadCount(prev => {
          const newCount = prev + 1
          if (newCount >= 3) {
            setAutoLoad(false)
          }
          return newCount
        })
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
      setError('加载失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const loadMoreCallback = useCallback(loadMore, [
    loading,
    hasMore,
    error,
    page,
    query,
    autoLoad
  ])

  useEffect(() => {
    setProducts([])
    setPage(1)
    resetAutoLoad()
    setHasMore(true)
    loadMoreCallback()
    window.scrollTo(0, 0)
  }, [query])

  useEffect(() => {
    if (!autoLoad) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreCallback()
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
  }, [hasMore, loading, autoLoad, loadMoreCallback])

  return (
   <div className="max-w-7xl mx-auto px-4">
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
    
    <div 
     ref={observerTarget} 
     className="w-full h-40 flex justify-center items-center"
    >
     {loading && <LoadingSpinner />}
     {error && (
      <div className="flex flex-col items-center gap-2">
       <div className="text-red-500 flex items-center gap-2">
        <svg 
         className="w-5 h-5" 
         fill="none" 
         viewBox="0 0 24 24" 
         stroke="currentColor"
            >
         <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
        </svg>
        <span>{error}</span>
       </div>
       <button 
        onClick={() => loadMoreCallback()}
        className="px-4 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
        <svg 
         className="w-4 h-4" 
         fill="none" 
         viewBox="0 0 24 24" 
         stroke="currentColor"
            >
         <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
        </svg>
        {t('retry')}
       </button>
      </div>
      )}
     {!loading && !error && hasMore && !autoLoad && (
      <button 
       onClick={loadMoreCallback}
       className="px-6 py-2 text-sm cursor-pointer text-white bg-black rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
       <svg 
        className="w-4 h-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         strokeWidth={2} 
         d="M19 9l-7 7-7-7" 
          />
       </svg>
       {t('loadMore')}
      </button>
    )}
     {!loading && !error && !hasMore && (
     <div className="text-gray-500 flex items-center gap-2">
      <svg 
       className="w-5 h-5" 
       fill="none" 
       viewBox="0 0 24 24" 
       stroke="currentColor"
        >
       <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M5 13l4 4L19 7" 
          />
      </svg>
      <span>已经到底啦</span>
     </div>
    )}
    </div>
   </div>
  )
} 