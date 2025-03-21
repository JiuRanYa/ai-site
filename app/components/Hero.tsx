import CategoryNav from './CategoryNav'
import ProjectCards from './ProjectCards'

export default function Hero() {
 return (
  <div className='flex flex-col'>
   <section className="flex-1 flex flex-col justify-center items-center pb-8">
    <div className="mx-auto px-4">
     <div 
      className="text-center mb-12 mt-24"
     >
      <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
       Discover the world's<br />top AI tools
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
       Explore tools from the most talented and accomplished AI creators<br />
       ready to take on your next project
      </p>
     </div>

     <div 
      className="max-w-4xl mx-auto"
     >
      <div className="relative">
       <div className="flex items-center rounded-full bg-gray-100 pr-2">
        <input 
         type="text"
         placeholder="What are you looking for?"
         className="w-full px-6 py-4 text-lg bg-transparent border-none focus:outline-none flex-1"
        />
        <div className="flex items-center gap-2">
         <div className="relative">
          <select className="appearance-none bg-transparent border-none text-gray-600 pr-8 py-2 focus:outline-none cursor-pointer">
           <option>Shots</option>
           <option>Tools</option>
           <option>Resources</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
           <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
         </div>
         <button className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
         </button>
        </div>
       </div>

       <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <span className="text-gray-500 text-sm">Trending searches:</span>
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
