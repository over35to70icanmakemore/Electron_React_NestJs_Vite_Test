import { Injectable } from '@nestjs/common'

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

@Injectable()
export class QuizService {
  private questions: QuizQuestion[] = []

  constructor() {
    this.generateQuestions()
  }

  private generateQuestions() {
    this.questions = [
      { id: 1, question: '世界上最大的海洋是？', options: ['大西洋', '太平洋', '印度洋', '北冰洋'], correctAnswer: 1, category: '地理' },
      { id: 2, question: '光年是什么单位？', options: ['时间单位', '距离单位', '速度单位', '质量单位'], correctAnswer: 1, category: '物理' },
      { id: 3, question: '《红楼梦》的作者是谁？', options: ['罗贯中', '施耐庵', '曹雪芹', '吴承恩'], correctAnswer: 2, category: '文学' },
      { id: 4, question: '人体最大的器官是？', options: ['心脏', '肝脏', '皮肤', '大脑'], correctAnswer: 2, category: '生物' },
      { id: 5, question: '地球的卫星是？', options: ['太阳', '月亮', '火星', '金星'], correctAnswer: 1, category: '天文' },
      { id: 6, question: '中国的首都是哪里？', options: ['上海', '北京', '广州', '深圳'], correctAnswer: 1, category: '地理' },
      { id: 7, question: '水的化学式是？', options: ['H2O', 'CO2', 'O2', 'N2'], correctAnswer: 0, category: '化学' },
      { id: 8, question: '《西游记》中孙悟空的武器是？', options: ['方天画戟', '金箍棒', '青龙偃月刀', '倚天剑'], correctAnswer: 1, category: '文学' },
      { id: 9, question: '地球上最深的海沟是？', options: ['日本海沟', '马里亚纳海沟', '菲律宾海沟', '波多黎各海沟'], correctAnswer: 1, category: '地理' },
      { id: 10, question: '一年有多少天？', options: ['364天', '365天', '366天', '360天'], correctAnswer: 1, category: '常识' }
    ]
  }

  getQuizQuestions(count: number = 5): QuizQuestion[] {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  submitAnswer(questionId: number, answerIndex: number): { correct: boolean; correctAnswer: number } {
    const question = this.questions.find(q => q.id === questionId)
    if (!question) return { correct: false, correctAnswer: -1 }
    
    return {
      correct: question.correctAnswer === answerIndex,
      correctAnswer: question.correctAnswer
    }
  }

  getCategories(): string[] {
    return [...new Set(this.questions.map(q => q.category))]
  }
}