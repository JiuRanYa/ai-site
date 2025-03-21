import CategoryNav from '@/core/components/CategoryNav'
import ProjectCards from '@/core/components/ProjectCards'

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