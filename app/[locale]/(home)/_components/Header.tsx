'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/core/components/hover-card'
import * as Icons from '@/core/components/icons'

export default function Header() {
 const t = useTranslations('Header')
 const locale = useLocale()
 const router = useRouter()

 const toggleLocale = () => {
  const newLocale = locale === 'en' ? 'zh' : 'en'
  router.push(`/${newLocale}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`)
 }

 // 定义探索选项
 const exploreOptions = [
  {
   id: 'new',
   href: '/new-ais',
   icon: <Icons.StarIcon />,
   title: t('newAIs.title'),
   description: t('newAIs.description')
  },
  {
   id: 'mostSaved',
   href: '/most-saved',
   icon: <Icons.BookmarkIcon />,
   title: t('mostSaved.title'),
   description: t('mostSaved.description')
  },
  {
   id: 'mostUsed',
   href: '/most-used',
   icon: <Icons.ChartIcon />,
   title: t('mostUsed.title'),
   description: t('mostUsed.description')
  },
  {
   id: 'aiApps',
   href: '/ai-apps',
   icon: <Icons.GridIcon />,
   title: t('aiApps.title'),
   description: t('aiApps.description')
  },
  {
   id: 'discord',
   href: '/discord-ai',
   icon: <Icons.DiscordIcon />,
   title: t('discordAI.title'),
   description: t('discordAI.description')
  }
 ]

 // 定义排名选项
 const rankingOptions = [
  {
   id: 'monthly',
   href: '/rankings/monthly',
   icon: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
   ),
   title: t('rankings.monthly.title'),
   description: t('rankings.monthly.description')
  },
  {
   id: 'categories',
   href: '/rankings/categories',
   icon: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
   ),
   title: t('rankings.categories.title'),
   description: t('rankings.categories.description')
  },
  {
   id: 'regions',
   href: '/rankings/regions',
   icon: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
   ),
   title: t('rankings.regions.title'),
   description: t('rankings.regions.description')
  },
  {
   id: 'source',
   href: '/rankings/source',
   icon: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
   ),
   title: t('rankings.source.title'),
   description: t('rankings.source.description')
  },
  {
   id: 'revenue',
   href: '/rankings/revenue',
   icon: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
   ),
   title: t('rankings.revenue.title'),
   description: t('rankings.revenue.description')
  }
 ]

 return (
  <header className="py-4 px-6">
   <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center gap-8">
     <Link href="/" className="text-xl italic me-8" style={{ fontFamily: 'cursive' }}>
      AI Source
     </Link>
     
     <nav className="hidden md:flex items-center gap-8">
      <div className="relative group">
       <HoverCard openDelay={0} closeDelay={50}>
        <HoverCardTrigger asChild>
         <div className="flex items-center gap-1 text-gray-800 outline-none focus:outline-none cursor-pointer">
          {t('explore')}
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
         </div>
        </HoverCardTrigger>
        <HoverCardContent asChild className="w-[400px] rounded-lg p-0" side="bottom" align="start">
         <div className="grid grid-cols-1 gap-4 p-4">
          {exploreOptions.map((option) => (
           <Link 
            key={option.id} 
            href={option.href} 
            className="flex items-center p-3 rounded-lg hover:bg-gray-50"
           >
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 text-indigo-500 bg-white rounded-lg shadow dark:bg-gray-700">
             {option.icon}
            </div>
            <div className="ml-4">
             <p className="text-base font-medium text-gray-900">{option.title}</p>
             <p className="mt-1 text-sm text-gray-500">{option.description}</p>
            </div>
           </Link>
          ))}
         </div>
        </HoverCardContent>
       </HoverCard>
      </div>
      
      {/* Rankings 下拉菜单 */}
      <div className="relative group">
       <HoverCard openDelay={0} closeDelay={50}>
        <HoverCardTrigger asChild>
         <div className="flex items-center gap-1 text-gray-800 outline-none focus:outline-none cursor-pointer">
          {t('rankings.title')}
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
         </div>
        </HoverCardTrigger>
        <HoverCardContent asChild className="w-[400px] rounded-lg p-0" side="bottom" align="start">
         <div className="grid grid-cols-1 gap-4 p-4">
          {/* 使用for循环渲染排名选项 */}
          {rankingOptions.map((option) => (
           <Link key={option.id} href={option.href} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 text-indigo-500 bg-white rounded-lg shadow dark:bg-gray-700">
             {option.icon}
            </div>
            <div className="ml-4">
             <p className="text-base font-medium text-gray-900">{option.title}</p>
             <p className="mt-1 text-sm text-gray-500">{option.description}</p>
            </div>
           </Link>
          ))}
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
      <Icons.ChatIcon />
     </button>
     
     <button className="text-gray-800">
      <Icons.BellIcon />
     </button>

     <button 
      onClick={toggleLocale}
      className="flex items-center cursor-pointer gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800"
     >
      {locale === 'en' ? '中文' : 'EN'}
      <Icons.LanguageIcon />
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