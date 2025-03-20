import CategoryNav from '@/app/components/CategoryNav'
import ProjectCards from '@/app/components/ProjectCards'

export default function Categories() {
 return (
  <div className="container mx-auto px-4 py-8">
   <CategoryNav className="mb-8" />
   <ProjectCards />
  </div>
 )
}