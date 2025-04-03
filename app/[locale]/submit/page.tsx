'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Input } from '@/core/components/input'
import { Textarea } from '@/core/components/textarea'
import { Button } from '@/core/components/button'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// 定义表单验证 schema
const formSchema = z.object({
  title: z.string().min(1, 'errors.required'),
  url: z.string().min(1, 'errors.required').url('errors.invalidUrl'),
  description: z.string().min(1, 'errors.required'),
  tags: z.array(z.string()).min(1, 'errors.required'),
  image: z.any()
})

type FormValues = z.infer<typeof formSchema>

// 提交工具的接口
async function submitTool(data: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submits`, {
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
  const [imagePreview, setImagePreview] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentTag, setCurrentTag] = useState('')
  
  // 使用 react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
      description: '',
      tags: [],
      image: null,
    }
  })

  const tags = watch('tags') || []
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setValue('tags', [...tags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove))
  }
  
  // 使用 react-query 的 mutation
  const mutation = useMutation({
    mutationFn: submitTool,
    onSuccess: () => {
      setIsSuccess(true)
      // 重置表单
      reset()
      setImagePreview('')
    },
    onError: (error) => {
      console.error('Error submitting form:', error)
      alert(t('errors.submitFailed'))
    }
  })
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
        setValue('image', file)
      }
      
      reader.readAsDataURL(file)
    }
  }
  
  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data)
    
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('url', data.url)
    formData.append('description', data.description)
    formData.append('tags', data.tags as unknown as string)
    
    if (imagePreview) {
      formData.append('image', data.image)
    }
    
    console.log('FormData entries:')
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }
    
    mutation.mutate(formData)
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
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
         {/* 项目名称 */}
         <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
           {t('fields.title')} <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
           <Input
            type="text"
            id="title"
            {...register('title')}
            placeholder={t('placeholders.title')}
           />
           {errors.title && (
            <p className="mt-1 text-xs text-red-600">{t(errors.title.message as string)}</p>
           )}
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
            id="url"
            {...register('url')}
            placeholder="https://example.com"
           />
           {errors.url && (
            <p className="mt-1 text-xs text-red-600">{t(errors.url.message as string)}</p>
           )}
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
            rows={4}
            {...register('description')}
            placeholder={t('placeholders.description')}
            className="h-24"
           />
           {errors.description && (
            <p className="mt-1 text-xs text-red-600">{t(errors.description.message as string)}</p>
           )}
          </div>
          <p className="mt-2 text-xs text-gray-500">{t('tips.description')}</p>
         </div>

         {/* 标签 */}
         <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
           {t('fields.tags')} <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
           <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
             <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
             >
              {tag}
              <button
               type="button"
               onClick={() => handleRemoveTag(tag)}
               className="ml-1 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
              >
               <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                 fillRule="evenodd"
                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                 clipRule="evenodd"
                />
               </svg>
              </button>
             </span>
            ))}
           </div>
           <Input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder={t('placeholders.tags')}
           />
           {errors.tags && (
            <p className="mt-1 text-xs text-red-600">{t(errors.tags.message as string)}</p>
           )}
           <p className="mt-2 text-xs text-gray-500">{t('tips.tags')}</p>
          </div>
         </div>
            
         {/* 产品截图 */}
         <div>
          <label className="block text-sm font-medium text-gray-700">
           {t('fields.image')} <span className="text-red-500">*</span>
          </label>
              
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
           <div className="space-y-1 text-center">
            {imagePreview ? (
             <div className="mt-2">
              <Image 
               src={imagePreview} 
               alt="Preview" 
               className="max-h-64 mx-auto rounded-md shadow-sm" 
               width={256}
               height={256}
              />
              <button
               type="button"
               onClick={() => {
                setImagePreview('')
                setValue('image', null)
               }}
               className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
               {t('buttons.removeImage')}
              </button>
             </div>
            ) : (
             <>
              <svg
               className="mx-auto h-12 w-12 text-gray-400"
               stroke="currentColor"
               fill="none"
               viewBox="0 0 48 48"
               aria-hidden="true"
              >
               <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
               />
              </svg>
              <div className="flex text-sm text-gray-600">
               <label
                htmlFor="image"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:text-indigo-500"
               >
                <span>{t('buttons.uploadImage')}</span>
                <input
                 id="image"
                 type="file"
                 className="sr-only"
                 accept="image/*"
                 onChange={handleImageChange}
                />
               </label>
               <p className="pl-1">{t('tips.dragAndDrop')}</p>
              </div>
             </>
            )}
           </div>
          </div>
         </div>
        </div>
            
        <div className="pt-5">
         <div className="flex justify-end">
          <Button
           type="submit"
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
