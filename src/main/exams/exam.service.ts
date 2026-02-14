import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Exam } from './exam.entity'

interface ExamData {
  id: string
  title: string
  description: string
  duration: number
  start_time: Date
  end_time: Date
  status: string
  pass_score: number
  created_by: string
}

@Injectable()
export class ExamService implements OnModuleInit {
  private useDatabase = true
  private mockExamData: ExamData[] = [
    {
      id: '1',
      title: '高等数学期中考试',
      description: '涵盖第三章至第五章内容',
      duration: 120,
      start_time: new Date('2026-03-01 09:00:00'),
      end_time: new Date('2026-03-01 11:00:00'),
      status: 'upcoming',
      pass_score: 60,
      created_by: 'admin',
    },
    {
      id: '2',
      title: 'Python编程测试',
      description: '基础语法与数据结构',
      duration: 90,
      start_time: new Date('2026-03-05 14:00:00'),
      end_time: new Date('2026-03-05 15:30:00'),
      status: 'upcoming',
      pass_score: 70,
      created_by: 'admin',
    },
  ]

  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.examRepository.count()
      if (count === 0) {
        await this.seedExams()
      }
    }
    catch {
      this.useDatabase = false
    }
  }

  private async seedExams() {
    const examData = [
      {
        title: '高等数学期中考试',
        description: '涵盖第三章至第五章内容',
        duration: 120,
        start_time: new Date('2026-03-01 09:00:00'),
        end_time: new Date('2026-03-01 11:00:00'),
        status: 'upcoming',
        pass_score: 60,
        created_by: 'admin',
      },
      {
        title: 'Python编程测试',
        description: '基础语法与数据结构',
        duration: 90,
        start_time: new Date('2026-03-05 14:00:00'),
        end_time: new Date('2026-03-05 15:30:00'),
        status: 'upcoming',
        pass_score: 70,
        created_by: 'admin',
      },
    ]

    for (const data of examData) {
      const exam = this.examRepository.create(data)
      await this.examRepository.save(exam)
    }
  }

  async getAllExams(): Promise<ExamData[]> {
    if (!this.useDatabase)
      return this.mockExamData
    try {
      return await this.examRepository.find()
    }
    catch {
      return this.mockExamData
    }
  }

  async getExamById(id: string): Promise<ExamData | null> {
    if (!this.useDatabase)
      return this.mockExamData.find(item => item.id === id) || null
    try {
      return await this.examRepository.findOne({ where: { id } })
    }
    catch {
      return this.mockExamData.find(item => item.id === id) || null
    }
  }

  async createExam(examData: Partial<ExamData>): Promise<ExamData> {
    const newExam: ExamData = {
      id: Date.now().toString(),
      title: examData.title || '',
      description: examData.description || '',
      duration: examData.duration || 60,
      start_time: examData.start_time || new Date(),
      end_time: examData.end_time || new Date(),
      status: examData.status || 'upcoming',
      pass_score: examData.pass_score || 60,
      created_by: examData.created_by || 'admin',
    }

    if (!this.useDatabase) {
      this.mockExamData.push(newExam)
      return newExam
    }

    try {
      const exam = this.examRepository.create(examData)
      return await this.examRepository.save(exam)
    }
    catch {
      this.mockExamData.push(newExam)
      return newExam
    }
  }

  async updateExam(id: string, examData: Partial<ExamData>): Promise<ExamData | null> {
    if (!this.useDatabase) {
      const index = this.mockExamData.findIndex(item => item.id === id)
      if (index === -1)
        return null
      this.mockExamData[index] = { ...this.mockExamData[index], ...examData }
      return this.mockExamData[index]
    }

    try {
      await this.examRepository.update(id, examData)
      return await this.examRepository.findOne({ where: { id } })
    }
    catch {
      const index = this.mockExamData.findIndex(item => item.id === id)
      if (index === -1)
        return null
      this.mockExamData[index] = { ...this.mockExamData[index], ...examData }
      return this.mockExamData[index]
    }
  }

  async deleteExam(id: string): Promise<boolean> {
    if (!this.useDatabase) {
      const index = this.mockExamData.findIndex(item => item.id === id)
      if (index === -1)
        return false
      this.mockExamData.splice(index, 1)
      return true
    }

    try {
      const result = await this.examRepository.delete(id)
      return result.affected > 0
    }
    catch {
      const index = this.mockExamData.findIndex(item => item.id === id)
      if (index === -1)
        return false
      this.mockExamData.splice(index, 1)
      return true
    }
  }
}
