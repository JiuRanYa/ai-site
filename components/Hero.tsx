'use client'
import { motion } from 'framer-motion'
import { CoolMode } from './magicui/cool-mode'

export default function Hero() {
 return (
  <>
   <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <div className="absolute inset-0 w-full h-full">
     <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-200/30 via-pink-200/30 to-blue-200/30 rounded-full blur-3xl"
     />
    </div>

    <div className="container relative mx-auto px-4 text-center">
     <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex items-center justify-center"
     >
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
       Explore AI Source
      </span>
     </motion.div>

     <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-light mt-6"
     >
      Discover and share the best AI resources for designers
     </motion.p>

     <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      className="flex flex-wrap justify-center gap-6"
     >
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
     </motion.div>
    </div>
   </section>

   {/* 新增特性介绍部分 */}
   <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
     >
      <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
       为什么选择 AI Navigator
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
       我们精心策划并持续更新最实用的 AI 工具，帮助设计师和创作者提升工作效率
      </p>
     </motion.div>

     <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
       <motion.div
        key={feature.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all"
       >
        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
         {feature.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
       </motion.div>
      ))}
     </div>
    </div>
   </section>

   {/* 新增统计数据部分 */}
   <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8 text-center"
     >
      {stats.map((stat, index) => (
       <motion.div
        key={stat.label}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="p-8"
       >
        <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
         {stat.value}
        </div>
        <div className="text-gray-600">{stat.label}</div>
       </motion.div>
      ))}
     </motion.div>
    </div>
   </section>
  </>
 )
}

const features = [
 {
  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  title: '精选工具',
  description: '我们严格筛选并持续更新最实用的 AI 工具，确保每一个推荐都经过实际验证。'
 },
 {
  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  title: '分类清晰',
  description: '工具按照使用场景和功能特点进行分类，帮助您快速找到最适合的工具。'
 },
 {
  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
  title: '使用指南',
  description: '详细的工具使用指南和最佳实践，让您快速上手并发挥 AI 工具的最大价值。'
 }
]

const stats = [
 {
  value: '100+',
  label: '精选工具'
 },
 {
  value: '10k+',
  label: '活跃用户'
 },
 {
  value: '50+',
  label: '使用场景'
 }
] 