import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ChatMessage } from './chat-message.entity'

interface ChatMessageItem {
  id: string
  role: string
  content: string
  timestamp: Date
}

@Injectable()
export class AiBotService implements OnModuleInit {
  private useDatabase = true
  private mockChatHistory: ChatMessageItem[] = [
    { id: '1', role: 'assistant', content: '您好！我是AI智能助手，可以帮助您解答各种问题。请问有什么可以帮助您的吗？', timestamp: new Date() }
  ]

  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.chatMessageRepository.count()
      if (count === 0) {
        await this.chatMessageRepository.save({
          role: 'assistant',
          content: '您好！我是AI智能助手，可以帮助您解答各种问题。请问有什么可以帮助您的吗？'
        })
      }
    } catch {
      this.useDatabase = false
    }
  }

  private quickQuestions: string[] = [
    '如何提高学习效率？',
    'Python和Java的区别是什么？',
    '如何准备考试？',
    '什么是机器学习？'
  ]

  async getChatHistory(): Promise<ChatMessageItem[]> {
    if (!this.useDatabase) return this.mockChatHistory
    try {
      return await this.chatMessageRepository.find({ order: { timestamp: 'ASC' } })
    } catch {
      return this.mockChatHistory
    }
  }

  getQuickQuestions(): string[] {
    return this.quickQuestions
  }

  async sendMessage(content: string): Promise<ChatMessageItem> {
    const userMessage: ChatMessageItem = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    const responses = [
      '这是一个很好的问题！让我来为您详细解答...',
      '根据我的理解，这个问题的答案是这样的...',
      '我理解您的疑问，让我为您提供一些参考信息...',
      '这是一个有趣的话题，我来为您分析一下...',
      '感谢您的提问，我来为您详细说明...'
    ]

    const assistantMessage: ChatMessageItem = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)] + 
               '\n\n这是模拟的AI回复内容。在实际应用中，这里会接入真实的AI接口来生成智能回复。',
      timestamp: new Date()
    }

    if (!this.useDatabase) {
      this.mockChatHistory.push(userMessage)
      this.mockChatHistory.push(assistantMessage)
      return assistantMessage
    }

    try {
      const userMsg = this.chatMessageRepository.create({ role: 'user', content })
      await this.chatMessageRepository.save(userMsg)

      const assistantMsg = this.chatMessageRepository.create({
        role: 'assistant',
        content: assistantMessage.content
      })
      return await this.chatMessageRepository.save(assistantMsg)
    } catch {
      this.mockChatHistory.push(userMessage)
      this.mockChatHistory.push(assistantMessage)
      return assistantMessage
    }
  }

  async clearHistory(): Promise<void> {
    if (!this.useDatabase) {
      this.mockChatHistory = [
        { id: Date.now().toString(), role: 'assistant', content: '对话已清空。请问有什么新的问题需要我帮助您解答吗？', timestamp: new Date() }
      ]
      return
    }

    try {
      await this.chatMessageRepository.clear()
      await this.chatMessageRepository.save({
        role: 'assistant',
        content: '对话已清空。请问有什么新的问题需要我帮助您解答吗？'
      })
    } catch {
      this.mockChatHistory = [
        { id: Date.now().toString(), role: 'assistant', content: '对话已清空。请问有什么新的问题需要我帮助您解答吗？', timestamp: new Date() }
      ]
    }
  }
}