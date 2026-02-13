import React, { useState } from 'react'
import { Card, List, Checkbox, Button, Input, Tag, Typography, Space, Modal, Form, DatePicker, Select, message, Progress } from 'antd'
import { CheckSquareOutlined, PlusOutlined, DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons'
import './TodoList.css'

const { Title, Text } = Typography
const { Option } = Select

interface TodoItem {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  category: string
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: '完成数学作业',
      completed: false,
      priority: 'high',
      dueDate: '2026-02-15',
      category: '学习'
    },
    {
      id: '2',
      title: '复习英语单词',
      completed: true,
      priority: 'medium',
      dueDate: '2026-02-14',
      category: '学习'
    },
    {
      id: '3',
      title: '准备项目报告',
      completed: false,
      priority: 'high',
      dueDate: '2026-02-16',
      category: '工作'
    },
    {
      id: '4',
      title: '阅读技术文档',
      completed: false,
      priority: 'low',
      dueDate: '2026-02-17',
      category: '学习'
    }
  ])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [form] = Form.useForm()

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green'
    }
    return colors[priority as keyof typeof colors] || 'default'
  }

  const getPriorityText = (priority: string) => {
    const texts = {
      high: '高',
      medium: '中',
      low: '低'
    }
    return texts[priority as keyof typeof texts] || priority
  }

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
    message.success('待办已删除')
  }

  const handleAddTodo = () => {
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        title: values.title,
        completed: false,
        priority: values.priority,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : '',
        category: values.category || '其他'
      }
      setTodos([...todos, newTodo])
      setIsModalVisible(false)
      form.resetFields()
      message.success('待办添加成功')
    })
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="todo-container">
      <div className="todo-header">
        <Title level={4}>
          <CheckSquareOutlined /> 我的待办
        </Title>
        <Text type="secondary">管理待办事项清单，提高工作效率</Text>
      </div>

      <div className="todo-stats">
        <Card className="stat-card">
          <div className="stat-content">
            <Text type="secondary">完成进度</Text>
            <Progress percent={Math.round(progressPercent)} strokeColor="#52c41a" />
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <Text type="secondary">总任务</Text>
            <Title level={3}>{totalCount}</Title>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <Text type="secondary">已完成</Text>
            <Title level={3} style={{ color: '#52c41a' }}>{completedCount}</Title>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <Text type="secondary">待完成</Text>
            <Title level={3} style={{ color: '#faad14' }}>{totalCount - completedCount}</Title>
          </div>
        </Card>
      </div>

      <Card className="todo-list-card">
        <div className="list-header">
          <Space>
            <Button
              type={filter === 'all' ? 'primary' : 'default'}
              onClick={() => setFilter('all')}
            >
              全部
            </Button>
            <Button
              type={filter === 'active' ? 'primary' : 'default'}
              onClick={() => setFilter('active')}
            >
              待完成
            </Button>
            <Button
              type={filter === 'completed' ? 'primary' : 'default'}
              onClick={() => setFilter('completed')}
            >
              已完成
            </Button>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTodo}
          >
            添加待办
          </Button>
        </div>

        <List
          dataSource={filteredTodos}
          locale={{ emptyText: '暂无待办事项' }}
          renderItem={item => (
            <List.Item
              className={`todo-item ${item.completed ? 'completed' : ''}`}
              actions={[
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                />
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Checkbox
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                  />
                }
                title={
                  <Space>
                    <Text delete={item.completed}>{item.title}</Text>
                    <Tag color={getPriorityColor(item.priority)}>
                      {getPriorityText(item.priority)}优先级
                    </Tag>
                    <Tag>{item.category}</Tag>
                  </Space>
                }
                description={
                  item.dueDate && (
                    <Text type="secondary">截止日期: {item.dueDate}</Text>
                  )
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="添加待办"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入待办标题" />
          </Form.Item>
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="请选择优先级">
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="截止日期">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Select placeholder="请选择分类">
              <Option value="学习">学习</Option>
              <Option value="工作">工作</Option>
              <Option value="生活">生活</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TodoList