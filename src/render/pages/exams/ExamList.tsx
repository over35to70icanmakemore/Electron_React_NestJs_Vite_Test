import React, { useState, useEffect } from 'react'

// 考试数据类型定义
interface Exam {
  id: string
  title: string
  description: string
  duration: number
  start_time: string
  end_time: string
  status: 'draft' | 'published' | 'ended'
  pass_score: number
  created_by: string
  created_at: string
  updated_at: string
}

// 模拟考试数据
const mockExams: Exam[] = [
  {
    id: '1',
    title: '2026年春季学期数学期末考试',
    description: '高等数学上册内容，包括极限、导数、积分等知识点',
    duration: 120,
    start_time: '2026-06-15T09:00:00',
    end_time: '2026-06-15T11:00:00',
    status: 'published',
    pass_score: 60,
    created_by: 'admin',
    created_at: '2026-06-01T10:00:00',
    updated_at: '2026-06-10T15:00:00'
  },
  {
    id: '2',
    title: '2026年春季学期英语期中考试',
    description: '大学英语四级水平测试，包括听力、阅读、写作等部分',
    duration: 90,
    start_time: '2026-04-20T14:00:00',
    end_time: '2026-04-20T15:30:00',
    status: 'ended',
    pass_score: 60,
    created_by: 'admin',
    created_at: '2026-04-01T09:00:00',
    updated_at: '2026-04-15T10:00:00'
  },
  {
    id: '3',
    title: '2026年春季学期计算机基础考试',
    description: '计算机基础知识测试，包括操作系统、网络、办公软件等内容',
    duration: 100,
    start_time: '2026-06-20T10:00:00',
    end_time: '2026-06-20T11:40:00',
    status: 'draft',
    pass_score: 60,
    created_by: 'admin',
    created_at: '2026-06-12T08:00:00',
    updated_at: '2026-06-12T08:00:00'
  }
]

interface ExamListProps {
  onEdit: (exam: Exam) => void
  onDelete: (examId: string) => void
  onView: (examId: string) => void
}

const ExamList: React.FC<ExamListProps> = ({ onEdit, onDelete, onView }) => {
  const [exams, setExams] = useState<Exam[]>(mockExams)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // 获取考试状态的中文显示
  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return '草稿'
      case 'published': return '已发布'
      case 'ended': return '已结束'
      default: return status
    }
  }

  // 获取考试状态的样式类
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'draft': return 'status-draft'
      case 'published': return 'status-published'
      case 'ended': return 'status-ended'
      default: return ''
    }
  }

  // 过滤考试列表
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="exam-list-container">
      {/* 搜索和筛选 */}
      <div className="exam-list-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索考试..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">全部状态</option>
            <option value="draft">草稿</option>
            <option value="published">已发布</option>
            <option value="ended">已结束</option>
          </select>
        </div>
      </div>

      {/* 考试列表 */}
      <div className="exam-list">
        <table className="exam-table">
          <thead>
            <tr>
              <th>考试名称</th>
              <th>描述</th>
              <th>时长(分钟)</th>
              <th>开始时间</th>
              <th>状态</th>
              <th>及格分数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length > 0 ? (
              filteredExams.map(exam => (
                <tr key={exam.id}>
                  <td>{exam.title}</td>
                  <td>{exam.description.substring(0, 50)}...</td>
                  <td>{exam.duration}</td>
                  <td>{new Date(exam.start_time).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(exam.status)}`}>
                      {getStatusText(exam.status)}
                    </span>
                  </td>
                  <td>{exam.pass_score}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-view"
                        onClick={() => onView(exam.id)}
                      >
                        查看
                      </button>
                      <button 
                        className="btn btn-edit"
                        onClick={() => onEdit(exam)}
                      >
                        编辑
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => onDelete(exam.id)}
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data">
                  暂无考试数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExamList
