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

export const fetchProducts = async ({ pageParam = 1, queryKey }: any) => {
  const [, query] = queryKey
  const baseUrl = '/api/products'
  const searchParams = new URLSearchParams()
  
  if (query) {
    searchParams.set('q', query)
  }
  searchParams.set('page', pageParam.toString())
  searchParams.set('pageSize', '12')

  const url = `${baseUrl}?${searchParams.toString()}`
  const res = await fetch(url)
  const data = await res.json() as ProductsResponse
  return data.data
}