import { Controller } from '@nestjs/common'
import { IpcHandle, IpcMessageEvent } from '@doubleshot/nest-electron'
import { ExamService, Exam } from './exam.service'

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  // 获取所有考试
  @IpcHandle('getAllExams')
  public getAllExams() {
    return this.examService.getAllExams()
  }

  // 根据 ID 获取考试
  @IpcHandle('getExamById')
  public getExamById(event: IpcMessageEvent, id: string) {
    return this.examService.getExamById(id)
  }

  // 创建新考试
  @IpcHandle('createExam')
  public createExam(event: IpcMessageEvent, examData: Omit<Exam, 'id' | 'created_by' | 'created_at' | 'updated_at'>) {
    return this.examService.createExam(examData)
  }

  // 更新考试
  @IpcHandle('updateExam')
  public updateExam(event: IpcMessageEvent, id: string, examData: Partial<Exam>) {
    return this.examService.updateExam(id, examData)
  }

  // 删除考试
  @IpcHandle('deleteExam')
  public deleteExam(event: IpcMessageEvent, id: string) {
    return this.examService.deleteExam(id)
  }
}
