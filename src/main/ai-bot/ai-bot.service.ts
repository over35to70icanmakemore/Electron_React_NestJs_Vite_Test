import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ChatMessage } from './chat-message.entity'

@Injectable()
export class AiBotService implements OnModuleInit {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async onModuleInit() {
    const count = await this.chatMessageRepository.count()
    if (count === 0) {
      await this.chatMessageRepository.save({
        role: 'assistant',
        content: '您好！我是AI智能助手，可以帮助您解答各种问题。请问有什么可以帮助您的吗？'
      })
    }
  }

  private quickQuestions: string[] = [
    '如何提高学习效率？',
    'Python和Java的区别是什么？',
    '如何准备考试？',
    '什么是机器学习？'
  ]

  async getChatHistory(): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({ order: { timestamp: 'ASC' } })
  }

  getQuickQuestions(): string[] {
    return this.quickQuestions
  }

  async sendMessage(content: string): Promise<ChatMessage> {
    const userMessage = this.chatMessageRepository.create({
      role: 'user',
      content
    })
    await this.chatMessageRepository.save(userMessage)

    const responses = [
      '这是一个很好的问题！让我来为您详细解答...',
      '根据我的理解，这个问题的答案是这样的...',
      '我理解您的疑问，让我为您提供一些参考信息...',
      '这是一个有趣的话题，我来为您分析一下...',
      '感谢您的提问，我来为您详细说明...'
    ]

    const assistantMessage = this.chatMessageRepository.create({
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)] + 
               '\n\n这是模拟的AI回复内容。在实际应用中，这里会接入真实的AI接口来生成智能回复。'
    })
    return this.chatMessageRepository.save(assistantMessage)
  }

  async clearHistory(): Promise<void> {
    await this.chatMessageRepository.clear()
    await this.chatMessageRepository.save({
      role: 'assistant',
      content: '对话已清空。请问有什么新的问题需要我帮助您解答吗？'
    })
  }
}