import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { MockExamService } from './mock-exam.service'

@Controller()
export class MockExamController {
  constructor(private readonly mockExamService: MockExamService) {}

  @IpcHandle('getAllMockExams')
  public getAllMockExams() {
    return this.mockExamService.getAllMockExams()
  }

  @IpcHandle('getMockExamById')
  public getMockExamById(event: IpcMainEvent, id: string) {
    return this.mockExamService.getMockExamById(id)
  }

  @IpcHandle('submitMockExam')
  public submitExam(event: IpcMainEvent, id: string, answers: Record<number, string>) {
    return this.mockExamService.submitExam(id, answers)
  }
}