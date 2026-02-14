import { Injectable } from '@nestjs/common'

export interface WeatherData {
  city: string
  temperature: number
  weather: string
  humidity: number
  wind: string
  aqi: number
  forecast: ForecastItem[]
  tips: string[]
}

export interface ForecastItem {
  day: string
  weather: string
  temp: string
}

@Injectable()
export class WeatherService {
  private weatherData: Map<string, WeatherData> = new Map()

  constructor() {
    this.generateMockWeather()
  }

  private generateMockWeather() {
    const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']
    const weathers = ['晴', '多云', '小雨', '阴', '雷阵雨']
    const winds = ['东南风 3级', '西北风 2级', '东北风 4级', '南风 2级', '北风 3级']

    cities.forEach((city) => {
      const forecast: ForecastItem[] = []
      const days = ['今天', '明天', '后天', '周六', '周日']

      for (let i = 0; i < 5; i++) {
        forecast.push({
          day: days[i],
          weather: weathers[Math.floor(Math.random() * weathers.length)],
          temp: `${Math.floor(Math.random() * 10) + 15}°/${Math.floor(Math.random() * 8) + 10}°`,
        })
      }

      this.weatherData.set(city, {
        city,
        temperature: Math.floor(Math.random() * 15) + 15,
        weather: weathers[Math.floor(Math.random() * weathers.length)],
        humidity: Math.floor(Math.random() * 40) + 30,
        wind: winds[Math.floor(Math.random() * winds.length)],
        aqi: Math.floor(Math.random() * 100) + 20,
        forecast,
        tips: [
          '今日天气晴朗，适合户外活动',
          '空气质量良好，可以开窗通风',
          '紫外线较强，外出注意防晒',
          '昼夜温差较大，注意增减衣物',
        ],
      })
    })
  }

  getWeatherByCity(city: string): WeatherData | undefined {
    return this.weatherData.get(city) || this.weatherData.get('北京')
  }

  getSupportedCities(): string[] {
    return Array.from(this.weatherData.keys())
  }
}
