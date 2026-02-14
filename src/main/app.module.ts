import { join } from 'node:path'
import { ElectronModule } from '@doubleshot/nest-electron'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { app, BrowserWindow } from 'electron'
import { AiBotModule } from './ai-bot/ai-bot.module'
import { AiKnowledgeModule } from './ai-knowledge/ai-knowledge.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { databaseConfig } from './config/database.config'
import { ExamModule } from './exams/exam.module'
import { MockExamModule } from './mock-exam/mock-exam.module'
import { ProfileModule } from './profile/profile.module'
import { QuizModule } from './quiz/quiz.module'
import { ScheduleModule } from './schedule/schedule.module'
import { TodoModule } from './todo/todo.module'
import { UserModule } from './user/user.module'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ElectronModule.registerAsync({
      useFactory: async () => {
        const isDev = !app.isPackaged
        const win = new BrowserWindow({
          width: 1280,
          height: 1024,
          autoHideMenuBar: false,
          title: 'electron开发模板',
          webPreferences: {
            contextIsolation: true,
            preload: join(__dirname, '../preload/index.js'),
          },
        })

        win.on('closed', () => {
          win.destroy()
        })

        const URL = isDev
          ? process.env.DS_RENDERER_URL
          : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

        win.loadURL(URL)

        return { win }
      },
    }),
    AuthModule,
    UserModule,
    ExamModule,
    AiKnowledgeModule,
    AiBotModule,
    MockExamModule,
    QuizModule,
    WeatherModule,
    ScheduleModule,
    TodoModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
