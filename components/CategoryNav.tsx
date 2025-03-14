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
            <h2 className="text-3xl font-bold mb-8">AI工具分类</h2>
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeCategory === category.id
                                ? 'bg-red-500 text-white'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
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