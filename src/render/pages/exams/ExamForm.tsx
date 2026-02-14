import * as React from 'react'
import { useEffect, useState } from 'react'

// 考试数据类型定义
interface Exam {
  id?: string
  title: string
  description: string
  duration: number
  start_time: string
  end_time: string
  status: 'draft' | 'published' | 'ended'
  pass_score: number
}

interface ExamFormProps {
  exam?: Exam
  onSubmit: (exam: Exam) => void
  onCancel: () => void
}

const ExamForm: React.FC<ExamFormProps> = ({ exam, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Exam>({
    title: '',
    description: '',
    duration: 90,
    start_time: new Date().toISOString().slice(0, 16),
    end_time: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    status: 'draft',
    pass_score: 60,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Exam, string>>>({})

  // 如果传入了考试数据，初始化表单
  useEffect(() => {
    if (exam) {
      setFormData({
        id: exam.id,
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        start_time: exam.start_time.slice(0, 16),
        end_time: exam.end_time.slice(0, 16),
        status: exam.status,
        pass_score: exam.pass_score,
      })
    }
  }, [exam])

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'pass_score' ? Number.parseInt(value) : value,
    }))
  }

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Exam, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = '考试标题不能为空'
    }

    if (!formData.description.trim()) {
      newErrors.description = '考试描述不能为空'
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = '考试时长必须大于0'
    }

    if (!formData.start_time) {
      newErrors.start_time = '开始时间不能为空'
    }

    if (!formData.end_time) {
      newErrors.end_time = '结束时间不能为空'
    }

    if (new Date(formData.end_time) <= new Date(formData.start_time)) {
      newErrors.end_time = '结束时间必须晚于开始时间'
    }

    if (!formData.pass_score || formData.pass_score < 0 || formData.pass_score > 100) {
      newErrors.pass_score = '及格分数必须在0-100之间'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="exam-form-container">
      <h2>{exam ? '编辑考试' : '创建新考试'}</h2>
      <form onSubmit={handleSubmit} className="exam-form">
        <div className="form-group">
          <label htmlFor="title">考试标题 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="请输入考试标题"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">考试描述 *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="请输入考试描述"
            rows={4}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="duration">考试时长（分钟） *</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={errors.duration ? 'error' : ''}
            min="1"
            placeholder="请输入考试时长"
          />
          {errors.duration && <div className="error-message">{errors.duration}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_time">开始时间 *</label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className={errors.start_time ? 'error' : ''}
            />
            {errors.start_time && <div className="error-message">{errors.start_time}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="end_time">结束时间 *</label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className={errors.end_time ? 'error' : ''}
            />
            {errors.end_time && <div className="error-message">{errors.end_time}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">状态</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
              <option value="ended">已结束</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pass_score">及格分数 *</label>
            <input
              type="number"
              id="pass_score"
              name="pass_score"
              value={formData.pass_score}
              onChange={handleChange}
              className={errors.pass_score ? 'error' : ''}
              min="0"
              max="100"
              placeholder="请输入及格分数"
            />
            {errors.pass_score && <div className="error-message">{errors.pass_score}</div>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            取消
          </button>
          <button type="submit" className="btn btn-submit">
            {exam ? '更新考试' : '创建考试'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExamForm
