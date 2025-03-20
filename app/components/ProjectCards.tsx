'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// 定义产品类型
type Product = {
  id: string
  title: string
  url: string
  preview?: string
  tags?: string[]
}

export default function ProjectCards() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/products?page=${page}&pageSize=10`)
      const data = await response.json()
      
      if (data.data.items.length > 0) {
        setProducts(prev => [...prev, ...data.data.items])
        setPage(prev => prev + 1)
        setHasMore(data.data.pagination.hasMore)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMoreProducts()
  }, []) // 初始加载

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreProducts()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loading, hasMore, page])

  return (
   <div className="max-w-7xl mx-auto px-4 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {products.map((product, index) => (
      <motion.div
       key={`${product.id}-${index}`}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.1 }}
       className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
          >
       <div className="aspect-[4/3] w-full bg-gray-100 relative">
       </div>

       <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
         <h3 className="text-lg font-medium text-gray-900 mb-3">
          {product.title}
         </h3>
         <div className="flex flex-wrap gap-2 mb-4">
          {
          product.tags?.map((tag) => (
           <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
             >
            {tag}
           </span>
           ))}
         </div>
        </div>

        {product.preview && (
        <Link
         href={product.preview}
         className="block w-full text-center py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium mt-auto"
        >
         <span className="flex items-center justify-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
         </span>
        </Link>
       )}
       </div>
      </motion.div>
        ))}
    </div>

    {/* 加载指示器 */}
    <div ref={loaderRef} className="mt-12 text-center">
     {loading && (
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="py-4"
          >
       <p className="text-gray-600 font-medium">Loading More...</p>
      </motion.div>
        )}
     {!hasMore && products.length > 0 && (
      <motion.div
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
          >
       <p className="text-gray-500">No more projects to load</p>
      </motion.div>
        )}
    </div>
   </div>
  )
} 