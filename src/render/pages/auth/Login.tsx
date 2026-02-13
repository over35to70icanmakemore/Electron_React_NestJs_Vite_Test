import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Alert, Typography } from 'antd'
import { LockOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons'
import './Auth.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const mockUsers = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'teacher', password: 'teacher123', role: 'teacher' },
    { id: 3, username: 'user', password: 'user123', role: 'user' }
  ]

  const handleLogin = () => {
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username && u.password === password)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      } else {
        setError('用户名或密码错误')
      }
      setIsLoading(false)
    }, 1000)
  }

  const { Title, Text } = Typography

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
      </div>
      
      <Card className="login-card">
        <div className="login-header">
          <div className="logo-wrapper">
            <FileTextOutlined className="logo-icon" />
          </div>
          <Title level={2} className="login-title">考试管理系统</Title>
          <Text className="login-subtitle">欢迎回来，请登录您的账户</Text>
        </div>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            className="error-alert" 
          />
        )}
        
        <Form
          onFinish={handleLogin}
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              block
              size="large"
              className="login-button"
            >
              {isLoading ? '登录中...' : '登 录'}
            </Button>
          </Form.Item>
        </Form>
        
        <div className="login-footer">
          <div className="test-accounts">
            <Text className="accounts-title">测试账号</Text>
            <div className="accounts-list">
              <div className="account-item">
                <span className="account-role">管理员</span>
                <span className="account-info">admin / admin123</span>
              </div>
              <div className="account-item">
                <span className="account-role">教师</span>
                <span className="account-info">teacher / teacher123</span>
              </div>
              <div className="account-item">
                <span className="account-role">用户</span>
                <span className="account-info">user / user123</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="login-copyright">
        <Text>© 2026 考试管理系统 · 版本 1.0.0</Text>
      </div>
    </div>
  )
}

export default Login