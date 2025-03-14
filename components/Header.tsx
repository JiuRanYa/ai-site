import Link from 'next/link'

export default function Header() {
 return (
  <header className="absolute top-0 left-0 right-0 z-10">
   <div className="container mx-auto px-4 py-6 flex items-center justify-between">
    <Link href="/" className="text-2xl font-bold text-red-500">
     AI Navigator
    </Link>

    <nav className="flex items-center gap-6">
     <Link href="/explore" className="text-gray-700 hover:text-gray-900">
      探索
     </Link>
     <Link
      href="/get-started"
      className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
     >
      开始使用 →
     </Link>
    </nav>
   </div>
  </header>
 )
} 