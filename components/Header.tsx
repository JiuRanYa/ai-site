import Link from 'next/link'
import { Button } from './ui/button'

export default function Header() {
 return (
  <header className="absolute top-0 left-0 right-0 z-10">
   <div className="container mx-auto px-4 py-6 flex items-center justify-between">
    <Link href="/" className="text-2xl font-bold font-mono">
     AI For Developer
    </Link>

    <nav className="flex items-center gap-6">
     <Link href="/explore" className="text-gray-700 hover:text-gray-900">
      Explore
     </Link>
     <Button className="rounded-full">
      <Link href="/get-started">Get Started</Link>
     </Button>
    </nav>
   </div>
  </header>
 )
} 