'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatProps {
  isOpen: boolean
  onClose: () => void
}

export default function Chat({ isOpen, onClose }: ChatProps) {
  const t = useTranslations('chat')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 模拟初始消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'I\'m Nexus AI assistant. How can I help you today?',
          timestamp: '14:04'
        }
      ])
    }
  }, [isOpen, messages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: currentTime }])
    setIsTyping(true)

    try {
      // 模拟 AI 响应
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '这是一个模拟的回复。实际实现时需要调用 AI API。',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })
        }])
        setIsTyping(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to get AI response:', error)
      setIsTyping(false)
    }
  }

  if (!isOpen) return null

  return (
   <div className={`fixed right-4 top-20 w-[30vw] min-w-[320px] max-w-[450px] bg-white rounded-2xl border shadow-lg z-50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'h-[80vh] opacity-100' : 'h-0 opacity-0'}`}>
    {/* 头部 */}
    <div className="flex items-center justify-between p-4 border-b">
     <div className="flex items-center gap-3">
      <div>
       <h2 className="font-semibold">{t('team')}</h2>
       {isTyping && <p className="text-sm text-gray-500">{t('typing')}</p>}
      </div>
     </div>
     <button
      onClick={onClose}
      className="p-2 hover:bg-gray-100 rounded-full"
        >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
     </button>
    </div>

    {/* 消息列表 */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
     {messages.map((message, index) => (
      <div
       key={index}
       className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
       {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 mr-3">
         <Image src="/favicon/android-chrome-192x192.png" alt="Nexus AI" width={32} height={32} className='rounded-lg'/>
        </div>
            )}
       <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div
         className={`rounded-2xl px-4 py-2 break-words ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
         <p className="whitespace-pre-line">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
       </div>
       {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 ml-3">
         <svg className="w-8 h-8 text-gray-500 p-1.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
         </svg>
        </div>
            )}
      </div>
        ))}
     <div ref={messagesEndRef} />
    </div>

    {/* 输入框 */}
    <div className="p-4 border-t">
     <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
       type="text"
       value={input}
       onChange={(e) => setInput(e.target.value)}
       placeholder={t('placeholder')}
       className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
          />
      <button
       type="submit"
       disabled={!input.trim()}
       className="p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black"
          >
       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
       </svg>
      </button>
     </form>
    </div>
   </div>
  )
} 