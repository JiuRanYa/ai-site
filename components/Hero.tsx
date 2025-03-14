export default function Hero() {
 return (
  <section className="min-h-[90vh] flex items-center justify-center bg-pink-50">
   <div className="container mx-auto px-4 text-center">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">
     <span className="text-gray-900">发现优质</span>
     <span className="text-red-500"> AI工具资源</span>
    </h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
     探索精选的人工智能工具和平台，帮助您提高效率、激发创造力并解决各种挑战
    </p>

    <div className="flex flex-wrap justify-center gap-4">
     <a href="#resources" className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition">
      浏览平台
     </a>
     <a href="/guide" className="bg-white text-gray-800 px-8 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
      阅读指南
     </a>
    </div>
   </div>
  </section>
 )
} 