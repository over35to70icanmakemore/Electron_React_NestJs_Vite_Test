import { BookOutlined, ClockCircleOutlined, FireOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons'
import { Card, Col, Input, List, message, Row, Space, Spin, Tag, Typography } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
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

const categoryColors: Record<string, string> = {
  programming: 'processing',
  math: 'success',
  physics: 'warning',
  chemistry: 'error',
  language: 'purple',
}

const AIKnowledge: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeItem[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { key: 'all', label: '全部', icon: '📚' },
    { key: 'programming', label: '编程技术', icon: '💻' },
    { key: 'math', label: '数学', icon: '📐' },
    { key: 'physics', label: '物理', icon: '⚛️' },
    { key: 'chemistry', label: '化学', icon: '🧪' },
    { key: 'language', label: '语言学习', icon: '🌍' },
  ]

  useEffect(() => {
    fetchKnowledge()
  }, [])

  const fetchKnowledge = async () => {
    try {
      setLoading(true)
      const data = await window.electron.getAllKnowledge()
      setKnowledgeData(data)
    }
    catch (error) {
      console.error('获取知识库数据失败:', error)
      message.error('获取知识库数据失败')
    }
    finally {
      setLoading(false)
    }
  }

  const filteredData = knowledgeData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      || item.summary.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || 'default'
  }

  return (
    <div className="ai-knowledge-container">
      <div className="knowledge-header">
        <div className="header-content">
          <div className="header-icon">
            <BookOutlined />
          </div>
          <div className="header-text">
            <Title level={3}>AI知识库</Title>
            <Text type="secondary">智能检索海量知识资源，助力高效学习</Text>
          </div>
        </div>
        <Search
          placeholder="搜索知识点、文章、教程..."
          allowClear
          enterButton={<>搜索</>}
          size="large"
          onSearch={handleSearch}
          className="search-input"
          prefix={<SearchOutlined />}
        />
      </div>

      <div className="category-section">
        <Row gutter={[12, 12]}>
          {categories.map(cat => (
            <Col key={cat.key}>
              <div
                className={`category-item ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.key)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Spin spinning={loading}>
        <div className="knowledge-content">
          <Row gutter={[20, 20]}>
            {filteredData.map((item: KnowledgeItem) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
                <Card
                  hoverable
                  className="knowledge-card"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="card-category">
                    <Tag color={getCategoryColor(item.category)}>
                      {categories.find(c => c.key === item.category)?.label || item.category}
                    </Tag>
                  </div>
                  <Title level={5} ellipsis={{ rows: 2 }} className="card-title">
                    {item.title}
                  </Title>
                  <Paragraph ellipsis={{ rows: 2 }} className="card-summary">
                    {item.summary}
                  </Paragraph>
                  <div className="card-tags">
                    {item.tags.slice(0, 3).map(tag => (
                      <Tag key={tag} className="tag-item">{tag}</Tag>
                    ))}
                  </div>
                  <div className="card-footer">
                    <Space size="middle">
                      <span className="footer-item">
                        <StarOutlined className="icon-star" />
                        <span>{item.rating}</span>
                      </span>
                      <span className="footer-item">
                        <ClockCircleOutlined />
                        <span>{item.views} 阅读</span>
                      </span>
                    </Space>
                    <Text type="secondary" className="update-time">{item.updateTime}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          {filteredData.length === 0 && !loading && (
            <div className="empty-state">
              <BookOutlined className="empty-icon" />
              <Text type="secondary">暂无相关知识点</Text>
            </div>
          )}
        </div>
      </Spin>

      <div className="recommend-section">
        <div className="section-header">
          <FireOutlined className="fire-icon" />
          <Title level={4}>热门推荐</Title>
        </div>
        <Row gutter={[16, 16]}>
          {knowledgeData.slice(0, 4).map((item, index) => (
            <Col xs={24} sm={12} md={6} key={item.id}>
              <Card
                hoverable
                className="recommend-card"
                onClick={() => handleItemClick(item)}
              >
                <div className="recommend-rank">{index + 1}</div>
                <Title level={5} ellipsis={{ rows: 1 }} className="recommend-title">
                  {item.title}
                </Title>
                <Space className="recommend-meta">
                  <span><StarOutlined className="icon-star" /> {item.rating}</span>
                  <span><ClockCircleOutlined /> {item.views}人学习</span>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default AIKnowledge
