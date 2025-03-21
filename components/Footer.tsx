import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
 const t = useTranslations('Footer')
 
 return (
  <footer className="border-t border-gray-200 bg-white">
   <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
     {/* 第一列 - Logo和简介 */}
     <div className="md:col-span-1">
      <Link href="/" className="text-xl font-bold italic">
       AI Source
      </Link>
      <p className="mt-4 text-gray-600 text-sm">
       {t('description')}
      </p>
      <div className="mt-6 flex space-x-4">
       <a href="#" className="text-gray-500 hover:text-gray-800">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
         <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.489.5.09.682-.218.682-.483 0-.237-.01-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
       </a>
       <a href="#" className="text-gray-500 hover:text-gray-800">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
         <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
       </a>
      </div>
     </div>

     {/* 第二列 - 分类 */}
     <div>
      <h3 className="font-semibold text-gray-900 mb-4">{t('categories.title')}</h3>
      <ul className="space-y-2">
       <li><Link href="/category/design-tools" className="text-gray-600 hover:text-gray-900">{t('categories.designTools')}</Link></li>
       <li><Link href="/category/code-tools" className="text-gray-600 hover:text-gray-900">{t('categories.codeTools')}</Link></li>
       <li><Link href="/category/productivity" className="text-gray-600 hover:text-gray-900">{t('categories.productivityTools')}</Link></li>
       <li><Link href="/category/image-generation" className="text-gray-600 hover:text-gray-900">{t('categories.imageGeneration')}</Link></li>
       <li><Link href="/category/text-generation" className="text-gray-600 hover:text-gray-900">{t('categories.textGeneration')}</Link></li>
      </ul>
     </div>

     {/* 第三列 - 资源 */}
     <div>
      <h3 className="font-semibold text-gray-900 mb-4">{t('resources.title')}</h3>
      <ul className="space-y-2">
       <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">{t('resources.blog')}</Link></li>
       <li><Link href="/guides" className="text-gray-600 hover:text-gray-900">{t('resources.guides')}</Link></li>
       <li><Link href="/community" className="text-gray-600 hover:text-gray-900">{t('resources.community')}</Link></li>
       <li><Link href="/submit-tool" className="text-gray-600 hover:text-gray-900">{t('resources.submitTool')}</Link></li>
      </ul>
     </div>

     {/* 第四列 - 公司 */}
     <div>
      <h3 className="font-semibold text-gray-900 mb-4">{t('company.title')}</h3>
      <ul className="space-y-2">
       <li><Link href="/about" className="text-gray-600 hover:text-gray-900">{t('company.about')}</Link></li>
       <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">{t('company.privacy')}</Link></li>
       <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">{t('company.terms')}</Link></li>
       <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">{t('company.contact')}</Link></li>
      </ul>
     </div>
    </div>

    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
     <p className="text-gray-500 text-sm">
      © {new Date().getFullYear()} {t('copyright')}
     </p>
     <div className="mt-4 md:mt-0">
      <ul className="flex space-x-6">
       <li><Link href="/privacy" className="text-gray-500 hover:text-gray-800 text-sm">Privacy Policy</Link></li>
       <li><Link href="/terms" className="text-gray-500 hover:text-gray-800 text-sm">Terms of Service</Link></li>
       <li><Link href="/cookies" className="text-gray-500 hover:text-gray-800 text-sm">Cookie Policy</Link></li>
      </ul>
     </div>
    </div>
   </div>
  </footer>
 )
} 