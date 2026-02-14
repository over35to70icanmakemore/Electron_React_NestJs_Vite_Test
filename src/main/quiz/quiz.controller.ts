import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { QuizService } from './quiz.service'

@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @IpcHandle('getQuizQuestions')
  public getQuizQuestions(event: IpcMainEvent, count: number = 5) {
    return this.quizService.getQuizQuestions(count)
  }

  @IpcHandle('submitQuizAnswer')
  public submitAnswer(event: IpcMainEvent, questionId: number, answerIndex: number) {
    return this.quizService.submitAnswer(questionId, answerIndex)
  }

  @IpcHandle('getQuizCategories')
  public getCategories() {
    return this.quizService.getCategories()
  }
}