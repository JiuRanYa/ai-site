import { ofetch } from 'ofetch'

interface FetchOptions {
  baseURL?: string
  headers?: Record<string, string>
  timeout?: number
  retry?: number
}

interface RequestData {
  [key: string]: unknown
}

class FetchClient {
  private instance: typeof ofetch
  private options: FetchOptions

  constructor(options: FetchOptions = {}) {
    this.options = {
      baseURL: process.env.NEXT_PUBLIC_API_URL || '',
      timeout: 10000,
      retry: 3,
      ...options
    }

    this.instance = ofetch.create({
      baseURL: this.options.baseURL,
      timeout: this.options.timeout,
      retry: this.options.retry,
      headers: {
        'Content-Type': 'application/json',
        ...this.options.headers
      }
    })
  }

  async get<T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.instance(url, {
      method: 'GET',
      params
    })
  }

  async post<T>(url: string, data?: RequestData): Promise<T> {
    return this.instance(url, {
      method: 'POST',
      body: data
    })
  }

  async put<T>(url: string, data?: RequestData): Promise<T> {
    return this.instance(url, {
      method: 'PUT',
      body: data
    })
  }

  async delete<T>(url: string): Promise<T> {
    return this.instance(url, {
      method: 'DELETE'
    })
  }
}

// 创建默认实例
const fetchClient = new FetchClient()

export { fetchClient, FetchClient } 