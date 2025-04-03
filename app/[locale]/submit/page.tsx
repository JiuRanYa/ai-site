'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Input } from '@/core/components/input'
import { Textarea } from '@/core/components/textarea'
import { Button } from '@/core/components/button'
import { useMutation } from '@tanstack/react-query'

// 提交工具的接口
async function submitTool(data: FormData) {
  const response = await fetch('/api/submits', {
    method: 'POST',
    body: data,
  })
  
  if (!response.ok) {
    throw new Error('Failed to submit tool')
  }
  
  return response.json()
}

export default function SubmitPage() {
  const t = useTranslations('SubmitForm')
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    image: null as File | null,
    imagePreview: '',
    tags: [] as string[],
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)
  
  // 使用 react-query 的 mutation
  const mutation = useMutation({
    mutationFn: submitTool,
    onSuccess: () => {
      setIsSuccess(true)
      // 重置表单
      setFormData({
        title: '',
        url: '',
        description: '',
        image: null,
        imagePreview: '',
        tags: [],
      })
    },
    onError: (error) => {
      console.error('Error submitting form:', error)
      alert(t('errors.submitFailed'))
    }
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: event.target?.result as string
        }))
      }
      
      reader.readAsDataURL(file)
      
      // Clear error
      if (errors.image) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.image
          return newErrors
        })
      }
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = t('errors.required')
    if (!formData.url.trim()) newErrors.url = t('errors.required')
    if (!formData.description.trim()) newErrors.description = t('errors.required')
    if (!formData.tags.length) newErrors.tags = t('errors.required')
    
    // URL validation
    if (formData.url && !/^https?:\/\/.+\..+/.test(formData.url)) {
      newErrors.url = t('errors.invalidUrl')
    }
    
    // Image validation
    if (!formData.image && !formData.imagePreview) {
      newErrors.image = t('errors.imageRequired')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log(formData, !validateForm())
    // if (!validateForm()) return
    
    // 创建 FormData 对象
    const formDataToSubmit = new FormData()
    formDataToSubmit.append('title', formData.title)
    formDataToSubmit.append('url', formData.url)
    formDataToSubmit.append('description', formData.description)
    formDataToSubmit.append('tags', JSON.stringify(formData.tags))
    
    // 添加图片文件
    if (formData.image) {
      formDataToSubmit.append('image', formData.image)
    }
    
    // 提交表单
    mutation.mutate(formDataToSubmit)
  }
  
  return (
   <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="mb-12">
     <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">{t('title')}</h1>
     <p className="text-lg text-gray-600 max-w-3xl">{t('description')}</p>
    </div>
      
    {isSuccess ? (
     <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-md">
      <div className="flex items-start">
       <div className="flex-shrink-0">
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
       </div>
       <div className="ml-3">
        <h3 className="text-lg font-medium text-green-800">{t('success.title')}</h3>
        <p className="mt-2 text-green-700">{t('success.message')}</p>
        <button 
         className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
         onClick={() => setIsSuccess(false)}
              >
         {t('success.submitAnother')}
        </button>
       </div>
      </div>
     </div>
      ) : (
       <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
         {/* 项目名称 */}
         <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
           {t('title')} <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
           <Input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={t('placeholders.title')}
                />
           {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>
         </div>
            
         {/* 网站链接 */}
         <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
           {t('fields.url')} <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
           <Input
            type="url"
            name="url"
            id="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://example.com"
                />
           {errors.url && <p className="mt-1 text-xs text-red-600">{errors.url}</p>}
          </div>
         </div>
            
         {/* 描述 */}
         <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
           {t('fields.description')} <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
           <Textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            placeholder={t('placeholders.description')}
            className="h-24"
           />
           {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>
          <p className="mt-2 text-xs text-gray-500">{t('tips.description')}</p>
         </div>
            
         {/* 产品截图 */}
         <div>
          <label className="block text-sm font-medium text-gray-700">
           {t('fields.image')} <span className="text-red-500">*</span>
          </label>
              
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
           <div className="space-y-1 text-center">
            {formData.imagePreview ? (
             <div className="mt-2">
              <Image 
               src={formData.imagePreview} 
               alt="Preview" 
               className="max-h-64 mx-auto rounded-md shadow-sm" 
               width={256}
               height={256}
              />
              <button
               type="button"
               className="mt-2 text-sm text-red-600 hover:text-red-800"
               onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
              >
               {t('buttons.removeImage')}
              </button>
             </div>
                  ) : (
                   <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                     <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                     <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>{t('buttons.uploadImage')}</span>
                      <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                     </label>
                     <p className="pl-1">{t('tips.dragAndDrop')}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                     PNG, JPG, GIF up to 10MB
                    </p>
                   </>
                  )}
           </div>
          </div>
          {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
         </div>
        </div>
          
        <div className="pt-4" >
         <div className="flex justify-end gap-2">
          <Button
           type="submit"
           onClick={handleSubmit}
           disabled={mutation.isPending}
          >
           {mutation.isPending ? t('buttons.submitting') : t('buttons.submit')}
          </Button>
         </div>
        </div>
       </form>
      )}
   </div>
  )
}
