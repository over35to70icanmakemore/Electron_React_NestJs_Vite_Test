import React, { useState } from 'react'
import { Input, Card, Tag, List, Typography, Space, Button, message } from 'antd'
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

  const categories = [
    { key: 'all', label: '全部' },
    { key: 'programming', label: '编程技术' },
    { key: 'math', label: '数学' },
    { key: 'physics', label: '物理' },
    { key: 'chemistry', label: '化学' },
    { key: 'language', label: '语言学习' }
  ]

  const knowledgeData: KnowledgeItem[] = [
    {
      id: '1',
      title: 'Python基础语法详解',
      category: 'programming',
      summary: 'Python是一种高级编程语言，具有简洁明了的语法特点，适合初学者入门学习。本文将详细介绍Python的基础语法...',
      tags: ['Python', '编程', '基础'],
      views: 1256,
      rating: 4.8,
      updateTime: '2026-01-15'
    },
    {
      id: '2',
      title: '微积分入门指南',
      category: 'math',
      summary: '微积分是数学的一个重要分支，主要研究函数的极限、导数、积分等概念。本文将从基础概念开始...',
      tags: ['微积分', '数学', '高等数学'],
      views: 892,
      rating: 4.6,
      updateTime: '2026-01-12'
    },
    {
      id: '3',
      title: '牛顿力学原理',
      category: 'physics',
      summary: '牛顿力学是经典力学的基础，描述了物体运动的基本规律。本文将介绍牛顿三大定律及其应用...',
      tags: ['物理', '力学', '牛顿'],
      views: 756,
      rating: 4.5,
      updateTime: '2026-01-10'
    },
    {
      id: '4',
      title: '有机化学反应机理',
      category: 'chemistry',
      summary: '有机化学是研究有机化合物的结构、性质、合成方法的学科。本文将详细介绍常见的有机化学反应机理...',
      tags: ['化学', '有机化学', '反应'],
      views: 634,
      rating: 4.7,
      updateTime: '2026-01-08'
    },
    {
      id: '5',
      title: '英语语法精讲',
      category: 'language',
      summary: '英语语法是学习英语的基础，掌握好语法规则对于提高英语水平至关重要。本文将系统讲解英语语法...',
      tags: ['英语', '语法', '学习'],
      views: 1567,
      rating: 4.9,
      updateTime: '2026-01-05'
    }
  ]

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
      {/* 搜索区域 */}
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

      {/* 分类筛选 */}
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

      {/* 知识列表 */}
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

      {/* 热门推荐 */}
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