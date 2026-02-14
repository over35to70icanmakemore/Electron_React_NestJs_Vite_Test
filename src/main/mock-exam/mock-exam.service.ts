import { Injectable } from '@nestjs/common'

export interface MockExam {
  id: string
  title: string
  subject: string
  duration: number
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'not-started' | 'in-progress' | 'completed'
  score?: number
  questions: MockQuestion[]
}

export interface MockQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

@Injectable()
export class MockExamService {
  private mockExams: MockExam[] = []

  constructor() {
    this.generateMockExams()
  }

  private generateMockExams() {
    const examData = [
      {
        title: 'Python基础测试',
        subject: 'Python',
        duration: 30,
        questionCount: 20,
        difficulty: 'easy' as const,
        status: 'not-started' as const,
        questions: [
          { id: 1, question: 'Python中，以下哪个是正确的变量命名？', options: ['1variable', '_variable', 'var-iable', 'class'], correctAnswer: 1 },
          { id: 2, question: '以下哪个不是Python的数据类型？', options: ['list', 'tuple', 'array', 'dict'], correctAnswer: 2 },
          { id: 3, question: 'Python中，如何定义一个空列表？', options: ['list()', '[]', '{}', '()'], correctAnswer: 1 }
        ]
      },
      {
        title: '高等数学期中模拟',
        subject: '数学',
        duration: 60,
        questionCount: 30,
        difficulty: 'medium' as const,
        status: 'completed' as const,
        score: 85,
        questions: [
          { id: 1, question: '求函数f(x)=x²的导数？', options: ['x', '2x', 'x²', '2'], correctAnswer: 1 },
          { id: 2, question: '∫x dx = ?', options: ['x²/2 + C', 'x + C', 'x² + C', '1/x + C'], correctAnswer: 0 }
        ]
      },
      {
        title: '英语四级模拟考试',
        subject: '英语',
        duration: 120,
        questionCount: 50,
        difficulty: 'medium' as const,
        status: 'in-progress' as const,
        questions: [
          { id: 1, question: 'The book _____ on the table belongs to me.', options: ['lying', 'laying', 'lied', 'lay'], correctAnswer: 0 }
        ]
      },
      {
        title: '数据结构综合测试',
        subject: '计算机',
        duration: 90,
        questionCount: 40,
        difficulty: 'hard' as const,
        status: 'not-started' as const,
        questions: [
          { id: 1, question: '栈的特点是？', options: ['先进先出', '先进后出', '随机访问', '双向访问'], correctAnswer: 1 }
        ]
      }
    ]

    examData.forEach((exam, index) => {
      this.mockExams.push({
        id: `mock-exam-${index + 1}`,
        ...exam
      })
    })
  }

  getAllMockExams(): MockExam[] {
    return this.mockExams
  }

  getMockExamById(id: string): MockExam | undefined {
    return this.mockExams.find(exam => exam.id === id)
  }

  submitExam(id: string, answers: Record<number, string>): { score: number; correctCount: number } {
    const exam = this.mockExams.find(e => e.id === id)
    if (!exam) return { score: 0, correctCount: 0 }

    let correctCount = 0
    exam.questions.forEach(q => {
      if (answers[q.id] === q.options[q.correctAnswer]) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / exam.questions.length) * 100)
    const examIndex = this.mockExams.findIndex(e => e.id === id)
    this.mockExams[examIndex].status = 'completed'
    this.mockExams[examIndex].score = score

    return { score, correctCount }
  }
}