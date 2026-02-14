import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { AiBotService } from './ai-bot.service'

@Controller()
export class AiBotController {
  constructor(private readonly aiBotService: AiBotService) {}

  @IpcHandle('getChatHistory')
  public getChatHistory() {
    return this.aiBotService.getChatHistory()
  }

  @IpcHandle('getQuickQuestions')
  public getQuickQuestions() {
    return this.aiBotService.getQuickQuestions()
  }

  @IpcHandle('sendMessage')
  public sendMessage(event: IpcMainEvent, content: string) {
    return this.aiBotService.sendMessage(content)
  }

  @IpcHandle('clearChatHistory')
  public clearHistory() {
    return this.aiBotService.clearHistory()
  }
}