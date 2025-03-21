'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const categories = [
 { id: 'today', name: 'Today' },
 { id: 'hot', name: 'Hot' },
 { id: 'new', name: 'New' },
 { id: 'free', name: 'Free' },
 { id: 'paid', name: 'Paid' },
 { id: 'webDesign', name: 'Web Design' },
 { id: 'webDevelopment', name: 'Web Development' },
]

export default function CategoryNav({ className }: { className?: string }) {
 const [activeCategory] = useState('today')
 const t = useTranslations('categories')

 return (
  <div className={`px-4 overflow-x-auto ${className}`}>
   <div className="flex max-w-7xl mx-auto items-center gap-4">
    {categories.map((category) => (
     <Link 
      key={category.id}
      href={`/category/${category.id}`}
      className={`px-5 py-3 rounded-full text-base transition-colors ${
       activeCategory === category.id 
        ? 'bg-gray-100 text-gray-800 font-medium' 
        : 'text-gray-700 hover:text-gray-900'
      }`}
     >
      {t(category.id)}
     </Link>
    ))}
   </div>
  </div>
 )
} 