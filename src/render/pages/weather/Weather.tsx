import React, { useState, useEffect } from 'react'
import { Card, Typography, Tag, Space, Input, Button, message, Spin } from 'antd'
import { CloudOutlined, SunOutlined, CloudFilled, ThunderboltOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import './Weather.css'

const { Title, Text } = Typography

interface WeatherData {
  city: string
  temperature: number
  weather: string
  humidity: number
  wind: string
  aqi: number
  forecast: {
    day: string
    weather: string
    temp: string
  }[]
  tips: string[]
}

const Weather: React.FC = () => {
  const [city, setCity] = useState('北京')
  const [searchCity, setSearchCity] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather()
  }, [city])

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getWeatherByCity(city)
      setWeatherData(data)
    } catch (error) {
      console.error('获取天气数据失败:', error)
      message.error('获取天气数据失败')
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case '晴':
        return <SunOutlined style={{ color: '#faad14', fontSize: 48 }} />
      case '多云':
        return <CloudFilled style={{ color: '#1890ff', fontSize: 48 }} />
      case '小雨':
      case '雨':
        return <CloudOutlined style={{ color: '#52c41a', fontSize: 48 }} />
      case '雷阵雨':
        return <ThunderboltOutlined style={{ color: '#722ed1', fontSize: 48 }} />
      default:
        return <CloudOutlined style={{ color: '#8c8c8c', fontSize: 48 }} />
    }
  }

  const getAqiLevel = (aqi: number) => {
    if (aqi <= 50) return { text: '优', color: 'green' }
    if (aqi <= 100) return { text: '良', color: 'blue' }
    if (aqi <= 150) return { text: '轻度污染', color: 'orange' }
    if (aqi <= 200) return { text: '中度污染', color: 'red' }
    return { text: '重度污染', color: 'purple' }
  }

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity)
      setSearchCity('')
      message.success(`已切换到 ${searchCity}`)
    }
  }

  const handleRefresh = () => {
    fetchWeather()
    message.success('天气数据已刷新')
  }

  if (!weatherData) return null

  const aqiLevel = getAqiLevel(weatherData.aqi)

  return (
    <div className="weather-container">
      <div className="weather-header">
        <Title level={4}>
          <CloudOutlined /> 天气预报
        </Title>
        <Text type="secondary">查看实时天气信息，合理安排出行</Text>
      </div>

      <div className="search-section">
        <Space.Compact style={{ width: '100%', maxWidth: 400 }}>
          <Input
            placeholder="输入城市名称"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
        </Space.Compact>
      </div>

      <Spin spinning={loading}>
        <Card className="current-weather">
          <div className="weather-main">
            <div className="weather-info">
              <Title level={2}>{weatherData.city}</Title>
              <div className="temperature">
                {weatherData.temperature}°C
              </div>
              <div className="weather-desc">
                {getWeatherIcon(weatherData.weather)}
                <Text style={{ fontSize: 24, marginLeft: 12 }}>{weatherData.weather}</Text>
              </div>
            </div>
            <div className="weather-details">
              <div className="detail-item">
                <Text type="secondary">湿度</Text>
                <Text strong>{weatherData.humidity}%</Text>
              </div>
              <div className="detail-item">
                <Text type="secondary">风力</Text>
                <Text strong>{weatherData.wind}</Text>
              </div>
              <div className="detail-item">
                <Text type="secondary">空气质量</Text>
                <Tag color={aqiLevel.color}>{aqiLevel.text} {weatherData.aqi}</Tag>
              </div>
            </div>
          </div>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh} style={{ marginTop: 16 }}>
            刷新数据
          </Button>
        </Card>
      </Spin>

      <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>未来5天预报</Title>
      <div className="forecast-list">
        {weatherData.forecast.map((item, index) => (
          <Card key={index} className="forecast-card">
            <Text strong>{item.day}</Text>
            <div className="forecast-icon">
              {getWeatherIcon(item.weather)}
            </div>
            <Text>{item.weather}</Text>
            <Text type="secondary">{item.temp}</Text>
          </Card>
        ))}
      </div>

      <Card className="tips-card" style={{ marginTop: 24 }}>
        <Title level={5}>生活小贴士</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          {weatherData.tips.map((tip, index) => (
            <Text key={index}>• {tip}</Text>
          ))}
        </Space>
      </Card>
    </div>
  )
}

export default Weather