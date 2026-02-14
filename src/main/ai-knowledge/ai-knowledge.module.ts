import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AiKnowledgeController } from './ai-knowledge.controller'
import { AiKnowledgeService } from './ai-knowledge.service'
import { Knowledge } from './knowledge.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Knowledge])],
  controllers: [AiKnowledgeController],
  providers: [AiKnowledgeService],
  exports: [AiKnowledgeService]
})
export class AiKnowledgeModule {}