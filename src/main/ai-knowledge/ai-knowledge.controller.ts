import type { IpcMainEvent } from 'electron'
import { IpcHandle } from '@doubleshot/nest-electron'
import { Controller } from '@nestjs/common'
import { AiKnowledgeService } from './ai-knowledge.service'

@Controller()
export class AiKnowledgeController {
  constructor(private readonly aiKnowledgeService: AiKnowledgeService) {}

  @IpcHandle('getAllKnowledge')
  public getAllKnowledge() {
    return this.aiKnowledgeService.getAllKnowledge()
  }

  @IpcHandle('getKnowledgeById')
  public getKnowledgeById(event: IpcMainEvent, id: string) {
    return this.aiKnowledgeService.getKnowledgeById(id)
  }

  @IpcHandle('getKnowledgeByCategory')
  public getKnowledgeByCategory(event: IpcMainEvent, category: string) {
    return this.aiKnowledgeService.getKnowledgeByCategory(category)
  }

  @IpcHandle('searchKnowledge')
  public searchKnowledge(event: IpcMainEvent, query: string) {
    return this.aiKnowledgeService.searchKnowledge(query)
  }
}
