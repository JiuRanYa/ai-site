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
   icon: <Icons.CalendarIcon />,
   title: t('rankings.monthly.title'),
   description: t('rankings.monthly.description')
  },
  {
   id: 'categories',
   href: '/rankings/categories',
   icon: <Icons.CategoryIcon />,
   title: t('rankings.categories.title'),
   description: t('rankings.categories.description')
  },
  {
   id: 'regions',
   href: '/rankings/regions',
   icon: <Icons.GlobeIcon />,
   title: t('rankings.regions.title'),
   description: t('rankings.regions.description')
  },
  {
   id: 'source',
   href: '/rankings/source',
   icon: <Icons.ChartBarIcon />,
   title: t('rankings.source.title'),
   description: t('rankings.source.description')
  },
  {
   id: 'revenue',
   href: '/rankings/revenue',
   icon: <Icons.CurrencyIcon />,
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