import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Alert, Space, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './Auth.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // 模拟用户数据
  const mockUsers = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'teacher', password: 'teacher123', role: 'teacher' },
    { id: 3, username: 'user', password: 'user123', role: 'user' }
  ]

  const handleLogin = () => {
    setError('')
    setIsLoading(true)

    // 模拟登录验证
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username && u.password === password)
      if (user) {
        // 保存用户信息到本地存储
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/user-exams')
      } else {
        setError('用户名或密码错误')
      }
      setIsLoading(false)
    }, 1000)
  }

  const { Title, Text } = Typography

  return (
    <div className="login-container">
      <Card 
        className="login-form-card"
        style={{
          width: 400,
          border: '1px solid #d9d9d9',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="login-header">
          <Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>考试管理系统</Title>
          <Text style={{ display: 'block', textAlign: 'center', color: '#666', marginBottom: 24 }}>请登录以访问系统</Text>
        </div>
        
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
        
        <Form
          onFinish={handleLogin}
          layout="vertical"
          className="industrial-form"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
            className="form-item-industrial"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="input-industrial"
            />
          </Form.Item>
          
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            className="form-item-industrial"
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="input-industrial"
            />
          </Form.Item>
          
          <Form.Item className="form-actions-industrial">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-button-industrial"
              loading={isLoading}
              block
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </Form.Item>
        </Form>
        
        <div className="login-help">
          <Text strong style={{ display: 'block', marginBottom: 8 }}>测试账号：</Text>
          <ul className="test-accounts">
            <li>管理员：admin / admin123</li>
            <li>教师：teacher / teacher123</li>
            <li>普通用户：user / user123</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default Login