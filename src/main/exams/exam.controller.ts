import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import { ExamService } from './exam.service'
import { Exam } from './exam.entity'

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @IpcHandle('getAllExams')
  public getAllExams() {
    return this.examService.getAllExams()
  }

  @IpcHandle('getExamById')
  public getExamById(_event: unknown, id: string) {
    return this.examService.getExamById(id)
  }

  @IpcHandle('createExam')
  public createExam(_event: unknown, examData: Omit<Exam, 'id' | 'created_by' | 'created_at' | 'updated_at'>) {
    return this.examService.createExam(examData)
  }

  @IpcHandle('updateExam')
  public updateExam(_event: unknown, id: string, examData: Partial<Exam>) {
    return this.examService.updateExam(id, examData)
  }

  @IpcHandle('deleteExam')
  public deleteExam(_event: unknown, id: string) {
    return this.examService.deleteExam(id)
  }
}