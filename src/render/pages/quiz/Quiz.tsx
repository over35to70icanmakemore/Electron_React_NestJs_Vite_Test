import React, { useState, useEffect } from 'react'
import { Card, Button, Progress, Tag, Typography, Space, Result, Statistic, message, Spin } from 'antd'
import { QuestionCircleOutlined, TrophyOutlined, HeartOutlined, FireOutlined } from '@ant-design/icons'
import './Quiz.css'

const { Title, Text } = Typography

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getQuizQuestions(5)
      setQuestions(data)
    } catch (error) {
      console.error('获取问答题目失败:', error)
      message.error('获取问答题目失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = async (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    try {
      const result = await window.electron.submitQuizAnswer(questions[currentQuestion].id, answerIndex)
      if (result.correct) {
        setScore(prev => prev + 20)
        setCorrectCount(prev => prev + 1)
      }
    } catch (error) {
      console.error('提交答案失败:', error)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsAnswered(false)
    setCorrectCount(0)
    fetchQuestions()
  }

  const getOptionClass = (index: number) => {
    if (!isAnswered) return 'quiz-option'
    if (index === questions[currentQuestion].correctAnswer) {
      return 'quiz-option correct'
    }
    if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
      return 'quiz-option wrong'
    }
    return 'quiz-option'
  }

  if (showResult) {
    return (
      <div className="quiz-container">
        <Result
          icon={<TrophyOutlined style={{ color: '#faad14' }} />}
          title="答题完成！"
          subTitle="恭喜你完成了本次趣味问答"
          extra={[
            <div key="stats" className="result-stats">
              <Statistic title="最终得分" value={score} suffix="分" />
              <Statistic title="正确题数" value={correctCount} suffix={`/ ${questions.length}`} />
              <Statistic 
                title="正确率" 
                value={(correctCount / questions.length * 100).toFixed(0)} 
                suffix="%" 
              />
            </div>,
            <Button type="primary" size="large" onClick={handleRestart} key="restart">
              再来一次
            </Button>
          ]}
        />
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <Title level={4}>
          <QuestionCircleOutlined /> 趣味问答
        </Title>
        <Text type="secondary">趣味知识问答挑战，测试你的知识储备</Text>
      </div>

      <Spin spinning={loading}>
        {questions.length > 0 && (
          <>
            <div className="quiz-stats">
              <Space size="large">
                <div className="stat-item">
                  <FireOutlined style={{ color: '#ff4d4f' }} />
                  <Text>第 {currentQuestion + 1} / {questions.length} 题</Text>
                </div>
                <div className="stat-item">
                  <TrophyOutlined style={{ color: '#faad14' }} />
                  <Text>得分: {score}</Text>
                </div>
                <div className="stat-item">
                  <HeartOutlined style={{ color: '#eb2f96' }} />
                  <Text>正确: {correctCount}</Text>
                </div>
              </Space>
            </div>

            <Progress 
              percent={((currentQuestion + 1) / questions.length) * 100} 
              showInfo={false}
              strokeColor="#1890ff"
            />

            <Card className="question-card">
              <div className="question-category">
                <Tag color="blue">{questions[currentQuestion].category}</Tag>
              </div>
              <Title level={4} className="question-text">
                {questions[currentQuestion].question}
              </Title>
              <div className="options-list">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={getOptionClass(index)}
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
            </Card>

            {isAnswered && (
              <div className="quiz-actions">
                <Button type="primary" size="large" onClick={handleNextQuestion}>
                  {currentQuestion < questions.length - 1 ? '下一题' : '查看结果'}
                </Button>
              </div>
            )}
          </>
        )}
      </Spin>
    </div>
  )
}

export default Quiz