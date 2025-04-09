'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/core/components/hover-card'
import * as Icons from '@/core/components/icons'
import { useState } from 'react'
import Chat from './Chat'
import { useSession } from '@/core/lib/auth'
import Image from 'next/image'
import { authClient } from '@/core/lib/auth'

export default function Header() {
  const t = useTranslations('Header')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const UserDropdown = () => {
    return (
      <HoverCard openDelay={0} closeDelay={50}>
        <HoverCardTrigger asChild>
          <button className="outline-none focus:outline-none">
            <Image src={session?.user.image || ''} alt="user" width={32} height={32} className="rounded-full" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent asChild className="w-[200px] rounded-lg p-0" side="bottom" align="end">
          <div className="p-2">
            <button
              onClick={() => authClient.signOut()}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Icons.LogoutIcon />
              {t('logout')}
            </button>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  const { data: session } = useSession()

  // 定义探索选项
  const exploreOptions = [
    {
      id: 'new',
      href: '/new-ais',
      icon: <Icons.StarIcon />,
      title: t('newAIs.title'),
      description: t('newAIs.description'),
      comingsoon: true
    },
    {
      id: 'mostSaved',
      href: '/most-saved',
      icon: <Icons.BookmarkIcon />,
      title: t('mostSaved.title'),
      description: t('mostSaved.description'),
      comingsoon: true
    },
    {
      id: 'mostUsed',
      href: '/most-used',
      icon: <Icons.ChartIcon />,
      title: t('mostUsed.title'),
      description: t('mostUsed.description'),
      comingsoon: true
    },
    {
      id: 'aiApps',
      href: '/ai-apps',
      icon: <Icons.GridIcon />,
      title: t('aiApps.title'),
      description: t('aiApps.description'),
      comingsoon: true
    },
    {
      id: 'discord',
      href: '/discord-ai',
      icon: <Icons.DiscordIcon />,
      title: t('discordAI.title'),
      description: t('discordAI.description'),
      comingsoon: true
    }
  ]

  // 定义排名选项
  const rankingOptions = [
    {
      id: 'monthly',
      href: '/rankings/monthly',
      icon: <Icons.CalendarIcon />,
      title: t('rankings.monthly.title'),
      description: t('rankings.monthly.description'),
      comingsoon: true
    },
    {
      id: 'categories',
      href: '/rankings/categories',
      icon: <Icons.CategoryIcon />,
      title: t('rankings.categories.title'),
      description: t('rankings.categories.description'),
      comingsoon: true
    },
    {
      id: 'regions',
      href: '/rankings/regions',
      icon: <Icons.GlobeIcon />,
      title: t('rankings.regions.title'),
      description: t('rankings.regions.description'),
      comingsoon: true
    },
    {
      id: 'source',
      href: '/rankings/source',
      icon: <Icons.ChartBarIcon />,
      title: t('rankings.source.title'),
      description: t('rankings.source.description'),
      comingsoon: true
    },
    {
      id: 'revenue',
      href: '/rankings/revenue',
      icon: <Icons.CurrencyIcon />,
      title: t('rankings.revenue.title'),
      description: t('rankings.revenue.description'),
      comingsoon: true
    }
  ]

  return (
    <header className="py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl italic me-8" style={{ fontFamily: 'cursive' }}>
            <Icons.Logo />
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
                      <div 
                        key={option.id} 
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 text-indigo-500 bg-white rounded-lg shadow dark:bg-gray-700">
                          {option.icon}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-1">
                            <p className="text-base font-medium text-gray-900">{option.title}</p>
                            {option.comingsoon && (
                              <span className="text-xs text-white bg-blue-400/70 px-2 rounded-full">Coming Soon</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
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
                          <div className="flex items-center gap-1">
                            <p className="text-base font-medium text-gray-900">{option.title}</p>
                            {option.comingsoon && (
                              <span className="text-xs text-white bg-blue-400/70 px-2 rounded-full">Coming Soon</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
      
            <Link href="/submit" className="text-gray-800">
              {t('submit')}
            </Link>
          </nav>
        </div>
    
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <Icons.ChatIcon />
          </button>
     
          <button className="text-gray-800">
            <Icons.BellIcon />
          </button>

          { session?.user.image ?  <UserDropdown /> : <Link 
            href="/login" 
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-gray-800 font-medium text-sm"
          >
            {t('login')}
          </Link>
          }
        </div>
      </div>
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  )
} 