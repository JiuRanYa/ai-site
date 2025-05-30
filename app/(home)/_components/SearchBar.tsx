'use client'
import { useTranslations } from 'next-intl'
import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import { useDebounce } from '@/core/hooks/useDebounce'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const t = useTranslations('Hero')
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  // 使用 debounce hook
  const debouncedInputValue = useDebounce(inputValue, 500)

  // 从 API 获取建议
  const fetchSuggestions = async (value: string) => {
    if (value.length < 10) {
      setSuggestion('')
      return
    }

    try {
      // const response = await fetch('http://localhost:3001/api/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ message: value }),
      // })

      // if (!response.ok) {
      //   throw new Error('Network response was not ok')
      // }

      // const data = await response.json()
      // if (data.message) {
      //   setSuggestion(data.message)
      // } else {
      //   setSuggestion('')
      // }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestion('')
    }
  }

  // 监听 debounced 值的变化
  useEffect(() => {
    if (debouncedInputValue) {
      fetchSuggestions(debouncedInputValue)
    } else {
      setSuggestion('')
    }
  }, [debouncedInputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    } else if (e.key === 'Tab' && suggestion) {
      e.preventDefault()
      setInputValue(suggestion)
      setSuggestion('')
    }
  }

  return (
    <div className="flex items-center rounded-full bg-gray-100 pr-1 md:pr-2">
      <div className="relative flex-1">
        <input 
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={t('searchPlaceholder')}
          className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-none focus:outline-none relative"
        />
        {suggestion && (
          <div className="absolute inset-0 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg pointer-events-none">
            <div className="flex">
              <span className="opacity-0">{inputValue}</span>
              <span className="text-gray-400 whitespace-pre">{suggestion.slice(inputValue.length + 2)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <div className="relative hidden sm:block">
          <select className="appearance-none bg-transparent border-none text-gray-600 pr-6 md:pr-8 py-2 text-sm md:text-base focus:outline-none cursor-pointer">
            <option>{t('filterOptions.shots')}</option>
            <option>{t('filterOptions.tools')}</option>
            <option>{t('filterOptions.resources')}</option>
          </select>
          <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="10" height="10" className="md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <button 
          onClick={handleSearch}
          className="bg-pink-500 hover:bg-pink-600 text-white p-2 md:p-3 rounded-full transition-colors"
        >
          <svg width="18" height="18" className="md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}