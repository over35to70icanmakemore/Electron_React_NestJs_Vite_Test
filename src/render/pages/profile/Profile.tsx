import type { UploadProps } from 'antd'
import { BookOutlined, EditOutlined, EnvironmentOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Descriptions, Form, Input, message, Modal, Space, Tag, Typography, Upload } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import './Profile.css'

const { Title, Text } = Typography

interface UserProfile {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  location: string
  school: string
  major: string
  grade: string
  bio: string
  achievements: string[]
}

interface UserStatistics {
  completedExams: number
  averageScore: number
  studyHours: number
  ranking: string
}

const Profile: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [statistics, setStatistics] = useState<UserStatistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
    fetchStatistics()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getProfile()
      setProfile(data)
    }
    catch (error) {
      console.error('获取个人资料失败:', error)
      message.error('获取个人资料失败')
    }
    finally {
      setLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const data = await window.electron.getUserStatistics()
      setStatistics(data)
    }
    catch (error) {
      console.error('获取统计数据失败:', error)
    }
  }

  const handleEdit = () => {
    if (profile) {
      setIsModalVisible(true)
      form.setFieldsValue(profile)
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      await window.electron.updateProfile(values)
      setIsModalVisible(false)
      fetchProfile()
      message.success('个人资料更新成功')
    }
    catch (error) {
      console.error('更新个人资料失败:', error)
      message.error('更新个人资料失败')
    }
  }

  const uploadProps: UploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!')
      }
      return false
    },
  }

  if (!profile)
    return null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Title level={4}>
          <IdcardOutlined />
          {' '}
          个人资料
        </Title>
        <Text type="secondary">查看和编辑个人信息</Text>
      </div>

      <div className="profile-content">
        <Card className="profile-card">
          <div className="profile-avatar-section">
            <Upload {...uploadProps}>
              <Avatar
                size={100}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
            </Upload>
            <Title level={4} style={{ marginTop: 16 }}>{profile.name}</Title>
            <Text type="secondary">
              {profile.school}
              {' '}
              ·
              {' '}
              {profile.major}
            </Text>
            <div className="profile-tags">
              {profile.achievements.map((achievement, index) => (
                <Tag key={index} color="blue">{achievement}</Tag>
              ))}
            </div>
          </div>
        </Card>

        <Card className="info-card">
          <div className="card-header">
            <Title level={5}>基本信息</Title>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              编辑资料
            </Button>
          </div>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered>
            <Descriptions.Item label={(
              <>
                <UserOutlined />
                {' '}
                姓名
              </>
            )}
            >
              {profile.name}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <MailOutlined />
                {' '}
                邮箱
              </>
            )}
            >
              {profile.email}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <PhoneOutlined />
                {' '}
                电话
              </>
            )}
            >
              {profile.phone}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <EnvironmentOutlined />
                {' '}
                地址
              </>
            )}
            >
              {profile.location}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <BookOutlined />
                {' '}
                学校
              </>
            )}
            >
              {profile.school}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <BookOutlined />
                {' '}
                专业
              </>
            )}
            >
              {profile.major}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <BookOutlined />
                {' '}
                年级
              </>
            )}
            >
              {profile.grade}
            </Descriptions.Item>
            <Descriptions.Item label={(
              <>
                <TrophyOutlined />
                {' '}
                成就
              </>
            )}
            >
              <Space wrap>
                {profile.achievements.map((achievement, index) => (
                  <Tag key={index} color="gold">{achievement}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="个人简介" span={2}>
              {profile.bio}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {statistics && (
          <Card className="stats-card">
            <Title level={5}>学习统计</Title>
            <div className="stats-grid">
              <div className="stat-item">
                <Text type="secondary">已完成考试</Text>
                <Title level={3}>{statistics.completedExams}</Title>
              </div>
              <div className="stat-item">
                <Text type="secondary">平均分数</Text>
                <Title level={3}>{statistics.averageScore}</Title>
              </div>
              <div className="stat-item">
                <Text type="secondary">学习时长</Text>
                <Title level={3}>
                  {statistics.studyHours}
                  h
                </Title>
              </div>
              <div className="stat-item">
                <Text type="secondary">排名</Text>
                <Title level={3}>{statistics.ranking}</Title>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Modal
        title="编辑个人资料"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item name="location" label="地址">
            <Input placeholder="请输入地址" />
          </Form.Item>
          <Form.Item name="school" label="学校">
            <Input placeholder="请输入学校" />
          </Form.Item>
          <Form.Item name="major" label="专业">
            <Input placeholder="请输入专业" />
          </Form.Item>
          <Form.Item name="grade" label="年级">
            <Input placeholder="请输入年级" />
          </Form.Item>
          <Form.Item name="bio" label="个人简介">
            <Input.TextArea rows={4} placeholder="请输入个人简介" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Profile
