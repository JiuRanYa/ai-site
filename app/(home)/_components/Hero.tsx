import { useTranslations } from 'next-intl'
import CategoryNav from './CategoryNav'
import SearchBar from './SearchBar'
import ProjectCardsServer from './ProjectCardsServer'

export default function Hero() {
 const t = useTranslations('Hero')
 
 return (
  <div className='flex flex-col'>
   <section className="flex-1 flex flex-col justify-center items-center">
    <div className="mx-auto px-4 w-full">
     <div className="text-center mb-8 md:mb-12 mt-12 md:mt-24">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight mb-4 md:mb-6 px-2">
       {t('title')}<br className="hidden sm:block" />{t('titleSecondLine')}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
       {t('subtitle')}<br className="hidden sm:block" />
       {t('subtitleSecondLine')}
      </p>
     </div>

     <div className="max-w-4xl mx-auto px-4">
      <div className="relative">
       <SearchBar />

       <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-4">
        <span className="text-gray-500 text-xs md:text-sm">{t('trendingSearches')}:</span>
        <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
         {['Image Generation', 'Text to Image', 'Write', 'Text to Speech'].map((term) => (
          <a 
           key={term} 
           href={`/search?q=${term}`}
           className="px-3 md:px-4 py-1 md:py-1.5 bg-white rounded-full text-xs md:text-sm border border-gray-200 hover:border-gray-300 transition-colors"
          >
           {term}
          </a>
         ))}
        </div>
       </div>
      </div>
     </div>
     
     <div className="w-full mt-6 md:mt-8 mb-6 md:mb-8">
      <CategoryNav />
     </div>
     
     <div className="w-full">
      <ProjectCardsServer />
     </div>
    </div>
   </section>
  </div>
 )
}
