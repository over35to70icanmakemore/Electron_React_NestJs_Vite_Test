import { CheckSquareOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, DatePicker, Form, Input, List, message, Modal, Progress, Select, Space, Tag, Typography } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
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
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [statistics, setStatistics] = useState({ total: 0, completed: 0, active: 0 })

  useEffect(() => {
    fetchTodos()
    fetchStatistics()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getAllTodos()
      setTodos(data)
    }
    catch (error) {
      console.error('获取待办数据失败:', error)
      message.error('获取待办数据失败')
    }
    finally {
      setLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const data = await window.electron.getTodoStatistics()
      setStatistics(data)
    }
    catch (error) {
      console.error('获取统计数据失败:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green',
    }
    return colors[priority as keyof typeof colors] || 'default'
  }

  const getPriorityText = (priority: string) => {
    const texts = {
      high: '高',
      medium: '中',
      low: '低',
    }
    return texts[priority as keyof typeof texts] || priority
  }

  const handleToggle = async (id: string) => {
    try {
      await window.electron.toggleTodo(id)
      fetchTodos()
      fetchStatistics()
    }
    catch (error) {
      console.error('切换待办状态失败:', error)
      message.error('切换待办状态失败')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await window.electron.deleteTodo(id)
      fetchTodos()
      fetchStatistics()
      message.success('待办已删除')
    }
    catch (error) {
      console.error('删除待办失败:', error)
      message.error('删除待办失败')
    }
  }

  const handleAddTodo = () => {
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const newTodo = {
        title: values.title,
        priority: values.priority,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : '',
        category: values.category || '其他',
      }
      await window.electron.createTodo(newTodo)
      setIsModalVisible(false)
      form.resetFields()
      fetchTodos()
      fetchStatistics()
      message.success('待办添加成功')
    }
    catch (error) {
      console.error('添加待办失败:', error)
      message.error('添加待办失败')
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active')
      return !todo.completed
    if (filter === 'completed')
      return todo.completed
    return true
  })

  const progressPercent = statistics.total > 0 ? (statistics.completed / statistics.total) * 100 : 0

  return (
    <div className="todo-container">
      <div className="todo-header">
        <Title level={4}>
          <CheckSquareOutlined />
          {' '}
          我的待办
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
            <Title level={3}>{statistics.total}</Title>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <Text type="secondary">已完成</Text>
            <Title level={3} style={{ color: '#52c41a' }}>{statistics.completed}</Title>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <Text type="secondary">待完成</Text>
            <Title level={3} style={{ color: '#faad14' }}>{statistics.active}</Title>
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
          loading={loading}
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
                />,
              ]}
            >
              <List.Item.Meta
                avatar={(
                  <Checkbox
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                  />
                )}
                title={(
                  <Space>
                    <Text delete={item.completed}>{item.title}</Text>
                    <Tag color={getPriorityColor(item.priority)}>
                      {getPriorityText(item.priority)}
                      优先级
                    </Tag>
                    <Tag>{item.category}</Tag>
                  </Space>
                )}
                description={
                  item.dueDate && (
                    <Text type="secondary">
                      截止日期:
                      {item.dueDate}
                    </Text>
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
