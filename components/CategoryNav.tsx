'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
 { id: 'discover', name: 'Discover', className: 'bg-gray-100 text-gray-800' },
 { id: 'animation', name: 'Animation' },
 { id: 'branding', name: 'Branding' },
 { id: 'illustration', name: 'Illustration' },
 { id: 'mobile', name: 'Mobile' },
 { id: 'print', name: 'Print' },
 { id: 'product-design', name: 'Product Design' },
 { id: 'typography', name: 'Typography' },
 { id: 'web-design', name: 'Web Design' },
]

export default function CategoryNav() {
 const [activeCategory, setActiveCategory] = useState('discover')

 return (
  <div className="py-6 px-4 mt-8 mb-6 overflow-x-auto">
   <div className="flex max-w-7xl mx-auto items-center gap-4">
    {categories.map((category) => (
     <Link 
      key={category.id}
      href={`/category/${category.id}`}
      className={`px-5 py-3 rounded-full text-base transition-colors ${
       category.id === 'discover' 
        ? 'bg-gray-100 text-gray-800 font-medium' 
        : 'text-gray-700 hover:text-gray-900'
      }`}
      onClick={(e) => {
       e.preventDefault()
       setActiveCategory(category.id)
      }}
     >
      {category.name}
     </Link>
    ))}
   </div>
  </div>
 )
} 