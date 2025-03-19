import Link from 'next/link'

export default function Header() {
 return (
  <header className="py-4 px-6">
   <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center gap-8">
     <Link href="/" className="text-xl italic me-8" style={{ fontFamily: 'cursive' }}>
      AI Source
     </Link>
     
     <nav className="hidden md:flex items-center gap-8">
      <div className="relative group">
       <button className="flex items-center gap-1 text-gray-800">
        Explore
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
       </button>
      </div>
      
      <Link href="/jobs" className="text-gray-800">
       Find Jobs
      </Link>
      
      <Link href="/blog" className="text-gray-800">
       Blog
      </Link>
     </nav>
    </div>
    
    <div className="flex items-center gap-4">
     <button className="text-gray-800">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
     </button>
     
     <button className="text-gray-800">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
     </button>
     
     <Link 
      href="/pro" 
      className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-gray-800 font-medium text-sm"
     >
      Go Pro
     </Link>
    </div>
   </div>
  </header>
 )
} 