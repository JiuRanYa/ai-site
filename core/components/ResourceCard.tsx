import Image from 'next/image'
import Link from 'next/link'

type ResourceCardProps = {
 title: string
 description: string
 imageUrl: string
 url: string
 tags: string[]
}

export default function ResourceCard({ title, description, imageUrl, url, tags }: ResourceCardProps) {
 return (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
   <Link href={url} target="_blank" rel="noopener noreferrer">
    <div className="aspect-video relative">
     <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover"
     />
    </div>

    <div className="p-6">
     <div className="flex gap-2 mb-4">
      {tags.map((tag) => (
       <span
        key={tag}
        className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100"
       >
        {tag}
       </span>
      ))}
     </div>

     <h3 className="text-lg font-bold mb-3 text-gray-900">{title}</h3>
     <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
   </Link>
  </div>
 )
} 