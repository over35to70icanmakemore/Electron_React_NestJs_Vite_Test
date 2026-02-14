import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Schedule } from './schedule.entity'

@Injectable()
export class ScheduleService implements OnModuleInit {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async onModuleInit() {
    const count = await this.scheduleRepository.count()
    if (count === 0) {
      await this.seedSchedules()
    }
  }

  private async seedSchedules() {
    const today = new Date()
    const formatDate = (date: Date): string => date.toISOString().split('T')[0]

    const scheduleData = [
      { title: '数学期中考试', date: formatDate(today), time: '09:00', type: 'exam', description: '高等数学第三章至第五章' },
      { title: '英语学习小组', date: formatDate(today), time: '14:00', type: 'study', description: '口语练习和阅读理解' },
      { title: '项目进度会议', date: formatDate(new Date(today.getTime() + 86400000)), time: '10:00', type: 'meeting', description: '讨论项目开发进度' },
      { title: 'Python编程练习', date: formatDate(new Date(today.getTime() + 2 * 86400000)), time: '19:00', type: 'study', description: '完成课后习题' }
    ]

    for (const data of scheduleData) {
      const schedule = this.scheduleRepository.create(data)
      await this.scheduleRepository.save(schedule)
    }
  }

  async getAllSchedules(): Promise<Schedule[]> {
    return this.scheduleRepository.find()
  }

  async getSchedulesByDate(date: string): Promise<Schedule[]> {
    return this.scheduleRepository.find({ where: { date } })
  }

  async getSchedulesByMonth(year: number, month: number): Promise<Schedule[]> {
    return this.scheduleRepository
      .createQueryBuilder('schedule')
      .where('YEAR(schedule.date) = :year', { year })
      .andWhere('MONTH(schedule.date) = :month', { month })
      .getMany()
  }

  async createSchedule(scheduleData: Partial<Schedule>): Promise<Schedule> {
    const schedule = this.scheduleRepository.create(scheduleData)
    return this.scheduleRepository.save(schedule)
  }

  async updateSchedule(id: string, scheduleData: Partial<Schedule>): Promise<Schedule | null> {
    await this.scheduleRepository.update(id, scheduleData)
    return this.scheduleRepository.findOne({ where: { id } })
  }

  async deleteSchedule(id: string): Promise<boolean> {
    const result = await this.scheduleRepository.delete(id)
    return result.affected > 0
  }
}