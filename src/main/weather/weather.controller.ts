import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { WeatherService } from './weather.service'

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @IpcHandle('getWeatherByCity')
  public getWeatherByCity(event: IpcMainEvent, city: string) {
    return this.weatherService.getWeatherByCity(city)
  }

  @IpcHandle('getSupportedCities')
  public getSupportedCities() {
    return this.weatherService.getSupportedCities()
  }
}