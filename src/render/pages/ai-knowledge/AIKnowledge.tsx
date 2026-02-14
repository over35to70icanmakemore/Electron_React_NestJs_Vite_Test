import React, { useState, useEffect } from 'react'
import { Input, Card, Tag, List, Typography, Space, message, Spin } from 'antd'
import { SearchOutlined, BookOutlined, StarOutlined, ClockCircleOutlined } from '@ant-design/icons'
import './AIKnowledge.css'

const { Search } = Input
const { Title, Text, Paragraph } = Typography

interface KnowledgeItem {
  id: string
  title: string
  category: string
  summary: string
  tags: string[]
  views: number
  rating: number
  updateTime: string
}

const AIKnowledge: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeItem[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { key: 'all', label: '全部' },
    { key: 'programming', label: '编程技术' },
    { key: 'math', label: '数学' },
    { key: 'physics', label: '物理' },
    { key: 'chemistry', label: '化学' },
    { key: 'language', label: '语言学习' }
  ]

  useEffect(() => {
    fetchKnowledge()
  }, [])

  const fetchKnowledge = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getAllKnowledge()
      setKnowledgeData(data)
    } catch (error) {
      console.error('获取知识库数据失败:', error)
      message.error('获取知识库数据失败')
    } finally {
      setLoading(false)
    }
  }

  const filteredData = knowledgeData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleItemClick = (item: KnowledgeItem) => {
    message.info(`正在加载: ${item.title}`)
  }

  return (
    <div className="ai-knowledge-container">
      <div className="search-section">
        <Title level={4}>
          <BookOutlined /> AI知识库
        </Title>
        <Text type="secondary">智能检索海量知识资源，助力高效学习</Text>
        <Search
          placeholder="搜索知识点、文章、教程..."
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={handleSearch}
          className="search-input"
        />
      </div>

      <div className="category-section">
        <Space wrap>
          {categories.map(cat => (
            <Tag
              key={cat.key}
              color={selectedCategory === cat.key ? 'blue' : 'default'}
              className="category-tag"
              onClick={() => handleCategoryChange(cat.key)}
            >
              {cat.label}
            </Tag>
          ))}
        </Space>
      </div>

      <Spin spinning={loading}>
        <div className="knowledge-list">
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={filteredData}
            renderItem={(item: KnowledgeItem) => (
              <List.Item>
                <Card
                  hoverable
                  className="knowledge-card"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="card-header">
                    <Title level={5} ellipsis>{item.title}</Title>
                    <Space>
                      <StarOutlined style={{ color: '#faad14' }} />
                      <Text>{item.rating}</Text>
                    </Space>
                  </div>
                  <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                    {item.summary}
                  </Paragraph>
                  <div className="card-footer">
                    <Space wrap>
                      {item.tags.map(tag => (
                        <Tag key={tag} color="blue">{tag}</Tag>
                      ))}
                    </Space>
                  </div>
                  <div className="card-meta">
                    <Space split={<Text type="secondary">|</Text>}>
                      <Text type="secondary">
                        <ClockCircleOutlined /> {item.views} 阅读
                      </Text>
                      <Text type="secondary">{item.updateTime}</Text>
                    </Space>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Spin>

      <div className="recommend-section">
        <Title level={4}>热门推荐</Title>
        <div className="recommend-list">
          {knowledgeData.slice(0, 3).map(item => (
            <Card key={item.id} size="small" className="recommend-card">
              <Text strong>{item.title}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {item.views} 人已学习
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIKnowledge