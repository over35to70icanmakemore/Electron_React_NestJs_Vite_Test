import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { ScheduleService, ScheduleItem } from './schedule.service'

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @IpcHandle('getAllSchedules')
  public getAllSchedules() {
    return this.scheduleService.getAllSchedules()
  }

  @IpcHandle('getSchedulesByDate')
  public getSchedulesByDate(event: IpcMainEvent, date: string) {
    return this.scheduleService.getSchedulesByDate(date)
  }

  @IpcHandle('getSchedulesByMonth')
  public getSchedulesByMonth(event: IpcMainEvent, year: number, month: number) {
    return this.scheduleService.getSchedulesByMonth(year, month)
  }

  @IpcHandle('createSchedule')
  public createSchedule(event: IpcMainEvent, schedule: Omit<ScheduleItem, 'id'>) {
    return this.scheduleService.createSchedule(schedule)
  }

  @IpcHandle('updateSchedule')
  public updateSchedule(event: IpcMainEvent, id: string, schedule: Partial<ScheduleItem>) {
    return this.scheduleService.updateSchedule(id, schedule)
  }

  @IpcHandle('deleteSchedule')
  public deleteSchedule(event: IpcMainEvent, id: string) {
    return this.scheduleService.deleteSchedule(id)
  }
}