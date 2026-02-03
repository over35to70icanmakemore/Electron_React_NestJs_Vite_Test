import React, { useState, useEffect } from 'react'
import { Table, Card, Button, Badge, Tag, Typography } from 'antd'

interface Exam {
  id: string
  name: string
  subject: string
  duration: number
  examDate: string
  status: 'upcoming' | 'completed' | 'missed'
  score?: number
}

interface Course {
  id: string
  name: string
  subject: string
  description: string
}

const MyExamPage: React.FC = () => {
  const [historyExams, setHistoryExams] = useState<Exam[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [availableExams, setAvailableExams] = useState<Exam[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  useEffect(() => {
    // 模拟数据
    setHistoryExams([
      {
        id: '1',
        name: '2026年春季学期数学期末考试',
        subject: '数学',
        duration: 120,
        examDate: '2026-06-15',
        status: 'completed',
        score: 85
      },
      {
        id: '2',
        name: '2026年春季学期英语期中考试',
        subject: '英语',
        duration: 90,
        examDate: '2026-04-20',
        status: 'completed',
        score: 92
      }
    ])

    setCourses([
      {
        id: '1',
        name: '高等数学',
        subject: '数学',
        description: '高等数学基础课程'
      },
      {
        id: '2',
        name: '大学英语',
        subject: '英语',
        description: '大学英语综合课程'
      },
      {
        id: '3',
        name: '计算机基础',
        subject: '计算机',
        description: '计算机基础知识和操作技能'
      }
    ])

    setAvailableExams([
      {
        id: '3',
        name: '2026年春季学期计算机基础考试',
        subject: '计算机',
        duration: 100,
        examDate: '2026-07-01',
        status: 'upcoming'
      }
    ])
  }, [])

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId)
      } else {
        return [...prev, courseId]
      }
    })
  }

  const handleExamReservation = (_examId: string) => {
    console.warn('考试预约成功！')
  }

  const { Title, Text } = Typography

  const historyExamColumns = [
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '科目',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject: string) => <Tag>{subject}</Tag>
    },
    {
      title: '考试日期',
      dataIndex: 'examDate',
      key: 'examDate',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration}分钟`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          completed: { text: '已完成', type: 'success' },
          upcoming: { text: '即将到来', type: 'processing' },
          missed: { text: '已错过', type: 'error' }
        }
        const { text, type } = statusMap[status as keyof typeof statusMap] || { text: status, type: 'default' }
        return <Badge status={type as "warning" | "error" | "default" | "success" | "processing"} text={text} />
      }
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
      render: (score: number | undefined) => score ? `${score}分` : '-'
    }
  ]

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3}>我的考试</Title>
      <Text>欢迎回来，查看您的考试信息和预约情况</Text>

      {/* 历史考试记录 */}
      <div style={{ margin: '20px 0' }}>
        <Title level={4}>历史考试记录</Title>
        <Card>
          <Table
            columns={historyExamColumns}
            dataSource={historyExams}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>

      {/* 课程选择 */}
      <div style={{ margin: '20px 0' }}>
        <Title level={4}>课程选择</Title>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {courses.map(course => (
            <Card key={course.id} style={{ width: 300 }}>
              <div>
                <Text strong>{course.name}</Text>
                <Tag>{course.subject}</Tag>
              </div>
              <Text>{course.description}</Text>
              <Button 
                type={selectedCourses.includes(course.id) ? 'primary' : 'default'}
                onClick={() => handleCourseSelect(course.id)}
                style={{ marginTop: '10px', width: '100%' }}
              >
                {selectedCourses.includes(course.id) ? '已选择' : '选择课程'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* 预约考试 */}
      <div style={{ margin: '20px 0' }}>
        <Title level={4}>预约考试</Title>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {availableExams.map(exam => (
            <Card key={exam.id} style={{ width: 300 }}>
              <div>
                <Text strong>{exam.name}</Text>
                <Tag>{exam.subject}</Tag>
              </div>
              <Text>考试日期: {new Date(exam.examDate).toLocaleDateString()}</Text>
              <Text>考试时长: {exam.duration}分钟</Text>
              <Button 
                type="primary"
                onClick={() => handleExamReservation(exam.id)}
                style={{ marginTop: '10px', width: '100%' }}
              >
                预约考试
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyExamPage