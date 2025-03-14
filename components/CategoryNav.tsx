'use client'

import { useState } from 'react'

const categories = [
 { id: 'all', name: '全部' },
 { id: 'chatbots', name: '聊天机器人' },
 { id: 'image', name: '图像生成' },
 { id: 'video', name: '视频创作' },
 { id: 'audio', name: '音频工具' },
 { id: 'writing', name: '写作助手' },
 { id: 'productivity', name: '生产力工具' },
 { id: 'coding', name: '编程开发' },
]

export default function CategoryNav() {
 const [activeCategory, setActiveCategory] = useState('all')

 return (
  <div className="mb-12">
   <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
    AI工具分类
   </h2>
   <div className="flex flex-wrap gap-3">
    {categories.map((category) => (
     <button
      key={category.id}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
       ? 'bg-black text-white shadow-lg'
       : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md'
       }`}
      onClick={() => setActiveCategory(category.id)}
     >
      {category.name}
     </button>
    ))}
   </div>
  </div>
 )
} 