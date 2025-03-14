import { CoolMode } from './magicui/cool-mode'

export default function Hero() {

 return (
  <section className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden">
   <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-200/30 via-pink-200/30 to-blue-200/30 rounded-full blur-3xl" />
   </div>

   <div className="container relative mx-auto px-4 text-center">
    <div className="flex items-center justify-center">
     <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
      Explore AI Source
     </span>
    </div>

    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-light mt-6">
     Discover and share the best AI resources for designers
    </p>

    <div className="flex flex-wrap justify-center gap-6">

     <CoolMode>
      <a className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
       Get Started
      </a>
     </CoolMode>
     <a
      href="/guide"
      className="bg-white text-gray-800 px-8 py-3 rounded-full text-lg border border-gray-200 hover:border-gray-300 transition shadow-lg hover:shadow-xl"
     >
      了解更多
     </a>
    </div>
   </div>


  </section>
 )
} 