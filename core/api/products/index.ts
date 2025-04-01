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
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  const url = new URL(baseUrl)
  
  if (query) {
    url.searchParams.set('q', query)
  }
  url.searchParams.set('page', pageParam.toString())
  url.searchParams.set('pageSize', '12')

  const res = await fetch(url)
  const data = await res.json() as ProductsResponse
  return data.data
}