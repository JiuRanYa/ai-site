import CategoryNav from '@/app/[locale]/(home)/_components/CategoryNav'
import ProjectCards from '@/app/[locale]/(home)/_components/ProjectCards'

export default async function CategoryPage() {

  return (
   <div className="container mx-auto px-4 py-8">
    <CategoryNav className="mb-8" />
    <ProjectCards initialData={{
      items: [],
      pagination: {
        hasMore: false,
        total: 0
      }
    }} />
   </div>
  )
} 