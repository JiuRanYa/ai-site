import CategoryNav from '@/app/[locale]/(home)/_components/CategoryNav'
import ProjectCards from '@/app/[locale]/(home)/_components/ProjectCards'

export default async function CategoryPage(
  props: {
    params: Promise<{ slug: string }>
  }
) {
  const params = await props.params

  return (
   <div className="container mx-auto px-4 py-8">
    <CategoryNav className="mb-8" activeCategory={params.slug} />
    <ProjectCards category={params.slug} />
   </div>
  )
} 