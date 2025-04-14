import { fetchClient } from '@/core/lib/fetch'

// 定义产品类型
export type Product = {
  id: string
  title: string
  url: string
  preview?: string
  image?: string
  description?: string
  tags?: string[]
}

type ProductsResponse = {
  data: {
    items: Product[]
    pagination: {
      hasMore: boolean
      total: number
    }
  }
}

export const fetchProducts = async ({ pageParam = 1, queryKey }: { pageParam: number, queryKey: [string, string | undefined] }) => {
  const [, query] = queryKey
  const params: Record<string, string | number> = {
    page: pageParam,
    pageSize: 12
  }
  
  if (query) {
    params.q = query
  }

  const data = await fetchClient.get<ProductsResponse>('/api/products', params)
  return data.data
}