'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/core/components/hover-card'
export default function Header() {
 const t = useTranslations('Header')
 const locale = useLocale()
 const router = useRouter()

 const toggleLocale = () => {
  const newLocale = locale === 'en' ? 'zh' : 'en'
  router.push(`/${newLocale}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`)
 }

 return (
  <header className="py-4 px-6">
   <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center gap-8">
     <Link href="/" className="text-xl italic me-8" style={{ fontFamily: 'cursive' }}>
      AI Source
     </Link>
     
     <nav className="hidden md:flex items-center gap-8">
      <div className="relative group">
       <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
         <div className="flex items-center gap-1 text-gray-800 outline-none focus:outline-none cursor-pointer">
          {t('explore')}
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
         </div>
        </HoverCardTrigger>
        <HoverCardContent asChild className="w-[400px] rounded-lg p-0" side="bottom" align="start">
         <div className="grid grid-cols-1 gap-4 p-4">
          {/* 新AI */}
          <Link href="/new-ais" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
           <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded bg-indigo-100 text-indigo-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
           </div>
           <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{t('newAIs.title')}</p>
            <p className="mt-1 text-sm text-gray-500">{t('newAIs.description')}</p>
           </div>
          </Link>

          {/* 最多保存的AI */}
          <Link href="/most-saved" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
           <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded bg-indigo-100 text-indigo-500">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
             <path d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z" />
            </svg>
           </div>
           <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{t('mostSaved.title')}</p>
            <p className="mt-1 text-sm text-gray-500">{t('mostSaved.description')}</p>
           </div>
          </Link>

          {/* 使用最多的AI */}
          <Link href="/most-used" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
           <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded bg-indigo-100 text-indigo-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
           </div>
           <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{t('mostUsed.title')}</p>
            <p className="mt-1 text-sm text-gray-500">{t('mostUsed.description')}</p>
           </div>
          </Link>

          {/* AI Apps */}
          <Link href="/ai-apps" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
           <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded bg-indigo-100 text-indigo-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
           </div>
           <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{t('aiApps.title')}</p>
            <p className="mt-1 text-sm text-gray-500">{t('aiApps.description')}</p>
           </div>
          </Link>

          {/* Discord of AI */}
          <Link href="/discord-ai" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
           <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded bg-indigo-100 text-indigo-500">
            <svg className="h-6 w-6" viewBox="0 0 71 55" fill="currentColor">
             <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
            </svg>
           </div>
           <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{t('discordAI.title')}</p>
            <p className="mt-1 text-sm text-gray-500">{t('discordAI.description')}</p>
           </div>
          </Link>
         </div>
        </HoverCardContent>
       </HoverCard>
      </div>
      
      <Link href="/categories/web-design" className="text-gray-800">
       {t('categories')}
      </Link>
      
      <Link href="/submit" className="text-gray-800">
       {t('submit')}
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

     <button 
      onClick={toggleLocale}
      className="flex items-center cursor-pointer gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800"
     >
      {locale === 'en' ? '中文' : 'EN'}
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
     </button>
     
     <Link 
      href="/pro" 
      className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-gray-800 font-medium text-sm"
     >
      {t('goPro')}
     </Link>
    </div>
   </div>
  </header>
 )
} 