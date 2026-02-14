import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Exam } from './exam.entity'

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async getAllExams(): Promise<Exam[]> {
    return this.examRepository.find()
  }

  async getExamById(id: string): Promise<Exam | null> {
    return this.examRepository.findOne({ where: { id } })
  }

  async createExam(examData: Partial<Exam>): Promise<Exam> {
    const exam = this.examRepository.create(examData)
    return this.examRepository.save(exam)
  }

  async updateExam(id: string, examData: Partial<Exam>): Promise<Exam | null> {
    await this.examRepository.update(id, examData)
    return this.getExamById(id)
  }

  async deleteExam(id: string): Promise<boolean> {
    const result = await this.examRepository.delete(id)
    return result.affected > 0
  }
}