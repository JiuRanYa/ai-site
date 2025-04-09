import { fetchProducts } from '@/core/api/products'
import ProjectCards from './ProjectCards'

export default async function ProjectCardsServer() {
  const initialData = await fetchProducts({ pageParam: 1, queryKey: ['products', undefined] })
  return <ProjectCards initialData={initialData} />
} 