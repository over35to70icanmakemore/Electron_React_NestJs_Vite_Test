import React, { useState } from 'react'
import { Calendar, Card, Typography, Tag, List, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd'
import { ScheduleOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import './Schedule.css'

const { Title, Text } = Typography
const { Option } = Select

interface ScheduleItem {
  id: string
  title: string
  date: string
  time: string
  type: 'exam' | 'meeting' | 'study' | 'other'
  description: string
}

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      title: '数学期中考试',
      date: '2026-02-15',
      time: '09:00',
      type: 'exam',
      description: '高等数学第三章至第五章'
    },
    {
      id: '2',
      title: '英语学习小组',
      date: '2026-02-15',
      time: '14:00',
      type: 'study',
      description: '口语练习和阅读理解'
    },
    {
      id: '3',
      title: '项目进度会议',
      date: '2026-02-16',
      time: '10:00',
      type: 'meeting',
      description: '讨论项目开发进度'
    },
    {
      id: '4',
      title: 'Python编程练习',
      date: '2026-02-17',
      time: '19:00',
      type: 'study',
      description: '完成课后习题'
    }
  ])

  const getTypeColor = (type: string) => {
    const colors = {
      exam: 'red',
      meeting: 'blue',
      study: 'green',
      other: 'orange'
    }
    return colors[type as keyof typeof colors] || 'default'
  }

  const getTypeText = (type: string) => {
    const texts = {
      exam: '考试',
      meeting: '会议',
      study: '学习',
      other: '其他'
    }
    return texts[type as keyof typeof texts] || type
  }

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD')
    const daySchedules = schedules.filter(s => s.date === dateStr)
    
    return (
      <div className="date-cell">
        {daySchedules.map(schedule => (
          <Tag
            key={schedule.id}
            color={getTypeColor(schedule.type)}
            className="schedule-tag"
          >
            {schedule.title}
          </Tag>
        ))}
      </div>
    )
  }

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date)
  }

  const handleAddSchedule = () => {
    setIsModalVisible(true)
    form.setFieldsValue({
      date: selectedDate
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newSchedule: ScheduleItem = {
        id: Date.now().toString(),
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time,
        type: values.type,
        description: values.description || ''
      }
      setSchedules([...schedules, newSchedule])
      setIsModalVisible(false)
      form.resetFields()
      message.success('行程添加成功')
    })
  }

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id))
    message.success('行程已删除')
  }

  const selectedDateSchedules = schedules.filter(
    s => s.date === selectedDate.format('YYYY-MM-DD')
  )

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <Title level={4}>
          <ScheduleOutlined /> 行程日历
        </Title>
        <Text type="secondary">管理日程和安排，合理规划时间</Text>
      </div>

      <div className="schedule-content">
        <Card className="calendar-card">
          <Calendar
            fullscreen={false}
            onSelect={handleDateSelect}
            cellRender={(current, info) => {
              if (info.type === 'date') return dateCellRender(current)
              return info.originNode
            }}
          />
        </Card>

        <Card className="schedule-list-card">
          <div className="list-header">
            <Title level={5}>
              {selectedDate.format('YYYY年MM月DD日')} 的行程
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSchedule}
            >
              添加行程
            </Button>
          </div>

          <List
            dataSource={selectedDateSchedules}
            locale={{ emptyText: '暂无行程安排' }}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(item.id)}
                  />
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <Text strong>{item.title}</Text>
                      <Tag color={getTypeColor(item.type)}>
                        {getTypeText(item.type)}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">时间: {item.time}</Text>
                      {item.description && (
                        <Text type="secondary">{item.description}</Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <Modal
        title="添加行程"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入行程标题" />
          </Form.Item>
          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="time"
            label="时间"
            rules={[{ required: true, message: '请输入时间' }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder="请选择类型">
              <Option value="exam">考试</Option>
              <Option value="meeting">会议</Option>
              <Option value="study">学习</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="请输入描述（可选）" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Schedule