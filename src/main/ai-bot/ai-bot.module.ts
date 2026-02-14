import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AiBotController } from './ai-bot.controller'
import { AiBotService } from './ai-bot.service'
import { ChatMessage } from './chat-message.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  controllers: [AiBotController],
  providers: [AiBotService],
  exports: [AiBotService]
})
export class AiBotModule {}