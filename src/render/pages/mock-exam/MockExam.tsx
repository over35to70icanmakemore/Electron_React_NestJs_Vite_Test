import React, { useState } from 'react'
import { Card, Button, Progress, Tag, Typography, Space, Modal, Radio, message } from 'antd'
import { ThunderboltOutlined, ClockCircleOutlined, TrophyOutlined, CheckCircleOutlined } from '@ant-design/icons'
import './MockExam.css'

const { Title, Text } = Typography

interface Exam {
  id: string
  title: string
  subject: string
  duration: number
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'not-started' | 'in-progress' | 'completed'
  score?: number
}

const MockExam: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const exams: Exam[] = [
    {
      id: '1',
      title: 'Python基础测试',
      subject: 'Python',
      duration: 30,
      questionCount: 20,
      difficulty: 'easy',
      status: 'not-started'
    },
    {
      id: '2',
      title: '高等数学期中模拟',
      subject: '数学',
      duration: 60,
      questionCount: 30,
      difficulty: 'medium',
      status: 'completed',
      score: 85
    },
    {
      id: '3',
      title: '英语四级模拟考试',
      subject: '英语',
      duration: 120,
      questionCount: 50,
      difficulty: 'medium',
      status: 'in-progress'
    },
    {
      id: '4',
      title: '数据结构综合测试',
      subject: '计算机',
      duration: 90,
      questionCount: 40,
      difficulty: 'hard',
      status: 'not-started'
    }
  ]

  const questions = [
    {
      id: 1,
      question: 'Python中，以下哪个是正确的变量命名？',
      options: ['1variable', '_variable', 'var-iable', 'class']
    },
    {
      id: 2,
      question: '以下哪个不是Python的数据类型？',
      options: ['list', 'tuple', 'array', 'dict']
    },
    {
      id: 3,
      question: 'Python中，如何定义一个空列表？',
      options: ['list()', '[]', '{}', '()']
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'green',
      medium: 'orange',
      hard: 'red'
    }
    return colors[difficulty as keyof typeof colors] || 'default'
  }

  const getStatusText = (status: string) => {
    const texts = {
      'not-started': '未开始',
      'in-progress': '进行中',
      'completed': '已完成'
    }
    return texts[status as keyof typeof texts] || status
  }

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentQuestion(0)
    setAnswers({})
    setIsModalVisible(true)
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    message.success('考试已提交！')
    setIsModalVisible(false)
  }

  return (
    <div className="mock-exam-container">
      <div className="exam-header">
        <Title level={4}>
          <ThunderboltOutlined /> 模拟练习
        </Title>
        <Text type="secondary">在线模拟考试练习，检验学习成果</Text>
      </div>

      <div className="exam-stats">
        <Card className="stat-card">
          <div className="stat-content">
            <TrophyOutlined className="stat-icon" style={{ color: '#52c41a' }} />
            <div>
              <Text type="secondary">已完成</Text>
              <Title level={4}>12</Title>
            </div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <ClockCircleOutlined className="stat-icon" style={{ color: '#1890ff' }} />
            <div>
              <Text type="secondary">进行中</Text>
              <Title level={4}>3</Title>
            </div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <CheckCircleOutlined className="stat-icon" style={{ color: '#faad14' }} />
            <div>
              <Text type="secondary">平均分</Text>
              <Title level={4}>85</Title>
            </div>
          </div>
        </Card>
      </div>

      <div className="exam-list">
        {exams.map(exam => (
          <Card key={exam.id} className="exam-card" hoverable>
            <div className="exam-info">
              <Title level={5}>{exam.title}</Title>
              <Space>
                <Tag color="blue">{exam.subject}</Tag>
                <Tag color={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty === 'easy' ? '简单' : exam.difficulty === 'medium' ? '中等' : '困难'}
                </Tag>
                <Tag>{getStatusText(exam.status)}</Tag>
              </Space>
              <div className="exam-details">
                <Text type="secondary">
                  <ClockCircleOutlined /> {exam.duration}分钟
                </Text>
                <Text type="secondary">共{exam.questionCount}题</Text>
                {exam.score && (
                  <Text type="success">得分: {exam.score}</Text>
                )}
              </div>
            </div>
            <Button
              type="primary"
              onClick={() => handleStartExam(exam)}
              disabled={exam.status === 'in-progress'}
            >
              {exam.status === 'not-started' ? '开始考试' : 
               exam.status === 'in-progress' ? '继续考试' : '查看结果'}
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        title={selectedExam?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedExam && (
          <div className="exam-modal">
            <div className="question-progress">
              <Progress 
                percent={((currentQuestion + 1) / questions.length) * 100} 
                format={() => `${currentQuestion + 1}/${questions.length}`}
              />
            </div>
            
            <div className="question-content">
              <Title level={5}>
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </Title>
              <Radio.Group
                value={answers[questions[currentQuestion].id]}
                onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
              >
                <Space direction="vertical">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Radio key={index} value={option}>
                      {String.fromCharCode(65 + index)}. {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            <div className="question-actions">
              <Button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                上一题
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button type="primary" onClick={handleNextQuestion}>
                  下一题
                </Button>
              ) : (
                <Button type="primary" onClick={handleSubmit}>
                  提交试卷
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MockExam