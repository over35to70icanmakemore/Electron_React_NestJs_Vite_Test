import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import { ScheduleService } from './schedule.service'
import { Schedule } from './schedule.entity'

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @IpcHandle('getAllSchedules')
  public getAllSchedules() {
    return this.scheduleService.getAllSchedules()
  }

  @IpcHandle('getSchedulesByDate')
  public getSchedulesByDate(_event: unknown, date: string) {
    return this.scheduleService.getSchedulesByDate(date)
  }

  @IpcHandle('getSchedulesByMonth')
  public getSchedulesByMonth(_event: unknown, year: number, month: number) {
    return this.scheduleService.getSchedulesByMonth(year, month)
  }

  @IpcHandle('createSchedule')
  public createSchedule(_event: unknown, schedule: Omit<Schedule, 'id'>) {
    return this.scheduleService.createSchedule(schedule)
  }

  @IpcHandle('updateSchedule')
  public updateSchedule(_event: unknown, id: string, schedule: Partial<Schedule>) {
    return this.scheduleService.updateSchedule(id, schedule)
  }

  @IpcHandle('deleteSchedule')
  public deleteSchedule(_event: unknown, id: string) {
    return this.scheduleService.deleteSchedule(id)
  }
}