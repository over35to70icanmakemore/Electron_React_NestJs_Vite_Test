import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Schedule } from './schedule.entity'

interface ScheduleItem {
  id: string
  title: string
  date: string
  time: string
  type: string
  description: string
}

@Injectable()
export class ScheduleService implements OnModuleInit {
  private useDatabase = true
  private today = new Date()
  private formatDate = (date: Date): string => date.toISOString().split('T')[0]

  private mockScheduleData: ScheduleItem[] = [
    { id: '1', title: '数学期中考试', date: this.formatDate(this.today), time: '09:00', type: 'exam', description: '高等数学第三章至第五章' },
    { id: '2', title: '英语学习小组', date: this.formatDate(this.today), time: '14:00', type: 'study', description: '口语练习和阅读理解' },
    { id: '3', title: '项目进度会议', date: this.formatDate(new Date(this.today.getTime() + 86400000)), time: '10:00', type: 'meeting', description: '讨论项目开发进度' },
    { id: '4', title: 'Python编程练习', date: this.formatDate(new Date(this.today.getTime() + 2 * 86400000)), time: '19:00', type: 'study', description: '完成课后习题' },
  ]

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.scheduleRepository.count()
      if (count === 0) {
        await this.seedSchedules()
      }
    }
    catch {
      this.useDatabase = false
    }
  }

  private async seedSchedules() {
    const scheduleData = [
      { title: '数学期中考试', date: this.formatDate(this.today), time: '09:00', type: 'exam', description: '高等数学第三章至第五章' },
      { title: '英语学习小组', date: this.formatDate(this.today), time: '14:00', type: 'study', description: '口语练习和阅读理解' },
      { title: '项目进度会议', date: this.formatDate(new Date(this.today.getTime() + 86400000)), time: '10:00', type: 'meeting', description: '讨论项目开发进度' },
      { title: 'Python编程练习', date: this.formatDate(new Date(this.today.getTime() + 2 * 86400000)), time: '19:00', type: 'study', description: '完成课后习题' },
    ]

    for (const data of scheduleData) {
      const schedule = this.scheduleRepository.create(data)
      await this.scheduleRepository.save(schedule)
    }
  }

  async getAllSchedules(): Promise<ScheduleItem[]> {
    if (!this.useDatabase)
      return this.mockScheduleData
    try {
      return await this.scheduleRepository.find()
    }
    catch {
      return this.mockScheduleData
    }
  }

  async getSchedulesByDate(date: string): Promise<ScheduleItem[]> {
    if (!this.useDatabase)
      return this.mockScheduleData.filter(item => item.date === date)
    try {
      return await this.scheduleRepository.find({ where: { date } })
    }
    catch {
      return this.mockScheduleData.filter(item => item.date === date)
    }
  }

  async getSchedulesByMonth(year: number, month: number): Promise<ScheduleItem[]> {
    if (!this.useDatabase) {
      return this.mockScheduleData.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
      })
    }
    try {
      return await this.scheduleRepository
        .createQueryBuilder('schedule')
        .where('YEAR(schedule.date) = :year', { year })
        .andWhere('MONTH(schedule.date) = :month', { month })
        .getMany()
    }
    catch {
      return this.mockScheduleData.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
      })
    }
  }

  async createSchedule(scheduleData: Partial<ScheduleItem>): Promise<ScheduleItem> {
    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      title: scheduleData.title || '',
      date: scheduleData.date || '',
      time: scheduleData.time || '',
      type: scheduleData.type || '',
      description: scheduleData.description || '',
    }

    if (!this.useDatabase) {
      this.mockScheduleData.push(newSchedule)
      return newSchedule
    }

    try {
      const schedule = this.scheduleRepository.create(scheduleData)
      return await this.scheduleRepository.save(schedule)
    }
    catch {
      this.mockScheduleData.push(newSchedule)
      return newSchedule
    }
  }

  async updateSchedule(id: string, scheduleData: Partial<ScheduleItem>): Promise<ScheduleItem | null> {
    if (!this.useDatabase) {
      const index = this.mockScheduleData.findIndex(item => item.id === id)
      if (index === -1)
        return null
      this.mockScheduleData[index] = { ...this.mockScheduleData[index], ...scheduleData }
      return this.mockScheduleData[index]
    }

    try {
      await this.scheduleRepository.update(id, scheduleData)
      return await this.scheduleRepository.findOne({ where: { id } })
    }
    catch {
      const index = this.mockScheduleData.findIndex(item => item.id === id)
      if (index === -1)
        return null
      this.mockScheduleData[index] = { ...this.mockScheduleData[index], ...scheduleData }
      return this.mockScheduleData[index]
    }
  }

  async deleteSchedule(id: string): Promise<boolean> {
    if (!this.useDatabase) {
      const index = this.mockScheduleData.findIndex(item => item.id === id)
      if (index === -1)
        return false
      this.mockScheduleData.splice(index, 1)
      return true
    }

    try {
      const result = await this.scheduleRepository.delete(id)
      return result.affected > 0
    }
    catch {
      const index = this.mockScheduleData.findIndex(item => item.id === id)
      if (index === -1)
        return false
      this.mockScheduleData.splice(index, 1)
      return true
    }
  }
}
