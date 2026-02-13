import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, Card, Avatar, Typography, Space, Tag } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons'
import './AIBot.css'

const { TextArea } = Input
const { Text, Title } = Typography

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const AIBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '您好！我是AI智能助手，可以帮助您解答各种问题。请问有什么可以帮助您的吗？',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    setTimeout(() => {
      const responses = [
        '这是一个很好的问题！让我来为您详细解答...',
        '根据我的理解，这个问题的答案是这样的...',
        '我理解您的疑问，让我为您提供一些参考信息...',
        '这是一个有趣的话题，我来为您分析一下...',
        '感谢您的提问，我来为您详细说明...'
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)] + 
                 '\n\n这是模拟的AI回复内容。在实际应用中，这里会接入真实的AI接口来生成智能回复。',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: '对话已清空。请问有什么新的问题需要我帮助您解答吗？',
        timestamp: new Date()
      }
    ])
  }

  const quickQuestions = [
    '如何提高学习效率？',
    'Python和Java的区别是什么？',
    '如何准备考试？',
    '什么是机器学习？'
  ]

  return (
    <div className="ai-bot-container">
      {/* 头部信息 */}
      <div className="bot-header">
        <Title level={4}>
          <RobotOutlined /> 智能机器人
        </Title>
        <Text type="secondary">AI智能问答助手，随时为您解答疑惑</Text>
      </div>

      {/* 对话区域 */}
      <Card className="chat-card">
        <div className="messages-container">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <Avatar
                icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                className={`message-avatar ${msg.role}`}
              />
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <Text type="secondary" className="message-time">
                  {msg.timestamp.toLocaleTimeString()}
                </Text>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-item assistant-message">
              <Avatar icon={<RobotOutlined />} className="message-avatar assistant" />
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* 快捷问题 */}
      <div className="quick-questions">
        <Text type="secondary">快捷问题：</Text>
        <Space wrap>
          {quickQuestions.map((q, index) => (
            <Tag
              key={index}
              className="quick-tag"
              onClick={() => setInputValue(q)}
            >
              {q}
            </Tag>
          ))}
        </Space>
      </div>

      {/* 输入区域 */}
      <div className="input-area">
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入您的问题..."
          autoSize={{ minRows: 2, maxRows: 4 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          className="input-textarea"
        />
        <Space>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={isLoading}
          >
            发送
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleClear}
          >
            清空对话
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default AIBot