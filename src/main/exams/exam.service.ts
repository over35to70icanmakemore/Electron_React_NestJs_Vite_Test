import { Injectable } from '@nestjs/common'

// 考试数据类型定义
export interface Exam {
  id: string
  title: string
  description: string
  duration: number
  start_time: string
  end_time: string
  status: 'draft' | 'published' | 'ended'
  pass_score: number
  created_by: string
  created_at: string
  updated_at: string
}

@Injectable()
export class ExamService {
  private exams: Exam[] = []

  constructor() {
    // 生成 25 条模拟数据
    this.generateMockExams()
  }

  // 生成模拟考试数据
  private generateMockExams() {
    const subjects = ['数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治', '计算机', '语文']
    const statuses: ('draft' | 'published' | 'ended')[] = ['draft', 'published', 'ended']
    const descriptions = [
      '期末考试',
      '期中考试',
      '单元测试',
      '模拟考试',
      '随堂测试'
    ]

    for (let i = 1; i <= 25; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)]
      const description = descriptions[Math.floor(Math.random() * descriptions.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const duration = Math.floor(Math.random() * 60) + 60 // 60-120分钟
      const passScore = Math.floor(Math.random() * 20) + 60 // 60-80分

      // 生成随机日期
      const now = new Date()
      const startDate = new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
      const endDate = new Date(startDate.getTime() + duration * 60 * 1000)

      const exam: Exam = {
        id: `exam-${i}`,
        title: `${2026}年春季学期${subject}${description}`,
        description: `${subject}${description}，涵盖${subject}课程的主要知识点`,
        duration,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        status,
        pass_score: passScore,
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      this.exams.push(exam)
    }
  }

  // 获取所有考试
  getAllExams(): Exam[] {
    return this.exams
  }

  // 根据 ID 获取考试
  getExamById(id: string): Exam | undefined {
    return this.exams.find(exam => exam.id === id)
  }

  // 创建新考试
  createExam(exam: Omit<Exam, 'id' | 'created_by' | 'created_at' | 'updated_at'>): Exam {
    const newExam: Exam = {
      ...exam,
      id: `exam-${Date.now()}`,
      created_by: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    this.exams.push(newExam)
    return newExam
  }

  // 更新考试
  updateExam(id: string, exam: Partial<Exam>): Exam | undefined {
    const index = this.exams.findIndex(e => e.id === id)
    if (index === -1) {
      return undefined
    }

    this.exams[index] = {
      ...this.exams[index],
      ...exam,
      updated_at: new Date().toISOString()
    }

    return this.exams[index]
  }

  // 删除考试
  deleteExam(id: string): boolean {
    const initialLength = this.exams.length
    this.exams = this.exams.filter(exam => exam.id !== id)
    return this.exams.length < initialLength
  }
}
