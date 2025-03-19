'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const projects = [
 {
  id: 'heritage',
  title: 'Heritage & Co. Vintage Lifestyle Collection',
  tags: ['E-commerce', 'Creative'],
  iframe: 'https://www.baidu.com',
  preview: 'https://example.com/heritage'
 },
 {
  id: 'nature',
  title: 'Nature-Inspired Digital Solutions',
  tags: ['Agency', 'Modern'],
  iframe: 'https://www.baidu.com',
  preview: 'https://example.com/nature'
 },
 {
  id: 'raw',
  title: 'Raw Artistic Expression Gallery',
  tags: ['Art', 'Modern'],
  iframe: 'https://www.baidu.com',
  preview: 'https://example.com/raw'
 }
]

export default function ProjectCards() {
 return (
  <div className="max-w-7xl mx-auto px-4 pb-20">
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
     <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
     >
      <div className="aspect-[4/3] w-full bg-gray-100 relative">
       <iframe 
        src={project.iframe} 
        className="w-full h-full border-0"
        title={project.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
       ></iframe>
      </div>

      <div className="p-6">
       <h3 className="text-lg font-medium text-gray-900 mb-3">
        {project.title}
       </h3>
       <div className="flex gap-2 mb-4">
        {project.tags.map((tag) => (
         <span
          key={tag}
          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
         >
          {tag}
         </span>
        ))}
       </div>

       <Link 
        href={project.preview}
        className="block w-full text-center py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
       >
        <span className="flex items-center justify-center gap-2">
         <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
         </svg>
         Preview
        </span>
       </Link>
      </div>
     </motion.div>
    ))}
   </div>
  </div>
 )
} 