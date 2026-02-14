import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Knowledge } from './knowledge.entity'

interface KnowledgeItem {
  id: string
  title: string
  category: string
  summary: string
  content: string
  tags: string[]
  views: number
  rating: number
}

@Injectable()
export class AiKnowledgeService implements OnModuleInit {
  private useDatabase = true

  constructor(
    @InjectRepository(Knowledge)
    private knowledgeRepository: Repository<Knowledge>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.knowledgeRepository.count()
      if (count === 0) {
        await this.seedKnowledge()
      }
    } catch {
      this.useDatabase = false
    }
  }

  private async seedKnowledge() {
    const knowledgeData = [
      { title: 'Python基础语法详解', category: 'programming', summary: 'Python是一种高级编程语言，具有简洁明了的语法特点，适合初学者入门学习。本文将详细介绍Python的基础语法...', content: 'Python是一种高级编程语言，具有简洁明了的语法特点...', tags: ['Python', '编程', '基础'], views: 1256, rating: 4.8 },
      { title: '微积分入门指南', category: 'math', summary: '微积分是数学的一个重要分支，主要研究函数的极限、导数、积分等概念。本文将从基础概念开始...', content: '微积分是数学的一个重要分支...', tags: ['微积分', '数学', '高等数学'], views: 892, rating: 4.6 },
      { title: '牛顿力学原理', category: 'physics', summary: '牛顿力学是经典力学的基础，描述了物体运动的基本规律。本文将介绍牛顿三大定律及其应用...', content: '牛顿力学是经典力学的基础...', tags: ['物理', '力学', '牛顿'], views: 756, rating: 4.5 },
      { title: '有机化学反应机理', category: 'chemistry', summary: '有机化学是研究有机化合物的结构、性质、合成方法的学科。本文将详细介绍常见的有机化学反应机理...', content: '有机化学是研究有机化合物的结构...', tags: ['化学', '有机化学', '反应'], views: 634, rating: 4.7 },
      { title: '英语语法精讲', category: 'language', summary: '英语语法是学习英语的基础，掌握好语法规则对于提高英语水平至关重要。本文将系统讲解英语语法...', content: '英语语法是学习英语的基础...', tags: ['英语', '语法', '学习'], views: 1567, rating: 4.9 },
    ]

    for (const data of knowledgeData) {
      const knowledge = this.knowledgeRepository.create(data)
      await this.knowledgeRepository.save(knowledge)
    }
  }

  private getMockData(): KnowledgeItem[] {
    return [
      { id: '1', title: 'Python基础语法详解', category: 'programming', summary: 'Python是一种高级编程语言，具有简洁明了的语法特点，适合初学者入门学习。本文将详细介绍Python的基础语法...', content: 'Python是一种高级编程语言，具有简洁明了的语法特点...', tags: ['Python', '编程', '基础'], views: 1256, rating: 4.8 },
      { id: '2', title: '微积分入门指南', category: 'math', summary: '微积分是数学的一个重要分支，主要研究函数的极限、导数、积分等概念。本文将从基础概念开始...', content: '微积分是数学的一个重要分支...', tags: ['微积分', '数学', '高等数学'], views: 892, rating: 4.6 },
      { id: '3', title: '牛顿力学原理', category: 'physics', summary: '牛顿力学是经典力学的基础，描述了物体运动的基本规律。本文将介绍牛顿三大定律及其应用...', content: '牛顿力学是经典力学的基础...', tags: ['物理', '力学', '牛顿'], views: 756, rating: 4.5 },
      { id: '4', title: '有机化学反应机理', category: 'chemistry', summary: '有机化学是研究有机化合物的结构、性质、合成方法的学科。本文将详细介绍常见的有机化学反应机理...', content: '有机化学是研究有机化合物的结构...', tags: ['化学', '有机化学', '反应'], views: 634, rating: 4.7 },
      { id: '5', title: '英语语法精讲', category: 'language', summary: '英语语法是学习英语的基础，掌握好语法规则对于提高英语水平至关重要。本文将系统讲解英语语法...', content: '英语语法是学习英语的基础...', tags: ['英语', '语法', '学习'], views: 1567, rating: 4.9 },
    ]
  }

  async getAllKnowledge(): Promise<KnowledgeItem[]> {
    if (!this.useDatabase) return this.getMockData()
    try {
      return await this.knowledgeRepository.find()
    } catch {
      return this.getMockData()
    }
  }

  async getKnowledgeById(id: string): Promise<KnowledgeItem | null> {
    if (!this.useDatabase) return this.getMockData().find(item => item.id === id) || null
    try {
      return await this.knowledgeRepository.findOne({ where: { id } })
    } catch {
      return this.getMockData().find(item => item.id === id) || null
    }
  }

  async getKnowledgeByCategory(category: string): Promise<KnowledgeItem[]> {
    if (!this.useDatabase) {
      if (category === 'all') return this.getMockData()
      return this.getMockData().filter(item => item.category === category)
    }
    try {
      if (category === 'all') return await this.knowledgeRepository.find()
      return await this.knowledgeRepository.find({ where: { category } })
    } catch {
      if (category === 'all') return this.getMockData()
      return this.getMockData().filter(item => item.category === category)
    }
  }

  async searchKnowledge(query: string): Promise<KnowledgeItem[]> {
    if (!this.useDatabase) {
      const lowerQuery = query.toLowerCase()
      return this.getMockData().filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.summary.toLowerCase().includes(lowerQuery)
      )
    }
    try {
      return await this.knowledgeRepository
        .createQueryBuilder('knowledge')
        .where('knowledge.title LIKE :query', { query: `%${query}%` })
        .orWhere('knowledge.summary LIKE :query', { query: `%${query}%` })
        .getMany()
    } catch {
      const lowerQuery = query.toLowerCase()
      return this.getMockData().filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.summary.toLowerCase().includes(lowerQuery)
      )
    }
  }
}