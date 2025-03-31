import { useTranslations } from 'next-intl'
import CategoryNav from './CategoryNav'
import ProjectCards from './ProjectCards'
import SearchBar from './SearchBar'

export default function Hero() {
 const t = useTranslations('Hero')
 
 return (
  <div className='flex flex-col'>
   <section className="flex-1 flex flex-col justify-center items-center">
    <div className="mx-auto px-4">
     <div className="text-center mb-12 mt-24">
      <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
       {t('title')}<br />{t('titleSecondLine')}
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
       {t('subtitle')}<br />
       {t('subtitleSecondLine')}
      </p>
     </div>

     <div className="max-w-4xl mx-auto">
      <div className="relative">

       <SearchBar />

       <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <span className="text-gray-500 text-sm">{t('trendingSearches')}:</span>
        <div className="flex flex-wrap gap-2">
         {['landing page', 'e-commerce', 'mobile app', 'logo design', 'dashboard', 'icons'].map((term) => (
          <a 
           key={term} 
           href={`/search?q=${term}`}
           className="px-4 py-1.5 bg-white rounded-full text-sm border border-gray-200 hover:border-gray-300 transition-colors"
          >
           {term}
          </a>
         ))}
        </div>
       </div>
      </div>
     </div>
     
     {/* 分类导航栏 */}
     <div
      className="w-full mt-8 mb-8"
     >
      <CategoryNav />
     </div>
     
     {/* 项目卡片展示 */}
     <div
      className="w-full"
     >
      <ProjectCards />
     </div>
    </div>
   </section>
  </div>
 )
}
