import Link from 'next/link'

export const getProducts = async () => {
 const res = await fetch('http://localhost:3001/api/products')
 const data = await res.json()

 return data.data.items
}

export default async function ProjectCards() {
  const products = await getProducts()

  return (
   <div className="max-w-7xl mx-auto px-4 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {products?.map((product, index) => (
      <div
       key={`${product.id}-${index}`}
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

        {/* Preview 按钮 */}
        <Link
         href={product.url}
         target="_blank"
         className="block w-full text-center py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium mt-4"
        >
         <span className="flex items-center justify-center gap-2">
          <svg 
           width="20" 
           height="20" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor"
          >
           <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
           />
           <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
           />
          </svg>
          Preview
         </span>
        </Link>
       </div>
      </div>
        ))}
    </div>
   </div>
  )
} 