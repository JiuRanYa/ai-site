/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Link from 'next/link'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { fetchProducts } from '@/core/api/products'
import { Product } from '@/core/api/products'

// 添加 LoadingSpinner 组件
const LoadingSpinner = () => (
  <div className="flex items-center gap-3 my-8">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
    <span className="text-gray-600">Loading more...</span>
  </div>
)

// 产品卡片组件
const ProductCard = ({ product, onTagClick }: { product: Product; onTagClick: (tag: string) => void }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
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
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <div className="flex-1">
        <Link href={product.url} target="_blank" className="block group">
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          )}
        </Link>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-2">
          {product.tags?.slice(0, 1).map((tag: string) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-full transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// 客户端组件用于处理滚动加载
const ProjectCardsContent = ({ 
  initialData = {
    items: [],
    pagination: {
      hasMore: false,
      total: 0
    }
  }
}: { 
  initialData?: { 
    items: Product[]; 
    pagination: { 
      hasMore: boolean; 
      total: number 
    } 
  } 
}) => {
  const t = useTranslations('product')
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q')
  
  const [autoLoad, setAutoLoad] = useState(true)
  const [, setLoadCount] = useState(0)
  const observerTarget = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['products', query || undefined],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam, queryKey: ['products', query || undefined] }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.hasMore ? pages.length + 1 : undefined
    },
    initialData: {
      pages: [initialData],
      pageParams: [1]
    },
    initialPageParam: 1
  })

  const loadMore = async () => {
    if (isFetching) return
    
    if (!autoLoad) {
      setAutoLoad(true)
      setLoadCount(0)
    }
    
    await fetchNextPage()
    
    if (autoLoad) {
      setLoadCount(prev => {
        const newCount = prev + 1
        if (newCount >= 3) {
          setAutoLoad(false)
        }
        return newCount
      })
    }
  }

  useEffect(() => {
    if (!autoLoad) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasNextPage, autoLoad, isFetching])

  const allProducts = data?.pages.flatMap(page => page.items) || []

  const handleTagClick = (tag: string) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allProducts.map((product: Product, index: number) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
      
      <div 
        ref={observerTarget} 
        className="w-full h-40 flex justify-center items-center"
      >
        {isFetching && <LoadingSpinner />}
        {isError && (
          <div className="flex flex-col items-center gap-2">
            <div className="text-red-500 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{(error as Error)?.message || t('error')}</span>
            </div>
            <button 
              onClick={() => loadMore()}
              className="px-4 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('retry')}
            </button>
          </div>
        )}
        {!isFetching && !isError && hasNextPage && !autoLoad && (
          <button 
            onClick={() => loadMore()}
            className="px-6 py-2 text-sm cursor-pointer text-white bg-black rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {t('loadMore')}
          </button>
        )}
        {!isFetching && !isError && !hasNextPage && (
          <div className="text-gray-500 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t('noMore')}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectCards(props: { 
  initialData?: { 
    items: Product[]; 
    pagination: { 
      hasMore: boolean; 
      total: number 
    } 
  } 
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectCardsContent {...props} />
    </Suspense>
  )
} 