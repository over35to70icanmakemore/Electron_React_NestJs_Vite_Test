import React, { useState, useEffect } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

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

interface ExamListProps {
  onEdit: (exam: Exam) => void
  onDelete: (examId: string) => void
  onView: (examId: string) => void
}

const ExamList: React.FC<ExamListProps> = ({ onEdit, onDelete, onView }) => {
  const [exams, setExams] = useState<Exam[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchExams = async () => {
    try {
      setLoading(true)
      const result = await window.electron.getAllExams()
      setExams(result)
    } catch (error) {
      console.error('获取考试数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExams()

    const examListComponent = document.querySelector('.exam-list-container')
    if (examListComponent) {
      const handleRefresh = () => {
        fetchExams()
      }

      examListComponent.addEventListener('refresh', handleRefresh)

      return () => {
        examListComponent.removeEventListener('refresh', handleRefresh)
      }
    }
  }, [])

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return '草稿'
      case 'published': return '已发布'
      case 'ended': return '已结束'
      default: return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'draft': return 'status-draft'
      case 'published': return 'status-published'
      case 'ended': return 'status-ended'
      default: return ''
    }
  }

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="exam-list-container">
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

      <div className="exam-list">
        {loading ? (
          <div className="loading">
            加载中...
          </div>
        ) : (
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
                          className="btn-action btn-view"
                          onClick={() => onView(exam.id)}
                          title="查看"
                        >
                          <EyeOutlined />
                        </button>
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => onEdit(exam)}
                          title="编辑"
                        >
                          <EditOutlined />
                        </button>
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => onDelete(exam.id)}
                          title="删除"
                        >
                          <DeleteOutlined />
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
        )}
      </div>
    </div>
  )
}

export default ExamList