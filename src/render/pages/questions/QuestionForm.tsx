import React, { useState, useEffect } from 'react'

// 试题选项类型定义
interface QuestionOption {
  id: string
  content: string
  is_correct: boolean
  order: number
}

// 试题数据类型定义
interface Question {
  id?: string
  type: 'single' | 'multiple' | 'truefalse' | 'essay'
  content: string
  score: number
  difficulty: 'easy' | 'medium' | 'hard'
  options?: QuestionOption[]
  correct_answer?: string
}

interface QuestionFormProps {
  question?: Question
  onSubmit: (question: Question) => void
  onCancel: () => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Question>({
    type: 'single',
    content: '',
    score: 5,
    difficulty: 'medium',
    options: [
      { id: '1', content: '', is_correct: true, order: 1 },
      { id: '2', content: '', is_correct: false, order: 2 },
      { id: '3', content: '', is_correct: false, order: 3 },
      { id: '4', content: '', is_correct: false, order: 4 }
    ]
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Question, string>>>({})

  // 如果传入了试题数据，初始化表单
  useEffect(() => {
    if (question) {
      setFormData({
        id: question.id,
        type: question.type,
        content: question.content,
        score: question.score,
        difficulty: question.difficulty,
        options: question.options || [
          { id: '1', content: '', is_correct: true, order: 1 },
          { id: '2', content: '', is_correct: false, order: 2 },
          { id: '3', content: '', is_correct: false, order: 3 },
          { id: '4', content: '', is_correct: false, order: 4 }
        ]
      })
    }
  }, [question])

  // 处理试题类型变化
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'single' | 'multiple' | 'truefalse' | 'essay'
    setFormData(prev => ({
      ...prev,
      type: newType,
      options: newType === 'essay' ? [] : prev.options
    }))
  }

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? parseInt(value) : value
    }))
  }

  // 处理选项内容变化
  const handleOptionChange = (optionId: string, field: keyof QuestionOption, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.map(option =>
        option.id === optionId ? { ...option, [field]: value } : option
      )
    }))
  }

  // 添加选项
  const addOption = () => {
    const newOption: QuestionOption = {
      id: Math.random().toString(36).substr(2, 9),
      content: '',
      is_correct: false,
      order: (formData.options?.length || 0) + 1
    }
    setFormData(prev => ({
      ...prev,
      options: [...(prev.options || []), newOption]
    }))
  }

  // 删除选项
  const removeOption = (optionId: string) => {
    if ((formData.options?.length || 0) > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options?.filter(option => option.id !== optionId)
      }))
    }
  }

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Question, string>> = {}

    if (!formData.content.trim()) {
      newErrors.content = '试题内容不能为空'
    }

    if (!formData.score || formData.score <= 0) {
      newErrors.score = '分值必须大于0'
    }

    if (!formData.difficulty) {
      newErrors.difficulty = '难度等级不能为空'
    }

    // 验证选项
    if (formData.type !== 'essay' && formData.options) {
      const hasEmptyOption = formData.options.some(option => !option.content.trim())
      const hasCorrectOption = formData.options.some(option => option.is_correct)
      const correctOptionsCount = formData.options.filter(option => option.is_correct).length

      if (hasEmptyOption) {
        newErrors.options = '选项内容不能为空'
      }

      if (!hasCorrectOption) {
        newErrors.options = '必须至少有一个正确选项'
      }

      if (formData.type === 'single' && correctOptionsCount > 1) {
        newErrors.options = '单选题只能有一个正确选项'
      }
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
    <div className="question-form-container">
      <h2>{question ? '编辑试题' : '添加新试题'}</h2>
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="content">试题内容 *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={errors.content ? 'error' : ''}
            placeholder="请输入试题内容"
            rows={4}
          />
          {errors.content && <div className="error-message">{errors.content}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">试题类型 *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              className={errors.type ? 'error' : ''}
            >
              <option value="single">单选题</option>
              <option value="multiple">多选题</option>
              <option value="truefalse">判断题</option>
              <option value="essay">简答题</option>
            </select>
            {errors.type && <div className="error-message">{errors.type}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="score">分值 *</label>
            <input
              type="number"
              id="score"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className={errors.score ? 'error' : ''}
              min="1"
              placeholder="请输入分值"
            />
            {errors.score && <div className="error-message">{errors.score}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">难度等级 *</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className={errors.difficulty ? 'error' : ''}
            >
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
            {errors.difficulty && <div className="error-message">{errors.difficulty}</div>}
          </div>
        </div>

        {/* 选项部分（非简答题显示） */}
        {formData.type !== 'essay' && (
          <div className="form-group">
            <label>选项 *</label>
            {formData.options?.map((option, index) => (
              <div key={option.id} className="option-item">
                <div className="option-content">
                  {formData.type === 'truefalse' ? (
                    <>
                      <input
                        type="radio"
                        id={`option-${option.id}`}
                        name="truefalse-option"
                        checked={option.is_correct}
                        onChange={() => handleOptionChange(option.id, 'is_correct', true)}
                      />
                      <input
                        type="text"
                        value={option.content}
                        onChange={(e) => handleOptionChange(option.id, 'content', e.target.value)}
                        className={errors.options ? 'error' : ''}
                        placeholder={`选项 ${index + 1}`}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type={formData.type === 'single' ? 'radio' : 'checkbox'}
                        id={`option-${option.id}`}
                        name={formData.type === 'single' ? 'single-option' : `option-${option.id}`}
                        checked={option.is_correct}
                        onChange={(e) => handleOptionChange(option.id, 'is_correct', e.target.checked)}
                      />
                      <input
                        type="text"
                        value={option.content}
                        onChange={(e) => handleOptionChange(option.id, 'content', e.target.value)}
                        className={errors.options ? 'error' : ''}
                        placeholder={`选项 ${index + 1}`}
                      />
                    </>
                  )}
                </div>
                {formData.type !== 'truefalse' && formData.options?.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-remove-option"
                    onClick={() => removeOption(option.id)}
                  >
                    删除
                  </button>
                )}
              </div>
            ))}
            {formData.type !== 'truefalse' && (
              <button
                type="button"
                className="btn btn-add-option"
                onClick={addOption}
              >
                + 添加选项
              </button>
            )}
            {errors.options && <div className="error-message">{errors.options}</div>}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            取消
          </button>
          <button type="submit" className="btn btn-submit">
            {question ? '更新试题' : '添加试题'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuestionForm
