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
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
   <Link href={url} target="_blank" rel="noopener noreferrer">
    <div className="aspect-video relative">
     <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover"
     />
    </div>

    <div className="p-5">
     <div className="flex gap-2 mb-3">
      {tags.map((tag) => (
       <span
        key={tag}
        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
       >
        {tag}
       </span>
      ))}
     </div>

     <h3 className="text-lg font-bold mb-2">{title}</h3>
     <p className="text-gray-600 text-sm">{description}</p>
    </div>
   </Link>
  </div>
 )
} 