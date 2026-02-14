import React, { useState, useEffect, useRef } from 'react'
import { Input, Button, Card, Avatar, Typography, Space, Tag, Spin } from 'antd'
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
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quickQuestions, setQuickQuestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    fetchChatHistory()
    fetchQuickQuestions()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchChatHistory = async () => {
    try {
      const history = await window.electron.getChatHistory()
      setMessages(history.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    } catch (error) {
      console.error('获取聊天记录失败:', error)
    }
  }

  const fetchQuickQuestions = async () => {
    try {
      const questions = await window.electron.getQuickQuestions()
      setQuickQuestions(questions)
    } catch (error) {
      console.error('获取快捷问题失败:', error)
    }
  }

  const handleSend = async () => {
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

    try {
      const response = await window.electron.sendMessage(inputValue)
      const assistantMessage: Message = {
        id: response.id,
        role: 'assistant',
        content: response.content,
        timestamp: new Date(response.timestamp)
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('发送消息失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = async () => {
    try {
      await window.electron.clearChatHistory()
      fetchChatHistory()
    } catch (error) {
      console.error('清空对话失败:', error)
    }
  }

  return (
    <div className="ai-bot-container">
      <div className="bot-header">
        <Title level={4}>
          <RobotOutlined /> 智能机器人
        </Title>
        <Text type="secondary">AI智能问答助手，随时为您解答疑惑</Text>
      </div>

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