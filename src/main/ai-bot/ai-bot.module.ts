import { Module } from '@nestjs/common'
// 找不到 @nestjs/typeorm，改用 @nestjs/typeorm 的替代方案或本地定义
// 这里仅作占位，实际使用时请确保项目已安装 typeorm 相关依赖
// 例如：npm install @nestjs/typeorm typeorm
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