import React, { useState, useEffect } from 'react'
import { Card, Button, Progress, Tag, Typography, Space, Modal, Radio, message, Spin } from 'antd'
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
  questions?: Question[]
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const MockExam: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([])
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getAllMockExams()
      setExams(data)
    } catch (error) {
      console.error('获取模拟考试数据失败:', error)
      message.error('获取模拟考试数据失败')
    } finally {
      setLoading(false)
    }
  }

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

  const handleStartExam = async (exam: Exam) => {
    try {
      const examData = await window.electron.getMockExamById(exam.id)
      setSelectedExam(examData)
      setCurrentQuestion(0)
      setAnswers({})
      setIsModalVisible(true)
    } catch (error) {
      console.error('获取考试详情失败:', error)
      message.error('获取考试详情失败')
    }
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNextQuestion = () => {
    if (selectedExam?.questions && currentQuestion < selectedExam.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!selectedExam) return
    
    try {
      const result = await window.electron.submitMockExam(selectedExam.id, answers)
      message.success(`考试已提交！得分: ${result.score}`)
      setIsModalVisible(false)
      fetchExams()
    } catch (error) {
      console.error('提交考试失败:', error)
      message.error('提交考试失败')
    }
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
              <Title level={4}>{exams.filter(e => e.status === 'completed').length}</Title>
            </div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <ClockCircleOutlined className="stat-icon" style={{ color: '#1890ff' }} />
            <div>
              <Text type="secondary">进行中</Text>
              <Title level={4}>{exams.filter(e => e.status === 'in-progress').length}</Title>
            </div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <CheckCircleOutlined className="stat-icon" style={{ color: '#faad14' }} />
            <div>
              <Text type="secondary">平均分</Text>
              <Title level={4}>
                {exams.filter(e => e.score).length > 0 
                  ? Math.round(exams.filter(e => e.score).reduce((sum, e) => sum + (e.score || 0), 0) / exams.filter(e => e.score).length)
                  : 0}
              </Title>
            </div>
          </div>
        </Card>
      </div>

      <Spin spinning={loading}>
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
      </Spin>

      <Modal
        title={selectedExam?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedExam?.questions && (
          <div className="exam-modal">
            <div className="question-progress">
              <Progress 
                percent={((currentQuestion + 1) / selectedExam.questions.length) * 100} 
                format={() => `${currentQuestion + 1}/${selectedExam.questions!.length}`}
              />
            </div>
            
            <div className="question-content">
              <Title level={5}>
                {currentQuestion + 1}. {selectedExam.questions[currentQuestion].question}
              </Title>
              <Radio.Group
                value={answers[selectedExam.questions[currentQuestion].id]}
                onChange={(e) => handleAnswerChange(selectedExam.questions[currentQuestion].id, e.target.value)}
              >
                <Space direction="vertical">
                  {selectedExam.questions[currentQuestion].options.map((option, index) => (
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
              {currentQuestion < selectedExam.questions.length - 1 ? (
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