import React, { useState } from 'react'
import { Card, Checkbox, Input, Select, Button, Typography, Space, Row, Col } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

const Settings: React.FC = () => {
  // 考试设置状态
  const [examSettings, setExamSettings] = useState({
    autoSubmit: true,
    showTimer: true,
    randomQuestions: false,
    passScore: 60,
    examDuration: 120, // 分钟
    maxAttempts: 1
  })

  // 系统设置状态
  const [systemSettings, setSystemSettings] = useState({
    language: 'zh-CN',
    theme: 'light',
    autoSave: true,
    backupInterval: 24, // 小时
    notificationEnabled: true
  })

  // 处理考试设置变化
  const handleExamSettingChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setExamSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
  };

  // 处理系统设置变化
  const handleSystemSettingChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 保存设置
  const handleSaveSettings = () => {
    // 这里可以添加保存设置的逻辑
    console.log('保存考试设置:', examSettings)
    console.log('保存系统设置:', systemSettings)
    // 模拟保存成功
    alert('设置已保存')
  }

  const { Title, Text, Paragraph } = Typography

  return (
    <div style={{ padding: '20px' }}>
      {/* 页面头部 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={3}>系统设置</Title>
        <Text>配置考试系统的各项参数</Text>
      </div>

      {/* 考试设置 */}
      <Card 
        title="考试设置" 
        style={{ marginBottom: '24px' }}
        bordered={true}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Checkbox 
              name="autoSubmit"
              checked={examSettings.autoSubmit}
              onChange={handleExamSettingChange}
            >
              自动提交
            </Checkbox>
            <Paragraph style={{ marginLeft: '24px', marginTop: '4px' }} type="secondary">
              考试时间结束后自动提交试卷
            </Paragraph>
          </div>

          <div>
            <Checkbox 
              name="showTimer"
              checked={examSettings.showTimer}
              onChange={handleExamSettingChange}
            >
              显示倒计时
            </Checkbox>
            <Paragraph style={{ marginLeft: '24px', marginTop: '4px' }} type="secondary">
              在考试页面显示剩余时间
            </Paragraph>
          </div>

          <div>
            <Checkbox 
              name="randomQuestions"
              checked={examSettings.randomQuestions}
              onChange={handleExamSettingChange}
            >
              随机出题
            </Checkbox>
            <Paragraph style={{ marginLeft: '24px', marginTop: '4px' }} type="secondary">
              每次考试随机生成试题顺序
            </Paragraph>
          </div>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>及格分数：</Text>
              <Input 
                type="number"
                name="passScore"
                min={0}
                max={100}
                value={examSettings.passScore}
                onChange={handleExamSettingChange}
                style={{ marginTop: '8px' }}
              />
            </Col>

            <Col span={8}>
              <Text strong>考试时长（分钟）：</Text>
              <Input 
                type="number"
                name="examDuration"
                min={1}
                max={300}
                value={examSettings.examDuration}
                onChange={handleExamSettingChange}
                style={{ marginTop: '8px' }}
              />
            </Col>

            <Col span={8}>
              <Text strong>最大尝试次数：</Text>
              <Input 
                type="number"
                name="maxAttempts"
                min={1}
                max={10}
                value={examSettings.maxAttempts}
                onChange={handleExamSettingChange}
                style={{ marginTop: '8px' }}
              />
            </Col>
          </Row>
        </Space>
      </Card>

      {/* 系统设置 */}
      <Card 
        title="系统设置" 
        style={{ marginBottom: '24px' }}
        bordered={true}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>语言：</Text>
              <Select 
                value={systemSettings.language}
                onChange={(value) => handleSystemSettingChange({ target: { name: 'language', value } })}
                style={{ width: '100%', marginTop: '8px' }}
              >
                <Select.Option value="zh-CN">中文</Select.Option>
                <Select.Option value="en-US">English</Select.Option>
              </Select>
            </Col>

            <Col span={8}>
              <Text strong>主题：</Text>
              <Select 
                value={systemSettings.theme}
                onChange={(value) => handleSystemSettingChange({ target: { name: 'theme', value } })}
                style={{ width: '100%', marginTop: '8px' }}
              >
                <Select.Option value="light">浅色</Select.Option>
                <Select.Option value="dark">深色</Select.Option>
              </Select>
            </Col>
          </Row>

          <div>
            <Checkbox 
              name="autoSave"
              checked={systemSettings.autoSave}
              onChange={handleSystemSettingChange}
            >
              自动保存
            </Checkbox>
            <Paragraph style={{ marginLeft: '24px', marginTop: '4px' }} type="secondary">
              自动保存表单数据
            </Paragraph>
          </div>

          <div>
            <Text strong>备份间隔（小时）：</Text>
            <Input 
              type="number"
              name="backupInterval"
              min={1}
              max={168}
              value={systemSettings.backupInterval}
              onChange={handleSystemSettingChange}
              style={{ marginTop: '8px', width: '200px' }}
            />
          </div>

          <div>
            <Checkbox 
              name="notificationEnabled"
              checked={systemSettings.notificationEnabled}
              onChange={handleSystemSettingChange}
            >
              启用通知
            </Checkbox>
            <Paragraph style={{ marginLeft: '24px', marginTop: '4px' }} type="secondary">
              接收系统通知
            </Paragraph>
          </div>
        </Space>
      </Card>

      {/* 保存按钮 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="primary" 
          onClick={handleSaveSettings}
          icon={<SaveOutlined />}
          size="large"
        >
          保存设置
        </Button>
      </div>
    </div>
  )
}

export default Settings