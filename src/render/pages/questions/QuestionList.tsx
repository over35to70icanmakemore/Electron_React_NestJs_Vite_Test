import React, { useState } from 'react'

// 试题数据类型定义
interface Question {
  id: string
  type: 'single' | 'multiple' | 'truefalse' | 'essay'
  content: string
  score: number
  difficulty: 'easy' | 'medium' | 'hard'
  created_by: string
  created_at: string
  updated_at: string
}

// 模拟试题数据
const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'single',
    content: '以下哪个是 JavaScript 的基本数据类型？',
    score: 5,
    difficulty: 'easy',
    created_by: 'admin',
    created_at: '2026-01-01T00:00:00',
    updated_at: '2026-01-01T00:00:00'
  },
  {
    id: '2',
    type: 'multiple',
    content: '以下哪些是 React 的生命周期方法？',
    score: 10,
    difficulty: 'medium',
    created_by: 'admin',
    created_at: '2026-01-02T00:00:00',
    updated_at: '2026-01-02T00:00:00'
  },
  {
    id: '3',
    type: 'truefalse',
    content: 'TypeScript 是 JavaScript 的超集。',
    score: 3,
    difficulty: 'easy',
    created_by: 'admin',
    created_at: '2026-01-03T00:00:00',
    updated_at: '2026-01-03T00:00:00'
  },
  {
    id: '4',
    type: 'essay',
    content: '请详细说明 Node.js 的事件循环机制。',
    score: 15,
    difficulty: 'hard',
    created_by: 'admin',
    created_at: '2026-01-04T00:00:00',
    updated_at: '2026-01-04T00:00:00'
  }
]

interface QuestionListProps {
  onEdit: (question: Question) => void
  onDelete: (questionId: string) => void
  onView: (questionId: string) => void
}

const QuestionList: React.FC<QuestionListProps> = ({ onEdit, onDelete, onView }) => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')

  // 获取试题类型的中文显示
  const getTypeText = (type: string) => {
    switch (type) {
      case 'single': return '单选题'
      case 'multiple': return '多选题'
      case 'truefalse': return '判断题'
      case 'essay': return '简答题'
      default: return type
    }
  }

  // 获取试题难度的中文显示
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单'
      case 'medium': return '中等'
      case 'hard': return '困难'
      default: return difficulty
    }
  }

  // 获取试题难度的样式类
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'difficulty-easy'
      case 'medium': return 'difficulty-medium'
      case 'hard': return 'difficulty-hard'
      default: return ''
    }
  }

  // 过滤试题列表
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || question.type === typeFilter
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter
    return matchesSearch && matchesType && matchesDifficulty
  })

  return (
    <div className="question-list-container">
      {/* 搜索和筛选 */}
      <div className="question-list-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索试题..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-boxes">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="type-filter"
          >
            <option value="all">全部类型</option>
            <option value="single">单选题</option>
            <option value="multiple">多选题</option>
            <option value="truefalse">判断题</option>
            <option value="essay">简答题</option>
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="difficulty-filter"
          >
            <option value="all">全部难度</option>
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
        </div>
      </div>

      {/* 试题列表 */}
      <div className="question-list">
        <table className="question-table">
          <thead>
            <tr>
              <th>试题内容</th>
              <th>类型</th>
              <th>分值</th>
              <th>难度</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(question => (
                <tr key={question.id}>
                  <td>{question.content.substring(0, 100)}...</td>
                  <td>{getTypeText(question.type)}</td>
                  <td>{question.score}</td>
                  <td>
                    <span className={`difficulty-badge ${getDifficultyClass(question.difficulty)}`}>
                      {getDifficultyText(question.difficulty)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-view"
                        onClick={() => onView(question.id)}
                      >
                        查看
                      </button>
                      <button 
                        className="btn btn-edit"
                        onClick={() => onEdit(question)}
                      >
                        编辑
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => onDelete(question.id)}
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
                  暂无试题数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QuestionList
