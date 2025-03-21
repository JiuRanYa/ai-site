import ResourceCard from './ResourceCard'

// 示例数据，实际使用时可从API获取
const resources = [
 {
  id: '1',
  title: 'ChatGPT',
  description: 'OpenAI开发的强大对话AI系统，可用于聊天、写作、编程等多种场景',
  imageUrl: '/images/chatgpt.png',
  url: 'https://chat.openai.com',
  tags: ['聊天机器人', '写作'],
  category: 'chatbots'
 },
 {
  id: '2',
  title: 'Midjourney',
  description: '通过简单文本描述生成惊人的艺术图像和插画',
  imageUrl: '/images/midjourney.png',
  url: 'https://www.midjourney.com',
  tags: ['图像生成', '艺术'],
  category: 'image'
 },
 {
  id: '3',
  title: 'Runway ML',
  description: '专业级AI视频生成和编辑工具，让创意制作更简单',
  imageUrl: '/images/runway.png',
  url: 'https://runwayml.com',
  tags: ['视频创作', '编辑'],
  category: 'video'
 },
 {
  id: '4',
  title: 'GitHub Copilot',
  description: '由AI驱动的编程助手，帮助开发者更快编写代码',
  imageUrl: '/images/copilot.png',
  url: 'https://github.com/features/copilot',
  tags: ['编程', '开发工具'],
  category: 'coding'
 },
 {
  id: '5',
  title: 'Notion AI',
  description: '集成于Notion的AI助手，提升写作和笔记效率',
  imageUrl: '/images/notion-ai.png',
  url: 'https://www.notion.so/product/ai',
  tags: ['生产力', '写作'],
  category: 'productivity'
 },
 {
  id: '6',
  title: 'ElevenLabs',
  description: '高质量的AI语音合成工具，支持多种语言和声音风格',
  imageUrl: '/images/elevenlabs.png',
  url: 'https://elevenlabs.io',
  tags: ['音频', '语音合成'],
  category: 'audio'
 },
]

export default function ResourceGrid() {
 return (
  <section>
   <h2 className="text-2xl font-bold mb-6">推荐工具</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {resources.map((resource) => (
     <ResourceCard
      key={resource.id}
      title={resource.title}
      description={resource.description}
      imageUrl={resource.imageUrl}
      url={resource.url}
      tags={resource.tags}
     />
    ))}
   </div>
  </section>
 )
} 